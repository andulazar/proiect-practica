<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\BlogController;
use App\Models\User;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', UserController::class);

    Route::resource('categories', CategoryController::class);

    Route::resource('users', UserController::class)->middleware('can:manage users');

    Route::resource('roles', RoleController::class)->middleware('can:manage roles');

    Route::resource('categories', CategoryController::class)->middleware('can:view categories');

    Route::resource('posts', PostController::class)->middleware('can:view posts');

    

});

    Route::get('/', [BlogController::class, 'index'])->name('home'); 
    Route::get('/article/{slug}', [BlogController::class, 'show'])->name('blog.show');

    Route::get('/generate-token-secret', function () {
    $user = User::first();
    
    $user->tokens()->delete();

    $token = $user->createToken('my-phone')->plainTextToken;

    return "Hey {$user->name}! copy this token: " . $token;
});

require __DIR__.'/settings.php';