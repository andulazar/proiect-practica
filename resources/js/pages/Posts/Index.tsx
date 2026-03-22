import { Head, router, Link } from '@inertiajs/react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Category {
    id: number;
    title: string;
}

interface User {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    is_published: boolean;
    author: User;           
    categories: Category[]; 
}

interface IndexProps {
    posts: Post[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manage Posts', href: '/posts' },
];

export default function Index({ posts }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Posts" />
            
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Posts
                        </h1>

                        <Link 
                            href="/posts/create" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm transition-colors"
                        >
                            + Write New Post
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Title</th>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Author</th>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Categories</th>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Status</th>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                                            No articles found. Click the button above to write your first post!
                                        </td>
                                    </tr>
                                )}

                                {posts.map((post) => (
                                    <tr key={post.id} className="border-b dark:border-gray-700 hover:bg-gray-600 dark:hover:bg-gray-750">
                                        
                                        <td className="p-4">
                                            <div className="font-bold text-gray-800 dark:text-white text-lg">
                                                {post.title}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                /{post.slug}
                                            </div>
                                        </td>
                                        
                                        <td className="p-4 text-gray-800 dark:text-gray-300 font-medium">
                                            {post.author ? post.author.name : 'Unknown'}
                                        </td>
                                        
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {post.categories.length === 0 ? (
                                                    <span className="text-xs text-gray-400 italic">Uncategorized</span>
                                                ) : (
                                                    post.categories.map((cat) => (
                                                        <span key={cat.id} className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs font-semibold rounded-md">
                                                            {cat.title}
                                                        </span>
                                                    ))
                                                )}
                                            </div>
                                        </td>
                                        
                                        <td className="p-4">
                                            {post.is_published ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <Link 
                                                    href={`/posts/${post.id}/edit`}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors text-center"
                                                >
                                                    Edit
                                                </Link>

                                                <button 
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this post?')) {
                                                            router.delete(`/posts/${post.id}`);
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