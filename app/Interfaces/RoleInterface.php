<?php

namespace App\Interfaces;

use Spatie\Permission\Models\Role; 

interface RoleInterface
{
    public function getAllRoles();

    public function createRole(array $data);

    public function updateRole(Role $role, array $data);

    public function deleteRole(Role $role);

}