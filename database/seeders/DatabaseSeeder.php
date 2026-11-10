<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesAndPermissionsSeeder::class);

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
        ]);
        $admin->assignRole('Admin');

        $editor = User::factory()->create([
            'name' => 'Editor',
            'email' => 'editor@example.com',
        ]);
        $editor->assignRole('Editor');

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $user->assignRole('User');

        $categories = Category::factory(5)->create();

        Post::factory(30)->create()->each(function (Post $post) use ($categories) {
            $post->categories()->attach($categories->random(rand(1, 2))->pluck('id'));
        });
    }
}
