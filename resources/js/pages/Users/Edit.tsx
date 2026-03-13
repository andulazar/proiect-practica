import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';


interface Role {
    id: number;
    name: string;
}


interface User {
    id: number;
    name: string;
    email: string;
    roles?: Role[]; 
}


interface EditProps {
    user: User;
    roles: Role[];
}

export default function Edit({ user, roles }: EditProps) {
    
    const currentRole = user.roles && user.roles.length > 0 ? user.roles[0].name : 'User';

    const { data, setData, put, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        password: '', 
        role: currentRole, 
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`); 
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
        { title: 'Manage Users', href: '/users' },
        { title: `Edit ${user.name}`, href: `/users/${user.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit" />
            
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                    Edit User: {user.name}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 border" />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email</label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 border" />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Password</label>
                        <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 border" />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </div>

                    
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Role</label>
                        <select 
                            value={data.role} 
                            onChange={e => setData('role', e.target.value)}
                            className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 border"
                        >
                            {roles?.map((role) => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                        {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <button type="submit" disabled={processing} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md">
                            Update User
                        </button>
                        <Link href="/users" className="text-gray-500 hover:text-gray-700 dark:text-gray-400">Cancel</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}