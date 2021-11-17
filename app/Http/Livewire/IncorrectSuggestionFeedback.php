<?php

namespace App\Http\Livewire;

use App\Models\FeedbackSuggestion;
use Illuminate\Support\Facades\Auth;
use LivewireUI\Modal\ModalComponent;

class IncorrectSuggestionFeedback extends ModalComponent
{
    public $spellWord;
    public $reason;
    public $recommendation;
    public $emit_this_after_saving_feedback;
    public $tool_name;
    public $additionalOptionalParameters = [];

    public function mount($spellWord, $emit_this_after_saving_feedback, $tool_name, $additionalOptionalParameters = [])
    {
        $this->spellWord = $spellWord;
        $this->emit_this_after_saving_feedback = $emit_this_after_saving_feedback;
        $this->tool_name = $tool_name;
        $this->additionalOptionalParameters = $additionalOptionalParameters;
    }

    public function render()
    {
        return view('livewire.incorrect-suggestion-feedback');
    }

    public function saveFeedbackForIncorrectSuggestion()
    {
        FeedbackSuggestion::create([
            'user_id' => Auth::id(),
            'incorrect_suggestion' => $this->spellWord,
            'reason' => $this->reason,
            'recommendation' => $this->recommendation,
            'tool' => $this->tool_name
        ]);
        $this->emit($this->emit_this_after_saving_feedback, $this->additionalOptionalParameters);
        $this->closeModal();
    }
}
