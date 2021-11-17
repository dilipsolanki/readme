<?php

namespace App\Http\Livewire\Backend;

use App\Models\Role;
use App\Models\User;
use Livewire\Component;
use Livewire\WithPagination;

class UserManagementComponent extends Component
{

    use WithPagination;

    public $paginate = 1;
    public $selectedUser = [];
    public $selectedRole = [];
    public $searchByRole = -1;
    public $searchString = '';

    // public function mount()
    // {
    //     $this->users = User::paginate($this->paginate);
    // }

    public function render()
    {
        // dd($this->users);
        return view('livewire.backend.user-management-component', [
            'users' => User::search(trim($this->searchString))
                ->with('roles')
                ->when($this->searchByRole != -1, function ($query) {
                    $query->role($this->searchByRole);
                })->paginate(10),
            'roles' => Role::all()->pluck('name', 'id')->toArray()
        ]);
    }

    public function assignRoleToUsers()
    {
        foreach ($this->selectedUser as $user) {
            $currentUser = User::find($user);
            $currentUser->getRoleNames()->each(function ($role) use ($currentUser) {
                $currentUser->removeRole($role);
            });
            $currentUser->assignRole($this->selectedRole);
        }
        $this->dispatchBrowserEvent('user-roles-assigned');
    }
}
