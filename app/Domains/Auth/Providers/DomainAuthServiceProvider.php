<?php

namespace App\Domains\Auth\Providers;

use App\Domains\Auth\Repositories\Contracts\UserRepositoryInterface;
use App\Domains\Auth\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class DomainAuthServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
