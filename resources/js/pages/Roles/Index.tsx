import { Head, router, Link } from '@inertiajs/react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface IndexProps {
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manage Roles', href: '/roles' },
];

export default function Index({ roles }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Roles" />
            
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
                <div className="max-w-7xl mx-auto">
                    
                    
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Roles & Permissions
                        </h1>

                        <Link 
                            href="/roles/create" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm transition-colors"
                        >
                            + Add New Role
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200 w-16">ID</th>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200 w-48">Role Name</th>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Assigned Permissions</th>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200 w-48">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role) => (
                                    <tr key={role.id} className="border-b dark:border-gray-700 hover:bg-gray-600 dark:hover:bg-gray-750">
                                        <td className="p-4 text-gray-800 dark:text-gray-300">{role.id}</td>
                                        
                                        <td className="p-4">
                                            <span className="font-bold text-gray-800 dark:text-white text-lg">
                                                {role.name}
                                            </span>
                                        </td>
                                        
                                        <td className="p-4">
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {role.permissions.length === 0 ? (
                                                    <span className="text-gray-400 italic text-sm">No permissions assigned</span>
                                                ) : (
                                                    role.permissions.map((permission) => (
                                                        <span 
                                                            key={permission.id} 
                                                            className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold rounded-md border border-blue-200 dark:border-blue-800"
                                                        >
                                                            {permission.name}
                                                        </span>
                                                    ))
                                                )}
                                            </div>
                                        </td>
                                        
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <Link 
                                                    href={`/roles/${role.id}/edit`}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition-colors text-center"
                                                >
                                                    Edit
                                                </Link>

                                                
                                                {role.name !== 'Admin' && (
                                                    <button 
                                                        onClick={() => {
                                                            if (window.confirm(`Are you sure you want to delete the ${role.name} role?`)) {
                                                                router.delete(`/roles/${role.id}`);
                                                            }
                                                        }}
                                                        className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}