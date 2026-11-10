<?php

namespace App\Services;

use App\Interfaces\CategoryInterface;        
use Illuminate\Support\Str;              
use App\Models\Category;


class CategoryService {

    protected $categoryInterface;

    public function __construct(CategoryInterface $categoryInterface) 
    {
        $this->categoryInterface = $categoryInterface;
    }

    public function getAllCategories()
    {
        return $this->categoryInterface->getAllCategories();
    }

    public function createCategory(array $validatedData)
    {
        $slug = !empty($validatedData['slug']) 
            ? Str::slug($validatedData['slug']) 
            : Str::slug($validatedData['title']);

        $validatedData['slug'] = $slug;

        return $this->categoryInterface->createCategory($validatedData);
    }

    public function updateCategory(Category $category, array $validatedData) 
    {
        $slug = !empty($validatedData['slug']) 
                ? Str::slug($validatedData['slug']) 
                : Str::slug($validatedData['title']);

        $validatedData['slug'] = $slug;

        return $this->categoryInterface->updateCategory($category, $validatedData);
    }

    public function deleteCategory(Category $category) 
    {
        return $this->categoryInterface->deleteCategory($category);
    }
}