import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Permission {
    id: number;
    name: string;
}

interface CreateProps {
    permissions: Permission[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manage Roles', href: '/roles' },
    { title: 'Add Role', href: '/roles/create' },
];

export default function Create({ permissions }: CreateProps) {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        permissions: [] as string[],
    });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const permissionName = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setData('permissions', [...data.permissions, permissionName]);
        } else {
            setData('permissions', data.permissions.filter(name => name !== permissionName));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/roles'); 
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Role" />
            
            {/* Fundalul general (la fel ca la tabel) */}
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
                
                {/* Panoul principal (la fel ca fundalul tabelului) */}
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Create a New Role
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* --- NUMELE ROLULUI --- */}
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-lg">
                                Role Name *
                            </label>
                            <input 
                                type="text" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)} 
                                placeholder="e.g., Moderator, SEO Expert"
                                className="w-full md:w-1/2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-3 border" 
                                required 
                            />
                            {errors.name && <div className="text-red-500 text-sm mt-1 font-semibold">{errors.name}</div>}
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-550 dark:bg-gray-800/50">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                                Assign Permissions
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                                Tick the boxes.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {permissions.map((permission) => (
                                    <div key={permission.id} className="flex items-start bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <div className="flex items-center h-5">
                                            <input
                                                id={`permission-${permission.id}`}
                                                type="checkbox"
                                                value={permission.name}
                                                checked={data.permissions.includes(permission.name)}
                                                onChange={handleCheckboxChange}
                                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor={`permission-${permission.id}`} className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                                                {permission.name.charAt(0).toUpperCase() + permission.name.slice(1)}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.permissions && <div className="text-red-500 text-sm mt-2">{errors.permissions}</div>}
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors text-lg"
                            >
                                Save Role
                            </button>
                            <Link 
                                href="/roles" 
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 font-medium transition-colors"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}