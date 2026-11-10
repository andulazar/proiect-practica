<?php

namespace App\Services;

use App\Interfaces\PostInterface;        
use Illuminate\Support\Str;              
use Illuminate\Support\Facades\Auth;
use App\Models\Post;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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
        $slug = !empty($validatedData['slug']) 
            ? Str::slug($validatedData['slug']) 
            : Str::slug($validatedData['title']);

        $validatedData['slug'] = $slug;
        $validatedData['user_id'] = Auth::id();

        if (isset($validatedData['cover_image']) && $validatedData['cover_image'] instanceof UploadedFile) {
            $path = $validatedData['cover_image']->store('posts', 'public');
            
            $validatedData['cover_image'] = $path;
        } else {
            unset($validatedData['cover_image']);
        }

        if (! Auth::user()?->can('publish posts')) {
            $validatedData['is_published'] = false;
        }

        return $this->postInterface->createPost($validatedData);
    }

    public function updatePost(Post $post, array $validatedData) 
    {
        $slug = !empty($validatedData['slug']) 
                ? Str::slug($validatedData['slug']) 
                : Str::slug($validatedData['title']);

        $validatedData['slug'] = $slug;

        if (isset($validatedData['cover_image']) && $validatedData['cover_image'] instanceof UploadedFile) {
            
            if ($post->cover_image) {
                Storage::disk('public')->delete($post->cover_image);
            }
            
            $path = $validatedData['cover_image']->store('posts', 'public');
            $validatedData['cover_image'] = $path;
        } else {
            // No new file uploaded: keep the existing cover image
            unset($validatedData['cover_image']);
        }

        if (! Auth::user()?->can('publish posts')) {
            // Users without the publish permission cannot change the published state
            $validatedData['is_published'] = $post->is_published;
        }

        return $this->postInterface->updatePost($post, $validatedData);
    }

    public function deletePost(Post $post) 
    {
        if ($post->cover_image) {
            Storage::disk('public')->delete($post->cover_image);
        }

        return $this->postInterface->deletePost($post);
    }
}