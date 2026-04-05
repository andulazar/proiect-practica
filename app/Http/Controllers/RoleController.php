<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\UpdateRoleRequest;  
use App\Services\RoleService;             
use Illuminate\Support\Facades\Gate;

class RoleController extends Controller
{
    protected $roleService;

    public function __construct(RoleService $roleService) 
    {
        $this->roleService = $roleService;
    }



    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //new \App\Interfaces\RoleInterface();
        //dd( new \App\Interfaces\RoleInterface());


        $roles = $this->roleService->getAllRoles();    
            
        return Inertia::render('Roles/Index', [
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::all();
        
        return Inertia::render('Roles/Create', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        $this->roleService->createRole($request->validated());

        return redirect()->route('roles.index')
                         ->with('success', 'Role created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        $permissions = Permission::all();
        
        $role->load('permissions');

        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $this->roleService->updateRole($role, $request->validated());

        return redirect()->route('roles.index')
                        ->with('success', 'Role updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        if ($role->name === 'Admin') {
            return redirect()->back()
                             ->with('error', 'Error: Admin cannot be deleted!');
        }
        Gate::authorize('delete', $role);
        $this->roleService->deleteRole($role);
        return redirect()->back()
                        ->with('success', 'Role deleted!');
    }
}
