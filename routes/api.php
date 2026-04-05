<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Post;

Route::middleware('auth:sanctum')->get('/posts', function (Request $request) {
    
    return response()->json([
        'status' => 'success',
        'message' => 'Look 50 articles!',
        'data' => Post::with('author', 'categories')->latest()->take(50)->get()
    ]);

});
