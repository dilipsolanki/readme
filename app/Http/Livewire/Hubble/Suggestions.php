<?php

namespace App\Http\Livewire\Hubble;

use App\Models\Hubble;
use App\Models\HubbleExtended;
use Livewire\Component;

class Suggestions extends Component
{
    public $suggestionsArray;
    public $originalMessage;
    protected $listeners = [
        'updateHubbleAndExtended',
        'feedbackSaveUpdateHubble' => 'updateHubble'
    ];
    public $applySkipped;
    public $checked;
    public $dataKey;
    public $acceptedAll = false;
    public $acceptedCount = 0;
    public $hubble;

    public function mount($hubble)
    {
        $this->hubble = $hubble;
        $this->originalMessage = $hubble['originalMessage'];
    }

    public function render()
    {
        $hubbleExtendedData = HubbleExtended::whereHubbleId($this->hubble['id'])->orderBy('id')->get()->toArray();
        $this->suggestionsArray = ['data' => $hubbleExtendedData];

        $this->checkIfAllAccepted();
        return view('livewire.frontend.hubble.suggestions');
    }

    public function checkIfAllAccepted()
    {
        $this->acceptedCount = collect($this->suggestionsArray['data'])->filter(function ($item) {
            return $item['checked'] == 1;
        })->count();
        if ($this->acceptedCount == count($this->suggestionsArray['data']))
            $this->acceptedAll = true;
    }

    public function updateHubbleAndExtended()
    {
        HubbleExtended::where('hubble_id', $this->hubble['id'])
            ->where('dataKey', $this->dataKey)
            ->update([
                'type' => $this->applySkipped,
                'checked' => $this->checked
            ]);

        Hubble::whereId($this->hubble['id'])->update(['content' => $this->originalMessage]);

        $this->emit('original_content_updated', $this->originalMessage);
        $this->dispatchBrowserEvent('suggestion-actioned-successfully', ['dataKey' => $this->dataKey]);
    }

    public function updateHubble($applySkipped, $checked, $dataKey, $existingType = null)
    {
        $this->applySkipped = $applySkipped;
        $this->checked = $checked;
        $this->dataKey = $dataKey;

        collect($this->suggestionsArray['data'])->filter(function ($item) use ($dataKey, $applySkipped, $existingType) {
            if ($item['dataKey'] == $dataKey) {
                if ($item['original_word'] == '')
                    $item['original_word'] = "?";
                if ($applySkipped == 'Accepted') {
                    $this->originalMessage = str_replace('<a class="error-word" data-key="' . $dataKey . '" @click="selectedSuggestionNo!==\'' . $dataKey . '\' ? selectedSuggestionNo=\'' . $dataKey . '\' : selectedSuggestionNo=null">' . $item['original_word'] . '</a>', '<a class="corrected-word-sentence" data-key_err="'.$dataKey.'" @click="selectedSuggestionNo!==\'' . $dataKey . '\' ? selectedSuggestionNo=\'' . $dataKey . '\' : selectedSuggestionNo=null">' . $item['changed_word'] . '</a>', $this->originalMessage);
                } else if ($applySkipped == 'Declined') {
                    $this->originalMessage = str_replace('<a class="error-word" data-key="' . $dataKey . '" @click="selectedSuggestionNo!==\'' . $dataKey . '\' ? selectedSuggestionNo=\'' . $dataKey . '\' : selectedSuggestionNo=null">' . $item['original_word'] . '</a>', '<a class="corrected-word-sentence" data-key_err="'.$dataKey.'" @click="selectedSuggestionNo!==\'' . $dataKey . '\' ? selectedSuggestionNo=\'' . $dataKey . '\' : selectedSuggestionNo=null">' . $item['original_word'] . '</a>', $this->originalMessage);
                } else if ($applySkipped == 'Undo') {
                    if ($existingType == 'Accepted')
                        $this->originalMessage = str_replace('<a class="corrected-word-sentence" data-key_err="'.$dataKey.'" @click="selectedSuggestionNo!==\'' . $dataKey . '\' ? selectedSuggestionNo=\'' . $dataKey . '\' : selectedSuggestionNo=null">' . $item['changed_word'] . '</a>', '<a class="error-word" data-key="' . $dataKey . '" @click="selectedSuggestionNo!==\'' . $dataKey . '\' ? selectedSuggestionNo=\'' . $dataKey . '\' : selectedSuggestionNo=null">' . $item['original_word'] . '</a>', $this->originalMessage);
                    else if ($existingType == 'Declined')
                        $this->originalMessage = str_replace('<a class="corrected-word-sentence" data-key_err="'.$dataKey.'" @click="selectedSuggestionNo!==\'' . $dataKey . '\' ? selectedSuggestionNo=\'' . $dataKey . '\' : selectedSuggestionNo=null">' . $item['original_word'] . '</a>', '<a class="error-word" data-key="' . $dataKey . '" @click="selectedSuggestionNo!==\'' . $dataKey . '\' ? selectedSuggestionNo=\'' . $dataKey . '\' : selectedSuggestionNo=null">' . $item['original_word'] . '</a>', $this->originalMessage);
                }
            }
            return $item;
        });

        $this->reset('suggestionsArray');
        $hubbleExtendedData = HubbleExtended::whereHubbleId($this->hubble['id'])->orderBy('id')->get()->toArray();
        $this->suggestionsArray = ['data' => $hubbleExtendedData];
        $this->checkIfAllAccepted();
        $this->emit('updateHubbleAndExtended');
    }

    public function acceptAllSuggestions()
    {
        collect($this->suggestionsArray['data'])->filter(function ($item) {
            if ($item['original_word'] == '')
                $item['original_word'] = "?";
            $this->originalMessage = str_replace('<a class="error-word" data-key="' . $item['dataKey'] . '" @click="selectedSuggestionNo!==\'' . $item['dataKey'] . '\' ? selectedSuggestionNo=\'' . $item['dataKey'] . '\' : selectedSuggestionNo=null">' . $item['original_word'] . '</a>', '<a class="corrected-word-sentence" @click="selectedSuggestionNo!==\'' . $item['dataKey'] . '\' ? selectedSuggestionNo=\'' . $item['dataKey'] . '\' : selectedSuggestionNo=null">' . $item['changed_word'] . '</a>', $this->originalMessage);
        });

        $getHubbleExtendedIds = collect($this->suggestionsArray['data'])->pluck('id')->toArray();
        // dd($getHubbleExtendedIds);
        $this->reset('suggestionsArray');

        HubbleExtended::where('checked', false)
            ->whereIn('id', $getHubbleExtendedIds)
            ->update([
                'type'       => 'Accepted',
                'checked'    => 1,
            ]);

        $hubbleExtendedData = HubbleExtended::whereHubbleId($this->hubble['id'])->orderBy('id')->get()->toArray();
        $this->suggestionsArray = ['data' => $hubbleExtendedData];
        Hubble::whereId($this->hubble['id'])->update(['content' => $this->originalMessage]);

        $this->emit('original_content_updated', $this->originalMessage);
        // $this->emit('updateHubbleAndExtended');

        $lastSuggestion = collect($this->suggestionsArray['data'])->last();
        $this->acceptedAll = true;
        $this->checkIfAllAccepted();
        $this->dispatchBrowserEvent('suggestion-actioned-successfully', ['dataKey' => $lastSuggestion['dataKey']]);
    }

    public function undoAllSuggestions()
    {
        collect($this->suggestionsArray['data'])->filter(function ($item) {
            if ($item['original_word'] == '')
                $item['original_word'] = "?";
            if ($item['type'] == 'Accepted')
                $this->originalMessage = str_replace('<a class="corrected-word-sentence" @click="selectedSuggestionNo!==\'' . $item['dataKey'] . '\' ? selectedSuggestionNo=\'' . $item['dataKey'] . '\' : selectedSuggestionNo=null">' . $item['changed_word'] . '</a>', '<a class="error-word" data-key="' . $item['dataKey'] . '" @click="selectedSuggestionNo!==\'' . $item['dataKey'] . '\' ? selectedSuggestionNo=\'' . $item['dataKey'] . '\' : selectedSuggestionNo=null">' . $item['original_word'] . '</a>', $this->originalMessage);
            else if ($item['type'] == 'Declined')
                $this->originalMessage = str_replace('<a class="corrected-word-sentence" @click="selectedSuggestionNo!==\'' . $item['dataKey'] . '\' ? selectedSuggestionNo=\'' . $item['dataKey'] . '\' : selectedSuggestionNo=null">' . $item['original_word'] . '</a>', '<a class="error-word" data-key="' . $item['dataKey'] . '" @click="selectedSuggestionNo!==\'' . $item['dataKey'] . '\' ? selectedSuggestionNo=\'' . $item['dataKey'] . '\' : selectedSuggestionNo=null">' . $item['original_word'] . '</a>', $this->originalMessage);
        });

        $getHubbleExtendedIds = collect($this->suggestionsArray['data'])->pluck('id')->toArray();
        // dd($getHubbleExtendedIds);
        $this->reset('suggestionsArray');

        HubbleExtended::whereIn('id', $getHubbleExtendedIds)
            ->update([
                'type'       => null,
                'checked'    => 0,
            ]);

        $hubbleExtendedData = HubbleExtended::whereHubbleId($this->hubble['id'])->orderBy('id')->get()->toArray();
        $this->suggestionsArray = ['data' => $hubbleExtendedData];
        Hubble::whereId($this->hubble['id'])->update(['content' => $this->originalMessage]);

        $this->emit('original_content_updated', $this->originalMessage);
        // $this->emit('updateHubbleAndExtended');

        $lastSuggestion = collect($this->suggestionsArray['data'])->last();
        $this->acceptedAll = false;
        $this->checkIfAllAccepted();
        $this->dispatchBrowserEvent('suggestion-actioned-successfully', ['dataKey' => $lastSuggestion['dataKey']]);
    }
}
