<?php

namespace App\Http\Livewire;

use App\Models\LumiereQuery;
use GuzzleHttp\Client;
use Livewire\Component;
use Laudis\Neo4j\Authentication\Authenticate;
use Laudis\Neo4j\ClientBuilder;
use Laudis\Neo4j\Formatter\BasicFormatter;


class Lumiere extends Component
{
    public $string_one;
    public $string_two;
    public $synonyms_string;

    public $patternString;
    public $returnString;
    public $totalOccurences = 0;
    public $totalTokens = 0;

    public $asteriskPosition = 0;

    public $comparisonResults = [];
    public $compareStringExamples = [
        'data is VS data are',
        'findings showed VS findings revealed',
        'aim of this study VS purpose of this study'
    ];

    public $findWordsInContextExamples = [
        'patients presented with',
        'conflicts of interest',
        '* was administered'
    ];

    public function resetValues()
    {
        $this->reset(['comparisonResults', 'string_two', 'string_one', 'synonyms_string', 'asteriskPosition']);
    }

    public function render()
    {
        return view('livewire.lumiere');
    }

    public function compareStrings()
    {
        $this->reset('comparisonResults');
        $string_two = explode(" ", $this->string_two);
        $string_one = explode(" ", $this->string_one);

        $string_one = "'" . implode("','", $string_one) . "'";
        $string_two = "'" . implode("','", $string_two) . "'";

        $client = ClientBuilder::create()
            ->withFormatter(new BasicFormatter())
            ->withDriver("http", 'http://' . config('constants.lumiere.neo4j_host') . ':' . config('constants.lumiere.neo4j_port'), Authenticate::basic(config('constants.lumiere.neo4j_username'), config('constants.lumiere.neo4j_password')))
            // ->withDriver('neo4j', 'neo4j+s://bolt.db.test1.lumiere.cactuslabs.io:7687', Authenticate::basic('neo4j', 'cactusLumiere99'))
            ->build();
        $results = $client->run('UNWIND [ [' . $string_one . '], [' . $string_two . '] ] AS terms
                CALL {
                WITH terms
                MATCH (:TOK {wordl: terms[0]})-[r1:NXT]->(:TOK {wordl: terms[1]})
                RETURN count(r1) as term_count
                }
                RETURN terms, term_count');

        $this->comparisonResults['lum_total'] = 0;
        foreach ($results as $result) {
            $this->comparisonResults[implode(' ', $result->get('terms'))] = $result->get('term_count');
            $this->comparisonResults['lum_total'] += $result->get('term_count');
        }

        LumiereQuery::create([
            'query' => $this->string_one . ' vs ' . $this->string_two,
            'type_of_query' => 1,
            'user_id' => auth()->user()->id,
            'data' => json_encode($this->comparisonResults)
        ]);
    }

    public function findSynonymStringOrWordsInContext()
    {

        $this->reset('comparisonResults', 'asteriskPosition');
        $this->buildneo4jQueryForSynonymString();
        $query = 'MATCH 
        p=' . $this->patternString . '
    RETURN
            ' . $this->returnString . '
        ORDER BY 
            Count DESC
        LIMIT 40;
    ';
        // $client = new Client([
        //     'verify' => false, // to be removed
        // ]);
        // $header = [
        //     'Accept'        => 'application/json',
        //     'Content-type'  => 'application/json'
        // ];
        // $params = [
        //     'headers' => $header,
        //     'body'    => json_encode(['q' => $query]),
        // ];

        // $response = $client->post('http://localhost:3000/lumiere', $params);
        // $result = $response->getBody()->getContents();
        // $results = json_decode($result);
        $response = $this->hitDBAndGetResult($query);

        collect($response->results)->each(function ($item) {
            array_pop($item->_fields);
            $originalString = implode(' ', $item->_fields);
            if ($this->asteriskPosition > 0) {
                $wordToReplaceAsterisk = $item->_fields[$this->asteriskPosition - 1];
                $stringWithoutAsterisk = str_replace('*', $wordToReplaceAsterisk, $this->synonyms_string);
                $finalString = str_replace($stringWithoutAsterisk, '<b class="bg-sweet-corn-400 px-1 py-1 rounded">' . $stringWithoutAsterisk . '</b> ', $originalString);
            } else {
                $finalString = $originalString;
            }
            $this->comparisonResults[$finalString] = 1;
        });
        if ($this->asteriskPosition == 0)
            $this->totalOccurences = $this->getTotalCountOfPhraseOccurence($this->synonyms_string);

        // $this->asteriskPosition = 1;
        // dd('stopped');
        // $client = ClientBuilder::create()
        //     ->withFormatter(new BasicFormatter())
        //     ->withDriver("http", 'http://' . config('constants.lumiere.neo4j_host') . ':' . config('constants.lumiere.neo4j_port'), Authenticate::basic(config('constants.lumiere.neo4j_username'), config('constants.lumiere.neo4j_password')))
        //     // ->withDriver('neo4j', 'neo4j+s://bolt.db.test1.lumiere.cactuslabs.io:7687', Authenticate::basic('neo4j', 'cactusLumiere99'))
        //     ->build();

        // $results = $client->run('MATCH 
        //             p=' . $this->patternString . '
        //         RETURN
        //                 ' . $this->returnString . '
        //             ORDER BY 
        //                 Count DESC
        //             LIMIT 40;
        //         ');

        // $countOfTokens = $this->totalTokens;

        // if (count($results) > 0) {
        //     $arrayOfResultString = [];
        //     foreach ($results as $result) {
        //         $resultString = '';
        //         $wordToReplaceAsterisk = '';
        //         for ($i = 1; $i <= $countOfTokens; $i++) {
        //             if ($i == $this->asteriskPosition)
        //                 $wordToReplaceAsterisk = $result->get('Word' . $i);
        //             // $resultString .= '<b class="bg-sweet-corn-400 px-1 py-1 rounded">' . $result->get('Word' . $i) . '</b> ';
        //             // else
        //             $resultString .= $result->get('Word' . $i) . ' ';
        //         }

        //         if ($this->asteriskPosition != 0) {
        //             $stringWithoutAsterisk = str_replace('*', $wordToReplaceAsterisk, $this->synonyms_string);
        //             $resultString = str_replace($stringWithoutAsterisk, '<b class="bg-sweet-corn-400 px-1 py-1 rounded">' . $stringWithoutAsterisk . '</b> ', $resultString);
        //             $this->comparisonResults[trim($resultString)] = $stringWithoutAsterisk;
        //         } else {
        //             $this->comparisonResults[trim($resultString)] = $result->get('Count');
        //         }
        //         array_push($arrayOfResultString, trim($resultString));
        //     }
        //     if ($this->asteriskPosition == 0)
        //         $this->totalOccurences = $this->getTotalCountOfPhraseOccurence($this->synonyms_string);

        //     LumiereQuery::create([
        //         'query' => $this->synonyms_string,
        //         'type_of_query' => 2,
        //         'user_id' => auth()->user()->id,
        //         'data' => json_encode($arrayOfResultString)
        //     ]);
        // } else {
        //     $this->comparisonResults['no_lumiere_results'] = 1;
        // }
    }

    protected function buildneo4jQueryForSynonymString()
    {
        $getPrevAndNext = array_map('trim', explode(' ', strtolower($this->synonyms_string)));
        $this->totalTokens = count($getPrevAndNext);
        $currentCount = 1;
        $startMiddleEnd = 'middle';
        $patternArray = $returnArray = [];
        if (trim($this->synonyms_string)[0] === '*') {
            $startMiddleEnd = 'start';
        } else if (trim($this->synonyms_string)[-1] === '*') {
            $startMiddleEnd = 'end';
        }

        // if ($startMiddleEnd === 'start' || $startMiddleEnd === 'middle') {
        for ($i = 1; $i <= 6; $i++) {
            array_push($patternArray, "(n" . $currentCount . ":TOK)");
            array_push($returnArray, "n" . $currentCount . ".wordl as Word" . $i . ",");
            $currentCount++;
        }
        $this->totalTokens = $this->totalTokens + 6;
        // }

        foreach ($getPrevAndNext as $key => $value) {
            if ($value == '*') {
                $this->asteriskPosition = $currentCount;
                array_push($patternArray, "(n" . $currentCount . ":TOK)");
            } else
                array_push($patternArray, "(n" . $currentCount . ":TOK {wordl: '" . $value . "'})");

            array_push($returnArray, "n" . $currentCount . ".wordl as Word" . $currentCount . ",");
            $currentCount++;
        }



        // if ($startMiddleEnd === 'middle' || $startMiddleEnd === 'end') {
        for ($i = (count($getPrevAndNext) + 1); $i <= (count($getPrevAndNext) + 6); $i++) {
            array_push($patternArray, "(n" . $currentCount . ":TOK)");
            array_push($returnArray, "n" . $currentCount . ".wordl as Word" . $currentCount . ",");
            $currentCount++;
        }
        $this->totalTokens = $this->totalTokens + 6;
        // }
        // dd($currentCount, $returnArray, $patternArray);

        $this->patternString = implode('-[:NXT]->', $patternArray);
        $this->returnString = implode('', $returnArray) . "count(*) as Count";
        // dd($this->patternString, $this->returnString);
    }

    public function getTotalCountOfPhraseOccurence($inputString)
    {
        $stringArray = array_map('trim', explode(' ', strtolower($inputString)));

        $match = [];
        $with = '[';
        $totalCount = 0;

        foreach ($stringArray as $key => $word) {
            $match[] = '(n' . ($key + 1) . ':TOK {wordl: "' . $word . '"})';
            $with .= 'n' . ($key + 1) . '.wordl,';
        }
        $match = implode('-[:NXT]->', $match);
        $with = rtrim($with, ',') . '] AS word_pair';

        $query = '
        MATCH 
            p=' . $match . '
        USING
            INDEX n1:TOK(wordl)
        WITH ' . $with . '
        RETURN COUNT(word_pair) as totalCount, word_pair;';

        $response = $this->hitDBAndGetResult($query);
        return $response->results[0]->_fields[0]->low;
        // $client = ClientBuilder::create()
        //     ->withFormatter(new BasicFormatter())
        //     ->withDriver("http", 'http://' . config('constants.lumiere.neo4j_host') . ':' . config('constants.lumiere.neo4j_port'), Authenticate::basic(config('constants.lumiere.neo4j_username'), config('constants.lumiere.neo4j_password')))
        //     // ->withDriver('neo4j', 'neo4j+s://bolt.db.test1.lumiere.cactuslabs.io:7687', Authenticate::basic('neo4j', 'cactusLumiere99'))
        //     ->build();
        // $results = $client->run($query);
        // if ($results->count() > 0) {
        //     foreach ($results as $result) {
        //         $totalCount = $result->get('totalCount');
        //     }
        // }
        // return $totalCount;
    }

    public function setStringsFromExampleAndCompare($exampleId)
    {
        $getStrings = explode(' VS ', $this->compareStringExamples[$exampleId]);
        $this->string_one = $getStrings[0];
        $this->string_two = $getStrings[1];
        $this->reset('comparisonResults');
        $this->dispatchBrowserEvent('strings-are-ready-trigger-compare');
        // $this->compareStrings();
    }

    public function setSynonymStringAndFindWordsInContext($exampleId)
    {
        $this->synonyms_string = $this->findWordsInContextExamples[$exampleId];
        $this->reset('comparisonResults');
        $this->dispatchBrowserEvent('synonym-strings-is-ready-trigger-search');
    }

    protected function hitDBAndGetResult($query)
    {
        $client = new Client([
            'verify' => false, // to be removed
        ]);
        $header = [
            'Accept'        => 'application/json',
            'Content-type'  => 'application/json'
        ];
        $params = [
            'headers' => $header,
            'body'    => json_encode(['q' => $query]),
        ];

        $response = $client->post('http://localhost:3000/lumiere', $params);
        $result = $response->getBody()->getContents();
        return json_decode($result);
    }
}
