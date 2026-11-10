<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RolesAndPermissionsSeeder::class);
    }

    private function userWithRole(string $role): User
    {
        $user = User::factory()->create();
        $user->assignRole($role);

        return $user;
    }

    public function test_admin_can_create_a_user_with_a_role(): void
    {
        $this->actingAs($this->userWithRole('Admin'))
            ->post('/users', [
                'name' => 'New Editor',
                'email' => 'new-editor@example.com',
                'password' => 'password123',
                'role' => 'Editor',
            ])
            ->assertRedirect(route('users.index'));

        $created = User::where('email', 'new-editor@example.com')->firstOrFail();
        $this->assertTrue($created->hasRole('Editor'));
    }

    public function test_users_without_permission_cannot_manage_users(): void
    {
        $this->actingAs($this->userWithRole('User'))->get('/users')->assertForbidden();
        $this->actingAs($this->userWithRole('Editor'))->get('/users')->assertForbidden();
    }

    public function test_admin_can_update_and_delete_a_role(): void
    {
        $admin = $this->userWithRole('Admin');
        $role = Role::create(['name' => 'Moderator']);

        $this->actingAs($admin)
            ->put("/roles/{$role->id}", ['name' => 'Reviewer', 'permissions' => ['view posts']])
            ->assertRedirect(route('roles.index'));

        $role->refresh();
        $this->assertSame('Reviewer', $role->name);
        $this->assertTrue($role->hasPermissionTo('view posts'));

        $this->actingAs($admin)->delete("/roles/{$role->id}")->assertRedirect();
        $this->assertDatabaseMissing('roles', ['id' => $role->id]);
    }

    public function test_editor_cannot_create_categories(): void
    {
        $this->actingAs($this->userWithRole('Editor'))
            ->post('/categories', ['title' => 'Nope'])
            ->assertForbidden();
    }

    public function test_updating_a_post_keeps_its_slug_and_cover_image(): void
    {
        Storage::fake('public');
        $admin = $this->userWithRole('Admin');
        $category = Category::factory()->create();

        $this->actingAs($admin)->post('/posts', [
            'title' => 'Hello World',
            'content' => '<p>Body</p>',
            'category_ids' => [$category->id],
            'is_published' => true,
            'cover_image' => UploadedFile::fake()->create('cover.jpg', 100, 'image/jpeg'),
        ])->assertRedirect(route('posts.index'));

        $post = Post::firstOrFail();
        $this->assertSame('hello-world', $post->slug);
        $this->assertNotNull($post->cover_image);
        Storage::disk('public')->assertExists($post->cover_image);

        $this->actingAs($admin)->put("/posts/{$post->id}", [
            'title' => 'Hello World (edited)',
            'slug' => 'hello-world',
            'content' => '<p>Edited</p>',
            'category_ids' => [$category->id],
            'is_published' => true,
            'cover_image' => null,
        ])->assertSessionHasNoErrors()->assertRedirect(route('posts.index'));

        $fresh = $post->fresh();
        $this->assertSame('Hello World (edited)', $fresh->title);
        $this->assertSame($post->cover_image, $fresh->cover_image);
    }

    public function test_editor_posts_are_saved_as_drafts(): void
    {
        $category = Category::factory()->create();

        $this->actingAs($this->userWithRole('Editor'))->post('/posts', [
            'title' => 'Draft post',
            'content' => 'Body',
            'category_ids' => [$category->id],
            'is_published' => true,
        ])->assertRedirect(route('posts.index'));

        $this->assertFalse((bool) Post::firstOrFail()->is_published);
    }

    public function test_public_blog_only_shows_published_posts(): void
    {
        $published = Post::factory()->create(['is_published' => true]);
        $draft = Post::factory()->create(['is_published' => false]);

        $this->get(route('blog.show', $published->slug))->assertOk();
        $this->get(route('blog.show', $draft->slug))->assertNotFound();
    }

    public function test_registered_users_receive_the_default_role(): void
    {
        $this->post(route('register.store'), [
            'name' => 'Reader',
            'email' => 'reader@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertTrue(User::where('email', 'reader@example.com')->firstOrFail()->hasRole('User'));
    }
}
