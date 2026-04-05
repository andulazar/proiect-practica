import { Head, router, Link, usePage } from '@inertiajs/react'; 
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination'; 
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface CustomPageProps {
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

interface Category {
    id: number;
    title: string;
    slug: string;
    description?: string;
    is_active: boolean;
    template?: string;
}


interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface IndexProps {
    categories: {
        data: Category[];
        links: PaginationLink[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manage Categories', href: '/categories' },
];

export default function Index({ categories }: IndexProps) {

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
            <Head title="Manage Categories" />

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
                                
                                {categories.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                                            No categories at the moment.Press the button above to add one.
                                        </td>
                                    </tr>
                                )}

                                
                                {categories.data.map((category) => (
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
                    <Pagination links={categories.links} />
                </div>
            </div>
        </AppLayout>
    );
}