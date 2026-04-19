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
    excerpt: string | null;
    cover_image: string | null; 
    author: User;
    categories: Category[];
    created_at: string;
}

interface BlogIndexProps {
    posts: Post[];
}

export default function Index({ posts }: BlogIndexProps) {
    const stripHtml = (html: string) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
            <Head title="Welcome to My Blog" />

            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-white tracking-tight hover:text-blue-400 transition-colors">
                        My<span className="text-blue-500">Blog</span>.
                    </Link>
                    <nav>
                        <Link href="/dashboard" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                            Admin Panel / Login
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Articles</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Explore my latest thoughts, tutorials, and stories from around the web.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-slate-700">
                        <h2 className="text-2xl text-slate-300 font-semibold mb-2">No articles yet.</h2>
                        <p className="text-slate-500">Check back later for awesome content!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article key={post.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col group">
                                
                                <Link href={`/article/${post.slug}`} className="block h-48 bg-slate-700 overflow-hidden relative">
                                    {post.cover_image ? (
                                        <img 
                                            src={`/storage/${post.cover_image}`} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:scale-105 transition-transform duration-500"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-slate-500 font-bold text-2xl opacity-20">{post.title}</span>
                                            </div>
                                        </>
                                    )}
                                </Link>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.categories.map(cat => (
                                            <span key={cat.id} className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                                                {cat.title}
                                            </span>
                                        ))}
                                    </div>

                                    <Link href={`/article/${post.slug}`}>
                                        <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors leading-tight">
                                            {post.title}
                                        </h2>
                                    </Link>

                                    <p className="text-slate-400 mb-6 line-clamp-3 text-sm flex-grow">
                                        {post.excerpt || stripHtml(post.content).substring(0, 120) + '...'}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white border border-slate-500">
                                                {post.author.name.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-slate-300">{post.author.name}</span>
                                        </div>
                                        <time className="text-xs text-slate-500">
                                            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </time>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}