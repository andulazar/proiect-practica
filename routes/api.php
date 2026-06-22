<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
//use App\Models\Post;



Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Email or password are incorrect!'], 401);
    }

    $token = $user->createToken($request->device_name)->plainTextToken;

    return response()->json([
        'message' => 'Logged in succesfully!',
        'token' => $token
    ]);
});




Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/posts', function (Illuminate\Http\Request $request) {
        $query = App\Models\Post::with(['author', 'categories'])->latest();

        if ($request->filled('category')) {
            $query->whereHas('categories', function($q) use ($request) {
                $q->where('title', $request->category);
            });
        }

        $perPage = $request->input('per_page', 6);

        return response()->json([
            'status' => 'success',
            'data' => $query->paginate($perPage)
        ]);
    });

    Route::get('/categories', function () {
        return response()->json([
            'status' => 'success',
            'data' => \App\Models\Category::all()
        ]);
    });

    Route::get('/posts/{slug}', function ($slug) {
        $post = App\Models\Post::with(['author', 'categories'])->where('slug', $slug)->firstOrFail();
        return response()->json(['status' => 'success', 'data' => $post]);
    });

    Route::post('/logout', function (Illuminate\Http\Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out!']);
    });

});