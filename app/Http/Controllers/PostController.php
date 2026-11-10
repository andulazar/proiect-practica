<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use App\Models\Category;
use Inertia\Inertia;
use App\Services\PostService;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('can:create posts', only: ['create', 'store']),
            new Middleware('can:edit posts', only: ['edit', 'update']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    protected $postService;
    
    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function index()
    {
        $posts = $this->postService->getAllPosts();

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
    public function store(StorePostRequest $request)
    {

        $this->postService->createPost($request->validated());

        return redirect()->route('posts.index')
                            ->with('success', 'Post created!');
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
    public function update(UpdatePostRequest $request, Post $post)
    {

        $this->postService->updatePost($post,$request->validated());

        return redirect()->route('posts.index')
                            ->with('success', 'Post updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {   
        Gate::authorize('delete', $post);
        $this->postService->deletePost($post);
        return redirect()->back()
                            ->with('success', 'Post deleted!');
    }
}
