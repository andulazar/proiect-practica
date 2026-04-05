<?php

namespace App\Repositories;

use App\Interfaces\RoleInterface;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleInterface
{
    public function getAllRoles(){
            return  Role::with('permissions')->paginate(10);
    }

    public function createRole(array $data){
            return Role::create(['name'=>$data['name']]);
    }

    public function updateRole(Role $role, array $data){
        $role->update(['name'=>$data['name']]);
        return $role;
    }

    public function deleteRole(Role $role){
        $role->delete();
        return true;
    }
}