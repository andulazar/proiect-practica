<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:categories', 
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'template' => 'nullable|string|max:255',
            'meta_descriptions' => 'nullable|string|max:255',
            'keywords' => 'nullable|string|max:255',
            'robots' => 'nullable|string|max:255',
        ]);

        
        $slug = $request->slug ? Str::slug($request->slug) : Str::slug($request->title);

        
        Category::create([
            'title' => $request->title,
            'slug' => $slug,
            'description' => $request->description,
            'is_active' => $request->is_active ?? true,
            'template' => $request->template,
            'meta_descriptions' => $request->meta_descriptions,
            'keywords' => $request->keywords,
            'robots' => $request->robots,
        ]);

        
        return redirect()->route('categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:categories,slug,' . $category->id,
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'template' => 'nullable|string|max:255',
            'meta_descriptions' => 'nullable|string|max:255',
            'keywords' => 'nullable|string|max:255',
            'robots' => 'nullable|string|max:255',
        ]);

        $slug = $request->slug ? Str::slug($request->slug) : Str::slug($request->title);

        $category->update([
            'title' => $request->title,
            'slug' => $slug,
            'description' => $request->description,
            'is_active' => $request->is_active ?? true,
            'template' => $request->template,
            'meta_descriptions' => $request->meta_descriptions,
            'keywords' => $request->keywords,
            'robots' => $request->robots,
        ]);

        return redirect()->route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->back();
    }
}
