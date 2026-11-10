<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        
        $permissions = [
            
            'view categories',
            'create categories',
            'edit categories',
            'delete categories',

            'view posts',
            'create posts',
            'edit posts',
            'delete posts',
            'publish posts', 

            
            'manage users',
            'manage roles',
        ];

        
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->givePermissionTo(Permission::all());

        
        $editorRole = Role::firstOrCreate(['name' => 'Editor']);
        $editorRole->givePermissionTo([
            'view categories',
            'view posts',
            'create posts',
            'edit posts'
        ]);
        
        
        Role::firstOrCreate(['name' => 'User']);
    }
}
