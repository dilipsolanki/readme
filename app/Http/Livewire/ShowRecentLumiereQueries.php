<?php

namespace App\Http\Livewire;

use App\Models\LumiereQuery;
use Livewire\Component;
use Livewire\WithPagination;

class ShowRecentLumiereQueries extends Component
{
    use WithPagination;

    // protected $listeners = ['refreshRecentQueries' => '$refresh'];
    public function render()
    {
        $queries = LumiereQuery::whereUserId(user()->id)->orderByDesc('created_at')->simplePaginate(5);
        // dd($queries);->pluckToArray('query')
        return view('livewire.show-recent-lumiere-queries', ['queries' => $queries]);
    }
}
