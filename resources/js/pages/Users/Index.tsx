import React from 'react';
import { Head } from '@inertiajs/react';

export default function Index({ users, roles }: any) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
            <Head title="Gestionare Utilizatori" />
            
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                    Gestionare Utilizatori
                </h1>

                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                                <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">ID</th>
                                <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Nume</th>
                                <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Email</th>
                                <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Rol curent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: any) => (
                                <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                                    <td className="p-4 text-gray-800 dark:text-gray-300">{user.id}</td>
                                    <td className="p-4 text-gray-800 dark:text-gray-300 font-medium">{user.name}</td>
                                    <td className="p-4 text-gray-500 dark:text-gray-400">{user.email}</td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            {user.roles && user.roles.length > 0 
                                                ? user.roles.map((r: any) => r.name).join(', ') 
                                                : 'User Simplu'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}