import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Category {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    template: string | null;
    meta_descriptions: string | null;
    keywords: string | null;
    robots: string | null;
}

interface EditProps {
    category: Category;
}

export default function Edit({ category }: EditProps) {
    
    const { data, setData, put, errors, processing } = useForm({
        title: category.title,
        slug: category.slug,
        description: category.description || '',
        is_active: Boolean(category.is_active),
        template: category.template || 'default',
        meta_descriptions: category.meta_descriptions || '',
        keywords: category.keywords || '',
        robots: category.robots || 'index, follow',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/categories/${category.id}`); 
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manage Categories', href: '/categories' },
        { title: `Edit ${category.title}`, href: `/categories/${category.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${category.title}`} />
            
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Edit category: {category.title}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">Base informations</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Category title *</label>
                                    <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 border" required />
                                    {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Slug</label>
                                    <input type="text" value={data.slug} onChange={e => setData('slug', e.target.value)} placeholder="Ex: cars-sport" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 border" />
                                    {errors.slug && <div className="text-red-500 text-sm mt-1">{errors.slug}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Description</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 border"></textarea>
                                {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                     <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Template</label>
                                        <select 
                                            value={data.template} 
                                            onChange={e => setData('template', e.target.value)}
                                            className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 border"
                                        >
                                            <option value="default">Default</option>
                                            <option value="grid">Grid </option>
                                            <option value="list">List </option>
                                            <option value="full-width">Full Width </option>
                                        </select>
                                </div>

                                <div className="flex items-center mt-6">
                                    <input type="checkbox" id="is_active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="h-5 w-5 text-blue-600 rounded border-gray-300 dark:border-gray-700 dark:bg-gray-900" />
                                    <label htmlFor="is_active" className="ml-2 block text-gray-700 dark:text-gray-300 font-medium">Active category</label>
                                </div>
                            </div>
                        </div>

                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">SEO settings</h2>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Meta Description</label>
                                <input type="text" value={data.meta_descriptions} onChange={e => setData('meta_descriptions', e.target.value)} className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 border" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Keywords</label>
                                    <input type="text" value={data.keywords} onChange={e => setData('keywords', e.target.value)} placeholder="ex: cars, sport, 2026" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 border" />
                                </div>

                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Robots</label>
                                        <select 
                                            value={data.robots} 
                                            onChange={e => setData('robots', e.target.value)}
                                            className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 border"
                                        >
                                            <option value="index, follow">Index, Follow </option>
                                            <option value="noindex, follow">NoIndex, Follow </option>
                                            <option value="index, nofollow">Index, NoFollow </option>
                                            <option value="noindex, nofollow">NoIndex, NoFollow </option>
                                        </select>
                                </div>
                            </div>
                        </div>

                       
                        <div className="flex items-center gap-4 mt-6">
                            <button type="submit" disabled={processing} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-md transition-colors">
                                Update category
                            </button>
                            <Link href="/categories" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 font-medium transition-colors">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}