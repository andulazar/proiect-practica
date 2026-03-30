<?php

namespace App\Interfaces;

use App\Models\Post;

interface PostInterface
{
    
    public function getAllPosts();

    public function createPost(array $data);

    public function updatePost(Post $post, array $data);

    public function deletePost(Post $post);

    public function getPublishedPosts();
    
    public function getPublishedPostBySlug(string $slug);

}