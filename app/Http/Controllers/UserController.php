<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all users along with their assigned roles from the database
        $users = User::with('roles')->get();

        // Fetch all available roles to populate dropdown menus later
        $roles = Role::all();

        // Render the React component (Users/Index) and pass the data to it
        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Future logic to show a form for creating a new user
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Future logic to save a new user to the database
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Future logic to display a single user's details
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Future logic to show a form for editing an existing user
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Future logic to update an existing user's details and roles
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Future logic to delete a user from the database
    }
}