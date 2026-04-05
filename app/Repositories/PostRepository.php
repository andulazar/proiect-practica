<?php

namespace App\Repositories;

use App\Interfaces\PostInterface;
use App\Models\Post;

class PostRepository implements PostInterface
{
    public function getAllPosts()
    {
        return Post::with(['author', 'categories'])->latest()->paginate(10);
    }

    public function createPost(array $data) 
    {
        $post = Post::create($data); 
        $post->categories()->sync($data['category_ids']); 
        
        return $post;
    }
    

    public function updatePost(Post $post, array $data) 
    {
        $post->update($data); 
        
        if (isset($data['category_ids'])) {
            $post->categories()->sync($data['category_ids']); 
        }
        
        return $post;
    }

    public function deletePost(Post $post) 
    {
        $post->delete(); 
        return true;
    }
    public function getPublishedPosts()
    {
        return Post::with(['author', 'categories'])
                     ->where('is_published', true)
                     ->latest()
                     ->get();
    }

    public function getPublishedPostBySlug(string $slug)
    {
        return Post::with(['author', 'categories'])
                     ->where('slug', $slug)
                     ->where('is_published', true)
                     ->firstOrFail(); 
    }
}