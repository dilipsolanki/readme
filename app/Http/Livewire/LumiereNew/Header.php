<?php

namespace App\Http\Livewire\LumiereNew;

use App\Jobs\LumiereStoreUserQueriesJob;
use GuzzleHttp\Client;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Http;
use Livewire\Component;
use Illuminate\Support\Str;
use BeyondCode\ServerTiming\Facades\ServerTiming;

class Header extends Component
{
    public $lumiereQueryString;
    protected $totalTokensToAppendPrepend = 10;
    public $asteriskPosition = 0;
    protected $recordsToLimit = 40;
    public $totalOccurences = 0;
    public $synonmysOutput = [];
    public $compareResults = [];
    public $dictionary = [];
    public $loading = false;
    public $errorMessage;
    public $noResultFoundMessage = '';
    private $colorsArray = ['#FF9671', '#F9F871'];
    public $flippedArray = [];
    public $examplesArray = [
        'patients presented with',
        // 'conflicts of interest',
        // 'although previous studies have',
        'the obtained results',
        // 'study was approved',
        // 'authors declare',
        // 'was associated with',
        // 'was funded',
        // 'was suspected',
        'the present study * a',
        'the results * that',
        'prescribed vs administered',
        'conflicts of interest vs conflict of interest',
        // 'dose was *',
        // '* was inserted',
        // 'The * of this study',
        // '* revealed that'
    ];
    protected $listeners = [
        'buildneo4jQueryForSynonymString',
        'getIndividualPhraseAndCompare',
        'getSynonymsFromSynonmsApiAndHitNeoDB',
        'getDictionaryInfoForEnteredWord'
    ];

    public function render()
    {
        return view('livewire.lumiere-new.header');
    }

    public function resetAll($currentString)
    {
        $this->reset('synonmysOutput', 'totalOccurences', 'compareResults', 'dictionary', 'noResultFoundMessage');
        $this->dispatchBrowserEvent('reset-entered-string', ['inputQueryString' => $currentString]);
    }

    public function searchL($lumiereQueryString)
    {
        $this->reset('synonmysOutput', 'errorMessage', 'totalOccurences', 'compareResults', 'asteriskPosition', 'dictionary', 'noResultFoundMessage');
        $this->lumiereQueryString = strtolower($lumiereQueryString);
        $this->loading = true;
        $this->dispatchBrowserEvent('show-lum-searching', ['inputQueryString' => $this->lumiereQueryString]);
        match (true) {
            (Str::substrCount($lumiereQueryString, '*') == 2) => $this->getSynonymsFromSynonmsApi(),
            Str::contains($this->lumiereQueryString, '*') => $this->findSynonyms(),
            Str::contains($this->lumiereQueryString, 'vs') => $this->compare(),

            default => $this->findSynonyms(),
        };
        // $this->emit('refreshRecentQueries');

        // $this->synonmysOutput[1] = 1;
    }

    public function getSynonymsFromSynonmsApi()
    {
        $this->emit('getSynonymsFromSynonmsApiAndHitNeoDB');
    }

    public function getSynonymsFromSynonmsApiAndHitNeoDB()
    {
        $findSynonmOfThisWord = Str::between($this->lumiereQueryString, '*', '*');
        $arr_str = explode(" ", $this->lumiereQueryString);
        $wordPosition = array_search('*' . $findSynonmOfThisWord . '*', $arr_str);


        $response = Http::get(config('constants.synonyms_dictionary_api') . $findSynonmOfThisWord);
        if ($response->successful()) {
            $arrayOfSynonyms = $response->json();

            $synonymStrings = collect($arrayOfSynonyms)->map(function ($item) use ($findSynonmOfThisWord) {
                return collect($item)->collectBy('synonymous_list')->map(function ($indiWord) use ($findSynonmOfThisWord) {
                    return str_replace('*' . $findSynonmOfThisWord . '*', $indiWord, $this->lumiereQueryString);
                });
            });

            $originalInputString = str_replace('*' . $findSynonmOfThisWord . '*', $findSynonmOfThisWord, $this->lumiereQueryString);;
            $synonymStrings = $synonymStrings->flatten()->prepend($originalInputString)->unique()->toArray();

            $queryArray = [];
            foreach ($synonymStrings as $value) {
                $queryArray[$value . '_count'] = $this->buildQueryForStringWithoutOperators($value);
            }

            $responses = $this->hitDBAndGetResult($queryArray);

            $compareResultsArray = [];
            foreach ($synonymStrings as $value) {
                $compareResultsArray[$value] = $responses[$value . '_count']->json()['results'][0]['_fields'][0]['low'];
            }

            $this->synonmysOutput = collect($compareResultsArray)->filter(function ($checkTheStringCount) {
                return $checkTheStringCount > 2;
            })->sortDesc();

            $this->synonmysOutput = collect($this->synonmysOutput)->mapWithKeys(function ($key, $item) use ($wordPosition) {
                $stringItems = explode(' ', $item);
                $stringItems[$wordPosition] = '<b>' . $stringItems[$wordPosition] . '</b>';
                return [implode(' ', $stringItems) => $key];
            })->toArray();

            $this->asteriskPosition = 2;
            $this->loading = false;
            $this->dispatchBrowserEvent('show-lum-searching', ['inputQueryString' => $this->lumiereQueryString]);
            if (count($this->synonmysOutput) === 0) {
                $this->noResultFoundMessage = "No records found. That's unusual. Please check the search query for typos and try again.";
            } else {
                LumiereStoreUserQueriesJob::dispatch([
                    'query' => $this->lumiereQueryString,
                    'type_of_query' => 3,
                    'user_id' => user()->id,
                    'data' => json_encode($this->synonmysOutput)
                ]);
            }
        }
    }

    protected function findSynonyms()
    {
        $this->recordsToLimit = 40;
        // $this->dispatchBrowserEvent('show-lum-searching', ['inputQueryString' => $this->lumiereQueryString]);
        $this->emit('buildneo4jQueryForSynonymString');
        // $this->buildneo4jQueryForSynonymString();
    }

    protected function compare()
    {
        $this->emit('getIndividualPhraseAndCompare');
    }

    public function getIndividualPhraseAndCompare()
    {
        $this->recordsToLimit = 10;
        $arrayOfStringsToCompare = array_map('trim', explode('vs', $this->lumiereQueryString));
        $this->compareResults = $this->flippedArray = array_flip($arrayOfStringsToCompare);
        foreach ($this->flippedArray as $key => $value) {
            $this->flippedArray[$key] = $this->colorsArray[$value];
        }

        $queryArray = [];
        foreach ($arrayOfStringsToCompare as $key => $value) {
            // $this->compareResults[$value] = $this->getCountOfString($value);
            $queryArray[$value . '_count'] = $this->buildQueryForStringWithoutOperators($value);
            $queryArray[$value] = $this->buildneo4jQueryForSynonymString($value);
        }
        $responses = $this->hitDBAndGetResult($queryArray);
        foreach ($arrayOfStringsToCompare as $key => $value) {
            collect($responses[$value . '_count']->json()['results'])->each(function ($item, $key) use ($value) {
                $this->compareResults[$value] = $item['_fields'][0]['low'];
            });

            collect($responses[$value]->json()['results'])->each(function ($item, $key) use ($value) {
                array_pop($item['_fields']); // remove counts
                $originalString = implode(' ', $item['_fields']);
                $finalString = str_replace($value, '<b class="px-1 py-1 rounded font-normal" style="background:' . $this->flippedArray[$value] . ';">' . $value . '</b> ', $originalString);

                $this->synonmysOutput[$finalString] = 1;
            });
        }

        $this->loading = false;
        $this->dispatchBrowserEvent('show-lum-searching', ['inputQueryString' => $this->lumiereQueryString]);
        if (count($this->synonmysOutput) === 0) {
            $this->noResultFoundMessage = "No records found. That's unusual. Please check the search query for typos and try again.";
        } else {
            LumiereStoreUserQueriesJob::dispatch([
                'query' => $this->lumiereQueryString,
                'type_of_query' => 1,
                'user_id' => user()->id,
                'data' => json_encode($this->synonmysOutput)
            ]);
        }
    }

    public function getCountOfString($queryStringToCheck = null)
    {
        if ($queryStringToCheck) {
            $longestString = array_reduce(str_word_count($queryStringToCheck, 1), function ($v, $p) {
                return strlen($v) > strlen($p) ? $v : $p;
            });
            $patternArray = [];
            $currentCount = 1;
            $indexQuery = '';
            $stringValues = explode(' ', $queryStringToCheck);
            foreach ($stringValues as $string) {
                array_push($patternArray, "(n" . $currentCount . ":TOK {wordl: '" . $string . "'})");
                if ($longestString == $string) {
                    $indexQuery =  ' USING INDEX n' . $currentCount . ':TOK(wordl) ';
                }
                $currentCount++;
            }

            $queryToFire = "PROFILE
            MATCH " . implode('-[:NXT]->', $patternArray) . "
            $indexQuery
            RETURN count(*) as Count;";

            $response = $this->hitDBAndGetResult(['queryResults' => $queryToFire]);

            return $response['queryResults']->json()['results'][0]['_fields'][0]['low'];
        }
        return 0;
    }

    public function buildneo4jQueryForSynonymString($inputStringToWork = null)
    {
        // $this->consoleLog($this->lumiereQueryString);
        $stringToWork = $this->lumiereQueryString;
        if ($inputStringToWork) {
            $stringToWork = $inputStringToWork;
        }

        // if entere input is a single word, then call dictionary
        if (Str::wordCount($stringToWork) == 1) {
            $this->emit('getDictionaryInfoForEnteredWord');
        }


        $longestString = array_reduce(str_word_count($stringToWork, 1), function ($v, $p) {
            return strlen($v) > strlen($p) ? $v : $p;
        });
        $indexQuery = '';

        $getPrevAndNext = array_map('trim', explode(' ', $stringToWork));
        $currentCount = 1;
        $patternArray = $returnArray = [];

        if (!Str::contains($this->lumiereQueryString, '*')) {
            for ($i = 1; $i <= $this->totalTokensToAppendPrepend; $i++) {
                array_push($patternArray, "(n" . $currentCount . ":TOK)");
                array_push($returnArray, "n" . $currentCount . ".wordl as Word" . $i . ",");
                $currentCount++;
            }
        } else {
            $this->recordsToLimit = 10;
        }

        foreach ($getPrevAndNext as $key => $value) {
            if ($value == '*') {
                $this->asteriskPosition = $currentCount;
                array_push($patternArray, "(n" . $currentCount . ":TOK)");
            } else {
                array_push($patternArray, "(n" . $currentCount . ":TOK {wordl: '" . $value . "'})");
            }

            if ($value == $longestString)
                $indexQuery =  ' USING INDEX n' . $currentCount . ':TOK(wordl) ';

            array_push($returnArray, "n" . $currentCount . ".wordl as Word" . $currentCount . ",");
            $currentCount++;
        }

        if (!Str::contains($this->lumiereQueryString, '*')) {
            for ($i = (count($getPrevAndNext) + 1); $i <= (count($getPrevAndNext) + $this->totalTokensToAppendPrepend); $i++) {
                array_push($patternArray, "(n" . $currentCount . ":TOK)");
                array_push($returnArray, "n" . $currentCount . ".wordl as Word" . $currentCount . ",");
                $currentCount++;
            }
        }

        $orderByPartOfQuery = '';
        $addCountToQueryAndStatiscalResults = '';
        if ((str_word_count($stringToWork) > 1)) {
            $orderByPartOfQuery = ' ORDER BY Count DESC ';
            $addCountToQueryAndStatiscalResults = ', count(*) as Count ';
        }

        $query = 'PROFILE MATCH 
            p=' . implode('-[:NXT]->', $patternArray) .  $indexQuery .
            'RETURN ' . rtrim(implode('', $returnArray), ',') . $addCountToQueryAndStatiscalResults . $orderByPartOfQuery .
            ' LIMIT ' . $this->recordsToLimit . ';';

        if ($inputStringToWork) {
            return $query;
        } else {

            // get total count if there are not operators *
            $countQuery = '';
            if ($this->asteriskPosition == 0) {
                $countQuery = $this->buildQueryForStringWithoutOperators($stringToWork);
            }
            // end

            $responses = $this->hitDBAndGetResult([
                'queryResult' => $query,
                'queryCount' => $countQuery
            ]);

            collect($responses['queryResult']->json()['results'])->each(function ($item) use ($stringToWork) {
                $countOfThisString = '';

                if (Str::contains($this->lumiereQueryString, '*')) {
                    $countOfThisString = end($item['_fields'])['low'];
                    array_pop($item['_fields']); // remove counts
                    $originalString = implode(' ', $item['_fields']);
                    $wordToReplaceAsterisk = $item['_fields'][$this->asteriskPosition - 1];
                    $stringWithoutAsterisk = str_replace('*', '<b>' . $wordToReplaceAsterisk . '</b>', $stringToWork);
                    $this->synonmysOutput[$stringWithoutAsterisk] = $countOfThisString;
                } else {
                    array_pop($item['_fields']); // remove counts
                    $originalString = implode(' ', $item['_fields']);
                    if ($this->asteriskPosition == 0) {
                        $finalString = str_replace($stringToWork, '<b class="bg-sweet-corn-400 px-1 py-1 rounded">' . $stringToWork . '</b> ', $originalString);
                    } else if ($this->asteriskPosition > 0) {
                        $wordToReplaceAsterisk = $item['_fields'][$this->asteriskPosition - 1];
                        $stringWithoutAsterisk = str_replace('*', $wordToReplaceAsterisk, $stringToWork);
                        $finalString = str_replace($stringWithoutAsterisk, '<b class="bg-sweet-corn-400 px-1 py-1 rounded">' . $stringWithoutAsterisk . '</b> ', $originalString);
                    } else {
                        $finalString = $originalString;
                    }
                    $this->synonmysOutput[$finalString] = 1;
                }
            });

            if ($this->asteriskPosition == 0) {
                $this->totalOccurences = $responses['queryCount']->json()['results'][0]['_fields'][0]['low'];
            }

            $this->loading = false;
            $this->dispatchBrowserEvent('show-lum-searching', ['inputQueryString' => $stringToWork]);
            if (count($this->synonmysOutput) === 0) {
                $this->noResultFoundMessage = "No records found. That's unusual. Please check the search query for typos and try again.";
            } else {
                LumiereStoreUserQueriesJob::dispatch([
                    'query' => $stringToWork,
                    'type_of_query' => 2,
                    'user_id' => user()->id,
                    'data' => json_encode($this->synonmysOutput)
                ]);
            }
        }
    }

    public function getDictionaryInfoForEnteredWord()
    {
        $response = Http::get(config('constants.synonyms_dictionary_api') . $this->lumiereQueryString);
        $this->dictionary = $response->json();
        $this->dispatchBrowserEvent('show-lum-searching', ['inputQueryString' => $this->lumiereQueryString]);
    }

    protected function buildQueryForStringWithoutOperators($stringWithoutOperator)
    {
        $indexQuery = '';
        $longestString = array_reduce(str_word_count($stringWithoutOperator, 1), function ($v, $p) {
            return strlen($v) > strlen($p) ? $v : $p;
        });
        $getPrevAndNext = array_map('trim', explode(' ', $stringWithoutOperator));
        foreach ($getPrevAndNext as $key => $value) {
            $matchForTotalCount[] = '(n' . ($key + 1) . ':TOK {wordl: "' . $value . '"})';
            if ($value == $longestString)
                $indexQuery =  ' USING INDEX n' . ($key + 1) . ':TOK(wordl) ';
        }

        return 'PROFILE 
            MATCH ' . implode('-[:NXT]->', $matchForTotalCount) . $indexQuery .
            'RETURN Count(*) as Count 
            Limit 10;';
    }

    protected function hitDBAndGetResult($queriesToExecute)
    {
        $header = [
            'Accept'        => 'application/json',
            'Content-type'  => 'application/json'
        ];
        // $params = [
        //     'headers' => $header,
        //     'q'    => $query,
        // ];

        $keyToCheck = array_key_first($queriesToExecute);

        $queriesToExecute = collect($queriesToExecute);

        ServerTiming::start('Neo4j');
        $responses = Http::pool(fn (Pool $pool) =>
        $queriesToExecute->map(
            fn ($query, $key) =>
            $pool->as($key)->post('http://localhost:3000/lumiere', [
                'headers' => $header,
                'q' => $query
            ])
        ));
        ServerTiming::start('Neo4j');

        if ($responses[$keyToCheck]->successful()) {
            return $responses;
        } else {
            $this->dispatchBrowserEvent('oops-error');
            $this->errorMessage = 'System encountered an error. Please refresh and try again. If problem continues, please contact administrator.';
        }



        // if (isset($countQuery) && $countQuery != '') {
        //     $paramsForCount = [
        //         'headers' => $header,
        //         'q'    => $countQuery,
        //     ];

        //     $responses = Http::pool(fn (Pool $pool) => [
        //         $pool->post('http://localhost:3000/lumiere', $params),
        //         $pool->post('http://localhost:3000/lumiere', $paramsForCount),
        //     ]);

        //     if ($responses[1]->ok()) {
        //         $this->totalOccurences = $responses[1]->json()['results'][0]['_fields'][0]['low'];
        //     }

        //     $response = $responses[0];
        // } else {
        //     $response = Http::post('http://localhost:3000/lumiere', $params);
        // }

        // if (count($queriesToExecute) == 1) {
        //     $response = $responses[0];
        // }

        // if ($response->successful()) {
        //     return $response->json()['results'];
        // } else {
        //     $this->dispatchBrowserEvent('oops-error');
        //     $this->errorMessage = 'System encountered an error. Please refresh and try again. If problem continues, please contact administrator.';
        // }
    }
}
