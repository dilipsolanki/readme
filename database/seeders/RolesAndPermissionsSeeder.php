<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();

        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        // Create Roles
        $admin = Role::firstOrCreate(['name' => 'administrator']);
        $member = Role::firstOrCreate(['name' => 'member']);

        // Create Permissions
        Permission::firstOrCreate(['name' => 'view users']);
        Permission::firstOrCreate(['name' => 'delete users']);
        Permission::firstOrCreate(['name' => 'access image check']);
        Permission::firstOrCreate(['name' => 'access spell check']);
        Permission::firstOrCreate(['name' => 'access hubble']);
        Permission::firstOrCreate(['name' => 'access document structuring']);
        Permission::firstOrCreate(['name' => 'access subject area detection']);
        Permission::firstOrCreate(['name' => 'access error marking']);
        Permission::firstOrCreate(['name' => 'access hubble validation']);
        Permission::firstOrCreate(['name' => 'access IDAN extraction']);

        // administrator will have all permisssions
        $admin->givePermissionTo(Permission::all());

        $member->givePermissionTo('access image check', 'access subject area detection');

        Schema::enableForeignKeyConstraints();
    }
}
