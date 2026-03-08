import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

// Îi explicăm lui TypeScript cum arată un User
interface User {
    id: number;
    name: string;
    email: string;
}

interface EditProps {
    user: User;
}

export default function Edit({ user }: EditProps) {
    const { data, setData, put, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        password: '', 
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`); 
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
            <Head title="Edit User" />
            
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

                    <div className="flex items-center gap-4 mt-6">
                        <button type="submit" disabled={processing} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md">
                            Update User
                        </button>
                        <Link href="/users" className="text-gray-500 hover:text-gray-700 dark:text-gray-400">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}