<?php

namespace App\Http\Livewire\Frontend;

use App\Models\Tools;
use Livewire\Component;

class ToolsApiChecker extends Component
{

    public $tool;
    public $isItDown = true;
    public $counter = 0;
    public $pollTime = 1500;

    public function mount(Tools $tool)
    {
        $this->tool = $tool;
    }

    public function render()
    {
        if ($this->counter >= 2 && $this->counter <= 10) {
            $this->pollTime = 5000;
            $this->isItDown = false;
            if ($this->tool->primary_api_endpoint) {
                $errorCodes = [400, 404, 502, 503, 504];
                $header_check = get_headers($this->tool->primary_api_endpoint);
                if (in_array(substr($header_check[0], 9, 3), $errorCodes)) {
                    $this->isItDown = true;
                }
            }
        }

        $this->counter++;

        return view('livewire.frontend.tools-api-checker');
    }
}
