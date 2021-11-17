<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::where('email', '=', 'admin@admin.com')->first();
        if (!$user) {
            $data = [
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('coldcold'),
                'is_local_user' => 1
            ];
            $user = User::create($data);

            $user->assignRole('administrator');

            echo 'User created successfully!';
        } else {
            echo 'User already exists!';
        }
    }
}
