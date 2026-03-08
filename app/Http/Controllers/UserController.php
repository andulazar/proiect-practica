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
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        //crearea util
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // criptam
        ]);

        // il trimitem inapoi
        return redirect()->route('users.index');
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
        $user = User::findOrFail($id); // Găsim utilizatorul

        return Inertia::render('Users/Edit', [
            'user' => $user // Îl trimitem la formular
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        // 1. Verificăm datele. Atenție la șmecheria de la email!
        // Îi spunem să verifice dacă emailul e unic, DAR să ignore emailul actual al acestui utilizator.
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8', // nullable = poate fi lăsat gol!
        ]);

        // 2. Schimbăm numele și emailul
        $user->name = $request->name;
        $user->email = $request->email;

        // 3. Schimbăm parola DOAR dacă a scris ceva în căsuță
        if ($request->filled('password')) {
            $user->password = bcrypt($request->password);
        }

        // 4. Salvăm totul
        $user->save();

        // 5. Ne întoarcem la tabel
        return redirect()->route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user=User::findOrFail($id);
        $user->delete();
        return redirect()->back();
    }
}