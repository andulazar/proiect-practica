<?php

namespace App\Services;

use App\Interfaces\UserInterface;        
use App\Models\User;


class UserService {
    protected $userInterface;

    public function __construct(UserInterface $userInterface) 
    {
        $this->userInterface = $userInterface;
    }
    public function getAllUsers()
    {
        return User::with('roles')->paginate(10);
    }

    public function createUser(array $validatedData)
    {
        $validatedData['password'] = bcrypt($validatedData['password']);

        $user = $this->userInterface->createUser($validatedData);

        if (isset($validatedData['role'])) {
            $user->assignRole($validatedData['role']);
        }

        return $user;
    }

    public function updateUser(User $user, array $validatedData) 
    {
        if (!empty($validatedData['password'])) {
            $validatedData['password'] = bcrypt($validatedData['password']);
        } else {
            unset($validatedData['password']);
        }

        $this->userInterface->updateUser($user, $validatedData);

        if (isset($validatedData['role'])) {
            $user->syncRoles([$validatedData['role']]);
        }

        return $user;
    }

    public function deleteUser(User $user) 
    {
        return $this->userInterface->deleteUser($user);
    }

}