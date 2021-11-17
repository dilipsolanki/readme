<?php

namespace App\Http\Livewire;

use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;
use Illuminate\Support\Facades\Log;
use Livewire\Component;

class SpellCheckMain extends Component
{

    public $spellCheck = [
        'originalMessage' => '',
        'apiResponse' => [],
        'totalErrors' => 0,
        'currentSelectedWordFromOriginalMessage' => ''
    ];

    protected $listeners = ['spellCheckFeedbackSaved'];

    public $offsetOfCurrentSelectedWordFromOriginalMessage;
    public $currentSelectedWordSuggestions;
    public $suggestedWordToReplace = '';


    public function render()
    {
        return view('livewire.spell-check-main');
    }

    public function resetContent()
    {
        $this->spellCheck['originalMessage'] = '';
    }

    public function clearValues()
    {
        $this->spellCheck['currentSelectedWordFromOriginalMessage'] = '';
        $this->offsetOfCurrentSelectedWordFromOriginalMessage = '';
        $this->suggestedWordToReplace = '';
        $this->currentSelectedWordSuggestions = '';
    }

    public function updated($name, $value)
    {
        if ($this->offsetOfCurrentSelectedWordFromOriginalMessage != '' && $this->suggestedWordToReplace != '') {
            preg_match_all('/<a .*?>(.*?)<\/a>/', $this->spellCheck['originalMessage'], $matches);

            collect($matches[0])->each(function ($string) {
                if (str_contains($string, 'data-offset="' . $this->offsetOfCurrentSelectedWordFromOriginalMessage . '"') && trim($this->offsetOfCurrentSelectedWordFromOriginalMessage) != '') {
                    $this->spellCheck['originalMessage'] = str_replace($string, $this->suggestedWordToReplace, $this->spellCheck['originalMessage']);
                    $this->spellCheck['totalErrors']--;
                }
            });

            $this->clearValues();
        }
    }

    public function runSpellCheck()
    {
        if (trim($this->spellCheck['originalMessage'])) {
            $this->spellCheck['totalErrors'] = 0;
            $this->spellCheck['originalMessage'] = strip_tags($this->spellCheck['originalMessage']);

            $this->getSuggestions($this->spellCheck['originalMessage']);

            $this->spellCheck['originalMessage'] = $this->formattedContent();
        }
    }

    public function formattedContent()
    {
        if (!empty($this->spellCheck['apiResponse'])) {
            foreach ($this->spellCheck['apiResponse'] as $key => $word) {
                $currentWord = $word['word'];
                $wordSuggestions = collect($word['suggestions'])->implode(',');
                $offset = $word['offset'];

                $replacement = '<a @click.stop="suggestionsModal=false;" @click="suggestionsModal=true;getCoOrdAndFetchCorrections($event, $dispatch, ' . $offset . ');$dispatch(\'notify\', {wordSuggestions: \'' . $wordSuggestions . '\', offset: \'' . $offset . '\' });" class="border-b-2 border-red-600 cursor-pointer bg-red-50" data-key="' . $word['word_offset_key'] . '" data-offset="' . $offset . '" data-suggestions="' . $wordSuggestions . '">' . $currentWord . '</a>';

                $this->spellCheck['originalMessage'] = $this->str_replace_n($currentWord, $replacement, $this->spellCheck['originalMessage'], ($word['offset_key'] + 1));
            }
        }

        return str_replace('&nbsp;', '', $this->spellCheck['originalMessage']) . '&nbsp;';
    }


    function str_replace_n($search, $replace, $subject, $occurrence)
    {
        $search = preg_quote($search);
        return preg_replace("/^((?:(?:.*?$search){" . --$occurrence . "}.*?))$search/", "$1$replace", $subject);
    }

    public function getSuggestions($content)
    {
        try {
            $client = new Client([
                'verify' => false, // to be removed
            ]);
            $response = $client->post(config('constants.spell_checker.api_url'), [
                RequestOptions::JSON => [
                    'text'       => $content,
                    'filename'   => date('Y-m-d H:i:s') . '_doc.txt',
                    'request_id' => config('constants.spell_checker.request_id'),
                    'OAuth'      => config('constants.spell_checker.oauth'),
                ]
            ]);

            $result = $response->getBody()->getContents();
            if ($result) {
                $jsonDecodedResult = json_decode($result);
                $this->getPreparedResult($jsonDecodedResult);
            }
        } catch (\Exception $e) {
            Log::info('Spell Check API Exception Error ' . $e->getMessage());
        }
    }

    public function getPreparedResult($result)
    {
        if (!empty($result->spellErrors) && !empty($result->spellErrors->words) && $result->spellErrors->uniqueSpellErrorCount != 0) {
            $errorCount = 0;
            $combinedOffsetLengths = [];
            foreach ($result->spellErrors->words as $wKey => $word) {
                foreach ($word->offset as $oKey => $offset) {
                    $suggestion = [];
                    $ignore = false;
                    $length = $word->length;
                    if (!empty($word->suggestions->single)) {
                        $suggestion = $word->suggestions->single;
                        $ignore = $this->fallsInRanges($offset, $combinedOffsetLengths);
                    }
                    if (!empty($word->suggestions->compound)) {
                        $suggestion = array_merge($suggestion, $word->suggestions->compound);
                        array_push($combinedOffsetLengths, [$offset, $offset + $length]);
                    }
                    if (!$ignore) {
                        array_push($this->spellCheck['apiResponse'], [
                            'word'            => $word->word,
                            'offset'          => $offset,
                            'word_offset_key' => $wKey . $oKey,
                            'offset_key'      => $oKey,
                            'length'          => $length,
                            'suggestions'     => array_unique($suggestion),
                            'replacement'     => !empty($word->suggestions->replacement) ? $word->suggestions->replacement : '',
                        ]);
                        $this->spellCheck['totalErrors']++;
                    }
                }
            }
        }
        usort($this->spellCheck['apiResponse'], function ($item1, $item2) {
            return $item1['offset'] <=> $item2['offset'];
        });
    }

    public function fallsInRanges($offset, $ranges)
    {
        foreach ($ranges as $range) {
            if (($range[0] <= $offset) && ($offset <= $range[1])) {
                return true;
            }
        }
        return false;
    }

    public function spellCheckFeedbackSaved()
    {
        if ($this->offsetOfCurrentSelectedWordFromOriginalMessage != '') {
            preg_match_all('/<a .*?>(.*?)<\/a>/', $this->spellCheck['originalMessage'], $matches);

            collect($matches[0])->each(function ($string) {
                if (str_contains($string, 'data-offset="' . $this->offsetOfCurrentSelectedWordFromOriginalMessage . '"') && trim($this->offsetOfCurrentSelectedWordFromOriginalMessage) != '') {

                    $this->spellCheck['originalMessage'] = str_replace($string, $this->spellCheck['currentSelectedWordFromOriginalMessage'], $this->spellCheck['originalMessage']);
                    $this->spellCheck['totalErrors']--;
                }
            });

            $this->clearValues();
        }
    }
}
