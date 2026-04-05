<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use App\Http\Requests\StoreCategoryRequest;   
use App\Http\Requests\UpdateCategoryRequest;  
use App\Services\CategoryService;             
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        $categories = $this->categoryService->getAllCategories(); 
               
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
    public function store(StoreCategoryRequest $request)
    {
        
        $this->categoryService->createCategory($request->validated());

        return redirect()->route('categories.index')
                         ->with('success', 'Category created!');
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
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->categoryService->updateCategory($category, $request->validated());

        return redirect()->route('categories.index')
                          ->with('success', 'Category updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        Gate::authorize('delete', $category);
        $this->categoryService->deleteCategory($category);
        return redirect()->back()
                            ->with('success', 'Category deleted!');
    }
}
