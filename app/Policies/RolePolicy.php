<?php

namespace App\Policies;

use App\Models\User;
use Spatie\Permission\Models\Role; 

class RolePolicy
{
    /**
     * Determine whether the user can create roles.
     */
    public function create(User $user): bool
    {
        // Doar un Admin poate crea roluri
        return $user->hasRole('Admin');
    }

    /**
     * Determine whether the user can update the role.
     */
    public function update(User $user, Role $role): bool
    {
        return $user->hasRole('Admin');
    }

    /**
     * Determine whether the user can delete the role.
     */
    public function delete(User $user, Role $role): bool
    {
        return $user->hasRole('Admin') && $role->name !== 'Admin';
    }
}