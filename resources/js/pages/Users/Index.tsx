
import { Head, router, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination'; 
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';


interface CustomPageProps {
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown; 
}
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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface IndexProps {
    users: {
        data: User[];
        links: PaginationLink[]; 
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Index({ users }: IndexProps) {
    const { flash } = usePage<CustomPageProps>().props;
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (flash && (flash.success || flash.error)) {
            const showTimer = setTimeout(() => setShowPopup(true), 0);
            const hideTimer = setTimeout(() => setShowPopup(false), 3000);
            
            return () => {
                clearTimeout(showTimer);
                clearTimeout(hideTimer);
            };
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="Manage Users" />

            {showPopup && flash?.success && (
                <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transition-all">
                    {flash.success}
                </div>
            )}
            {showPopup && flash?.error && (
                <div className="fixed top-5 right-5 z-50 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg transition-all">
                    {flash.error}
                </div>
            )}

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
            
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Manage Users
                </h1>

                <Link 
                    href="/users/create" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm transition-colors"
                >
                    + Add Users
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">ID</th>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Name</th>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Email</th>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Current Role</th>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user: User) => (
                            <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-600 dark:hover:bg-gray-750">
                                <td className="p-4 text-gray-800 dark:text-gray-300">{user.id}</td>
                                <td className="p-4 text-gray-800 dark:text-gray-300 font-medium">{user.name}</td>
                                <td className="p-4 text-gray-500 dark:text-gray-400">{user.email}</td>
                                <td className="p-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {user.roles && user.roles.length > 0 
                                            ? user.roles.map((r: Role) => r.name).join(', ') 
                                            : 'Simple User'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <Link 
                                            href={`/users/${user.id}/edit`}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition-colors text-center"
                                        >
                                            Edit
                                        </Link>

                                        <button 
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this user?')) {
                                                    router.delete(`/users/${user.id}`);
                                                }
                                            }}
                                            className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={users.links} />
        </div>
    </AppLayout>
    );
}