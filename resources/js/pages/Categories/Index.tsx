import { Head, router, Link } from '@inertiajs/react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';


interface Category {
    id: number;
    title: string;
    slug: string;
    description?: string;
    is_active: boolean;
    template?: string;
}


interface IndexProps {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manage Categories', href: '/categories' },
];

export default function Index({ categories }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Categories" />
            
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
                <div className="max-w-7xl mx-auto">
                    
                    
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Articles Categories 
                        </h1>

                        <Link 
                            href="/categories/create" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm transition-colors"
                        >
                            + Add Category
                        </Link>
                    </div>

                    
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">ID</th>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Title</th>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Slug (Link)</th>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Status</th>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {categories.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                                            No categories at the moment.Press the button above to add one.
                                        </td>
                                    </tr>
                                )}

                                
                                {categories.map((category) => (
                                    <tr key={category.id} className="border-b dark:border-gray-700 hover:bg-gray-600 dark:hover:bg-gray-750">
                                        <td className="p-4 text-gray-800 dark:text-gray-300">{category.id}</td>
                                        <td className="p-4 text-gray-800 dark:text-gray-300 font-medium">{category.title}</td>
                                        <td className="p-4 text-gray-500 dark:text-gray-400">/{category.slug}</td>
                                        <td className="p-4">
                                            
                                            {category.is_active ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <Link 
                                                    href={`/categories/${category.id}/edit`}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition-colors text-center"
                                                >
                                                    Edit
                                                </Link>

                                                <button 
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure?')) {
                                                            router.delete(`/categories/${category.id}`);
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
                </div>
            </div>
        </AppLayout>
    );
}