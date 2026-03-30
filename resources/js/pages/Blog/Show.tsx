import { Head, Link } from '@inertiajs/react';
import React from 'react';

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
    content: string;
    author: User;
    categories: Category[];
    created_at: string;
}

interface ShowProps {
    post: Post;
}

export default function Show({ post }: ShowProps) {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
            <Head title={`${post.title} | MyBlog`} />

            <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-3xl mx-auto px-6 py-4">
                    <Link href="/" className="text-sm font-bold text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 w-fit">
                        <span className="text-blue-500 text-lg">←</span> Back to Articles
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                <article>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.categories.map((cat) => (
                            <span key={cat.id} className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                {cat.title}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 py-6 border-y border-slate-800 mb-10">
                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold text-white border border-slate-600 shadow-inner">
                            {post.author.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="text-slate-200 font-medium text-lg">{post.author.name}</div>
                            <div className="text-slate-500 text-sm">
                                Published on {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                        </div>
                    </div>

                    <div className="text-lg leading-relaxed text-slate-300 whitespace-pre-wrap">
                        {post.content}
                    </div>
                </article>
            </main>

            <footer className="border-t border-slate-800 mt-20 py-8 text-center text-slate-500">
                <p>© {new Date().getFullYear()} MyBlog.</p>
            </footer>
        </div>
    );
}