<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Interfaces\PostInterface;

class BlogController extends Controller
{
    protected $postRepository;

    public function __construct(PostInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function index()
    {
        return Inertia::render('Blog/Index', [
            'posts' => $this->postRepository->getPublishedPosts()
        ]);
    }

    public function show($slug)
    {
        return Inertia::render('Blog/Show', [
            'post' => $this->postRepository->getPublishedPostBySlug($slug)
        ]);
    }
}
