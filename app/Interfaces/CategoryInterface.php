<?php

namespace App\Interfaces;

use App\Models\Category;

interface CategoryInterface
{
    public function getAllCategories();

    public function createCategory(array $data);

    public function updateCategory(Category $category, array $data);
    
    public function deleteCategory(Category $category);
}