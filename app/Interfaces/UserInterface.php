<?php

namespace App\Interfaces;

use App\Models\User;

interface UserInterface
{
    public function getAllUsers();

    public function createUser(array $data);

    public function updateUser(User $user, array $data);
    
    public function deleteUser(User $user);
}