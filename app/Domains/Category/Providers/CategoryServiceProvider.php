<?php

namespace App\Domains\Category\Providers;

use App\Domains\Category\Repositories\Contracts\CategoryRepositoryInterface;
use App\Domains\Category\Repositories\EloquentCategoryRepository;
use Illuminate\Support\ServiceProvider;

class CategoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(CategoryRepositoryInterface::class, EloquentCategoryRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
