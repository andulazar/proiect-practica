<?php
namespace App\Services;

use App\Interfaces\RoleInterface;
use Spatie\Permission\Models\Role;

class RoleService 
{
    protected $roleInterface;

    public function __construct(RoleInterface $roleInterface) 
    {
        //dd($roleInterface);
        $this->roleInterface = $roleInterface;
        
    }
    public function getAllRoles()
    {
        return $this->roleInterface->getAllRoles();
    }

    public function createRole(array $validatedData)
    {
        $role = $this->roleInterface->createRole($validatedData);

        if (isset($validatedData['permissions'])) {
            $role->syncPermissions($validatedData['permissions']);
        }

        return $role;
    }

    public function updateRole(Role $role, array $validatedData) 
    {
        $this->roleInterface->updateRole($role, $validatedData);

        $permissions = $validatedData['permissions'] ?? [];
        $role->syncPermissions($permissions);

        return $role;
    }

    public function deleteRole(Role $role) 
    {
        if ($role->name === 'Admin') {
            return false; 
        }

        return $this->roleInterface->deleteRole($role);
    }
}
