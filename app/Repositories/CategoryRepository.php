<?php

namespace App\Repositories;

use App\Interfaces\CategoryInterface;
use App\Models\Category;

class CategoryRepository implements CategoryInterface
{
    public function getAllCategories()
    {
        return Category::all(); 
    }

    public function createCategory(array $data)
    {
        $category=Category::create($data);
        return $category;
    }

    public function updateCategory(Category $category, array $data)
    {
        $category->update($data);
        return $category;
    }
    
    public function deleteCategory(Category $category)
    {
        $category->delete();
        return true;
    }
}