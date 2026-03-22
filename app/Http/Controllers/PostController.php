<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with(['author', 'categories'])->latest()->get();

        return Inertia::render('Posts/Index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Posts/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:posts,slug',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'category_ids' => 'required|array',
            'is_published' => 'boolean',
        ]);

        
        $slug = $request->slug ? Str::slug($request->slug) : Str::slug($request->title);

        $post = Post::create([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->content,
            'excerpt' => $request->excerpt,
            'user_id' => \Illuminate\Support\Facades\Auth::id(), 
            'is_published' => $request->is_published ?? false,
            'meta_description' => $request->meta_description,
            'keywords' => $request->keywords,
            'robots' => $request->robots ?? 'index, follow',
        ]);

        
        $post->categories()->sync($request->category_ids);

        return redirect()->route('posts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $post->load('categories');
        $categories = Category::all();
        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:posts,slug,' . $post->id,
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'category_ids' => 'required|array',
            'is_published' => 'boolean',
        ]);

        $slug = $request->slug ? Str::slug($request->slug) : Str::slug($request->title);

        $post->update([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->content,
            'excerpt' => $request->excerpt,
            'is_published' => $request->is_published ?? false,
            'meta_description' => $request->meta_description,
            'keywords' => $request->keywords,
            'robots' => $request->robots ?? 'index, follow',
        ]);

        $post->categories()->sync($request->category_ids);

        return redirect()->route('posts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->back();
    }
}
