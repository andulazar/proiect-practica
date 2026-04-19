<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Post;


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
    
    Route::get('/posts', function (Request $request) {
        return response()->json([
            'status' => 'success',
            'message' => '50 articles!',
            'data' => Post::with(['author', 'categories'])->latest()->paginate(50)
        ]);
    });

    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'You logged out succesfully. Token was destroyed!']);
    });

}); 