<?php

namespace App\View\Components;

use Illuminate\View\Component;

class AboutHowToComponent extends Component
{
    public $toolName;
    public $navType;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($toolName, $navType)
    {
        $this->toolName = $toolName;
        $this->navType = $navType;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.about-how-to-component');
    }
}
