<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'is_active',
        'template',
        'meta_descriptions',
        'keywords',
        'robots',
    ];

    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
}
