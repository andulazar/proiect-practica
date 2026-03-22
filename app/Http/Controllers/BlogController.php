<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $posts = Post::with(['author', 'categories'])
                     ->where('is_published', true)
                     ->latest()
                     ->get();

        return Inertia::render('Blog/Index', [
            'posts' => $posts
        ]);
    }

    public function show($slug)
    {
        $post = Post::with(['author', 'categories'])
                    ->where('slug', $slug)
                    ->where('is_published', true)
                    ->firstOrFail(); 

        return Inertia::render('Blog/Show', [
            'post' => $post
        ]);
    }
}
