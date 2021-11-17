<?php

namespace App\Http\Livewire;

use App\Models\ToolNavigation;
use App\Models\Tools;
use Livewire\Component;
use LivewireUI\Modal\ModalComponent;

class AboutTool extends ModalComponent
{
    public $toolName;
    public $navType = 'about';
    public $output;

    public function mount($toolName, $navType)
    {
        $this->toolName = $toolName;
        $this->navType = $navType;
    }

    public function render()
    {
        $tool = Tools::where('route_name', '=', 'dashboard.' . $this->toolName)->first();
        $toolNavigationData = ToolNavigation::where('nav_name', '=', $this->navType)
            ->where('tool_id', '=', $tool->id)
            ->first();

        $this->output = json_decode($toolNavigationData->content);
        $this->output = str_replace('<ol>', '<ol class="list-decimal list-inside space-y-2">', $this->output);
        $this->output = str_replace('<ul>', '<ul class="list-disc list-inside space-y-2">', $this->output);
        $this->output = str_replace('<strong>', '<strong class="text-lg font-bold text-gray-700">', $this->output);

        return view('livewire.about-tool');
    }

    /**
     * Supported: 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'
     */
    public static function modalMaxWidth(): string
    {
        return '4xl';
    }
}
