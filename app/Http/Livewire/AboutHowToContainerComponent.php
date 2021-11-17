<?php

namespace App\Http\Livewire;

use Illuminate\Support\Facades\Request;
use Livewire\Component;

class AboutHowToContainerComponent extends Component
{
    public $containerClass;
    public function render()
    {
        $this->containerClass = 'container mx-auto';
        $arrayOfWideScreenTools = [
            'hubble',
            'document-structuring',
            'image-checker',
            'pdf-extraction',
            'scholarcy'
        ];

        if (in_array(Request::segment(1), $arrayOfWideScreenTools)) {
            $this->containerClass = 'mx-3';
        }
        if (Request::segment(1) == 'dashboard') {
            return <<<'blade'
            
            blade;
        } else {
            return <<<'blade'
            <div class="{{ $containerClass }} mt-4 flex justify-between items-center">
                <x-breadcrumbs framework="tailwind" />
                <div class="mt-6 flex flex-row-reverse w-2/3 px-0 md:px-5 text-sm">
                    <div class="bg-gray-50 border border-blue-400 divide-x divide-light-blue-500 justify-center rounded p-1">
                        <x-about-how-to-component toolName="{{ Request::segment(1) }}" navType="about"></x-about-how-to-component>
                        <x-about-how-to-component toolName="{{ Request::segment(1) }}" navType="how_to"></x-about-how-to-component>
                    </div>
                </div>
            </div>
            blade;
        }
    }
}
