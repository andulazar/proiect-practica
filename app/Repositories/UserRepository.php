<?php

namespace App\Repositories;

use App\Interfaces\UserInterface;
use App\Models\User;

class UserRepository implements UserInterface
{
    public function getAllUsers()
    {
        return User::with('roles')->paginate(10); 
    }

    public function createUser(array $data)
    {
        return User::create($data);
    }

    public function updateUser(User $user, array $data)
    {
        $user->update($data);
        return $user;
    }
    
    public function deleteUser(User $user)
    {
        $user->delete();
        return true;
    }
}