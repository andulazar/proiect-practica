# Blog CMS – Laravel 12 + React (Inertia)

A blog content-management system with a public blog and an admin panel, built with
**Laravel 12**, **Inertia.js 2**, **React 19 / TypeScript** and **Tailwind CSS 4**.

## Features

- **Public blog** (`/`) – lists published articles with cover images; each article has its own page (`/article/{slug}`).
- **Admin panel** (`/dashboard`) – CRUD for **posts**, **categories**, **users** and **roles**, with pagination and confirmation pop-ups.
- **Rich-text editor** (Quill) and **cover-image upload** for posts.
- **Roles & permissions** via `spatie/laravel-permission`:
  | Role   | Can do |
  |--------|--------|
  | Admin  | everything (users, roles, categories, posts, publishing) |
  | Editor | view categories, view/create/edit posts (their posts are saved as drafts – no `publish posts` permission) |
  | User   | default role for self-registered accounts, no admin access |
- **Authentication** with Laravel Fortify: login, registration, e-mail verification, password reset, 2FA.
- **REST API** secured with Laravel Sanctum tokens (see below).
- **Activity log** for user changes (`spatie/laravel-activitylog`).
- Architecture: Controllers → **Services** → **Repositories** (bound to interfaces), Form Requests for validation, Policies for authorization.

## Requirements

- PHP 8.2+ (with `pdo_sqlite`, `gd` or `imagick` for image handling)
- Composer 2
- Node.js 20+ and npm

## Installation

```bash
git clone https://github.com/andulazar/proiect-practica.git
cd proiect-practica

composer install
npm install

cp .env.example .env
php artisan key:generate

touch database/database.sqlite          # default DB is SQLite
php artisan migrate --seed              # creates tables, roles, demo users, categories and posts
php artisan storage:link                # required so uploaded cover images are publicly visible

npm run build
```

## Running

```bash
composer run dev     # starts php artisan serve + queue worker + Vite
```

Open http://localhost:8000.

### Demo accounts (created by the seeder, password: `password`)

| E-mail               | Role   |
|----------------------|--------|
| admin@example.com    | Admin  |
| editor@example.com   | Editor |
| test@example.com     | User   |

## REST API (Sanctum)

```bash
# 1. get a token
curl -X POST http://localhost:8000/api/login \
  -H "Accept: application/json" \
  -d email=admin@example.com -d password=password -d device_name=cli

# 2. use it
curl http://localhost:8000/api/posts?category=News&per_page=6 -H "Authorization: Bearer <token>"
```

| Method | Endpoint             | Description                                  |
|--------|----------------------|----------------------------------------------|
| POST   | `/api/login`         | returns a bearer token                       |
| GET    | `/api/posts`         | published posts, paginated (`category`, `per_page` ≤ 50) |
| GET    | `/api/posts/{slug}`  | a single published post                      |
| GET    | `/api/categories`    | all categories                               |
| POST   | `/api/logout`        | revokes the current token                    |

## Tests

```bash
php artisan test
```
