<?php

namespace App\Domains\Product\Providers;

use App\Domains\Product\Repositories\Contracts\ProductRepositoryInterface;
use App\Domains\Product\Repositories\EloquentProductRepository;
use Illuminate\Support\ServiceProvider;

class ProductServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(ProductRepositoryInterface::class, EloquentProductRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
