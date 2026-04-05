<?php

namespace App\Services;

use App\Interfaces\PostInterface;        
use Illuminate\Support\Str;              
use Illuminate\Support\Facades\Auth;
use App\Models\Post;


class PostService {

    protected $postInterface;

    public function __construct(PostInterface $postInterface) 
    {
        $this->postInterface = $postInterface;
    }

    public function getAllPosts()
    {
        return $this->postInterface->getAllPosts();
    }

    public function createPost(array $validatedData) {
        $slug = $validatedData['slug'] 
            ? Str::slug($validatedData['slug']) 
            : Str::slug($validatedData['title']);

        $validatedData['slug'] = $slug;
        $validatedData['user_id'] = Auth::id();

        return $this->postInterface->createPost($validatedData);
    }

    public function updatePost(Post $post, array $validatedData) 
    {
        $slug = !empty($validatedData['slug']) 
                ? Str::slug($validatedData['slug']) 
                : Str::slug($validatedData['title']);

        $validatedData['slug'] = $slug;

        return $this->postInterface->updatePost($post, $validatedData);
    }

    public function deletePost(Post $post) 
    {
        return $this->postInterface->deletePost($post);
    }
}