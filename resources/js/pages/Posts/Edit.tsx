import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import 'react-quill-new/dist/quill.snow.css';

interface Category {
    id: number;
    title: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    is_published: boolean;
    meta_description: string | null;
    keywords: string | null;
    robots: string;
    cover_image: string | null; 
    categories: Category[]; 
}

interface EditProps {
    post: Post;
    categories: Category[]; 
}

export default function Edit({ post, categories }: EditProps) {
    
    const initialCategoryIds = post.categories.map(cat => cat.id);

    const { data, setData, post: submitPost, errors, processing } = useForm({
        _method: 'put', 
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || '',
        category_ids: initialCategoryIds,
        is_published: post.is_published,
        meta_description: post.meta_description || '',
        keywords: post.keywords || '',
        robots: post.robots || 'index, follow',
        cover_image: null as File | null, 
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        post.cover_image ? `/storage/${post.cover_image}` : null
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('cover_image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const categoryId = parseInt(e.target.value);
        const isChecked = e.target.checked;

        if (isChecked) {
            setData('category_ids', [...data.category_ids, categoryId]);
        } else {
            setData('category_ids', data.category_ids.filter(id => id !== categoryId));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitPost(`/posts/${post.id}`); 
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manage Posts', href: '/posts' },
        { title: `Edit: ${post.title}`, href: `/posts/${post.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Post: ${post.title}`} />
            
            <div className="min-h-screen bg-slate-900 p-8">
                <div className="max-w-5xl mx-auto bg-slate-800 p-8 rounded-lg shadow-sm border border-slate-700">
                    <h1 className="text-3xl font-bold mb-8 text-white border-b border-slate-700 pb-4">
                        Edit Article: <span className="text-blue-500">{post.title}</span>
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-slate-300 font-bold mb-2">Title *</label>
                                <input 
                                    type="text" 
                                    value={data.title} 
                                    onChange={e => setData('title', e.target.value)} 
                                    className="w-full bg-slate-900 text-white rounded-md p-3 border border-slate-600 focus:border-blue-500 focus:ring-blue-500" 
                                    required 
                                />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </div>
                            <div>
                                <label className="block text-slate-300 font-bold mb-2">Slug (Link)</label>
                                <input 
                                    type="text" 
                                    value={data.slug} 
                                    onChange={e => setData('slug', e.target.value)} 
                                    className="w-full bg-slate-900 text-white rounded-md p-3 border border-slate-600 focus:border-blue-500 focus:ring-blue-500" 
                                />
                                {errors.slug && <div className="text-red-500 text-sm mt-1">{errors.slug}</div>}
                            </div>
                        </div>

                        <div className="mt-6 mb-6">
                            <label className="block text-slate-300 font-bold mb-2">Cover Image (Upload a new one to replace)</label>
                            <div className="flex items-center justify-center w-full">
                                <label 
                                    htmlFor="dropzone-file" 
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-800 transition-colors relative overflow-hidden"
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-70 hover:opacity-50 transition-opacity" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-10 h-10 mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                            </svg>
                                            <p className="mb-2 text-sm text-slate-400"><span className="font-bold text-blue-500">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-slate-500">PNG, JPG, WEBP or GIF (MAX. 2MB)</p>
                                        </div>
                                    )}
                                    <input 
                                        id="dropzone-file" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                    />
                                </label>
                            </div>
                            {errors.cover_image && <div className="text-red-500 text-sm mt-2">{errors.cover_image}</div>}
                        </div>

                        <div>
                            <label className="block text-slate-300 font-bold mb-2">Article Content *</label>
                            
                            <div className="quill-dark text-white rounded-md overflow-hidden mb-2 border border-slate-700">
                                <ReactQuill 
                                    theme="snow" 
                                    value={data.content} 
                                    onChange={(value) => setData('content', value)} 
                                    placeholder="Write your amazing article here..."
                                    className="h-64 pb-12" 
                                />
                            </div>
                            
                            {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                        </div>

                        <div>
                            <label className="block text-slate-300 font-bold mb-2">Short Summary</label>
                            <textarea 
                                value={data.excerpt} 
                                onChange={e => setData('excerpt', e.target.value)} 
                                rows={3}
                                className="w-full bg-slate-900 text-white rounded-md p-3 border border-slate-600 focus:border-blue-500 focus:ring-blue-500" 
                            ></textarea>
                            {errors.excerpt && <div className="text-red-500 text-sm mt-1">{errors.excerpt}</div>}
                        </div>

                        <div className="p-5 border border-slate-700 rounded-md bg-slate-900/50">
                            <h2 className="text-xl font-bold text-white mb-4">Select Categories *</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {categories.length === 0 ? (
                                    <span className="text-slate-500 italic">No categories available.</span>
                                ) : (
                                    categories.map((category) => (
                                        <div key={category.id} className="flex items-start bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 transition-colors">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id={`category-${category.id}`}
                                                    type="checkbox"
                                                    value={category.id}
                                                    checked={data.category_ids.includes(category.id)}
                                                    onChange={handleCategoryChange}
                                                    className="w-5 h-5 text-blue-600 bg-slate-900 border-slate-600 rounded focus:ring-blue-500 focus:ring-offset-slate-800"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor={`category-${category.id}`} className="font-medium text-slate-300 cursor-pointer select-none">
                                                    {category.title}
                                                </label>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            {errors.category_ids && <div className="text-red-500 text-sm mt-2">{errors.category_ids}</div>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 border border-slate-700 rounded-md bg-slate-900/50">
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-white mb-2">SEO Settings</h2>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-1">Meta Description</label>
                                    <input 
                                        type="text" 
                                        value={data.meta_description} 
                                        onChange={e => setData('meta_description', e.target.value)} 
                                        className="w-full bg-slate-800 text-white rounded-md p-2 border border-slate-600 focus:border-blue-500" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-1">Keywords</label>
                                    <input 
                                        type="text" 
                                        value={data.keywords} 
                                        onChange={e => setData('keywords', e.target.value)} 
                                        className="w-full bg-slate-800 text-white rounded-md p-2 border border-slate-600 focus:border-blue-500" 
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-col justify-center items-start space-y-4 mt-6 md:mt-0 md:pl-8 md:border-l border-slate-700">
                                <h2 className="text-xl font-bold text-white mb-2">Publishing</h2>
                                <label className="flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={data.is_published}
                                        onChange={e => setData('is_published', e.target.checked)}
                                        className="w-6 h-6 text-green-500 bg-slate-900 border-slate-600 rounded focus:ring-green-500"
                                    />
                                    <span className="ml-3 text-lg font-bold text-slate-300">
                                        Publish this article
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-6 border-t border-slate-700">
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors text-lg"
                            >
                                Update Article
                            </button>
                            <Link 
                                href="/posts" 
                                className="text-slate-400 hover:text-slate-200 font-medium transition-colors"
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