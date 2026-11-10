<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public blog
Route::get('/', [BlogController::class, 'index'])->name('home');
Route::get('/article/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Admin panel
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', UserController::class)->except('show')->middleware('can:manage users');
    Route::resource('roles', RoleController::class)->except('show')->middleware('can:manage roles');
    Route::resource('categories', CategoryController::class)->except('show')->middleware('can:view categories');
    Route::resource('posts', PostController::class)->except('show')->middleware('can:view posts');
});

require __DIR__.'/settings.php';
