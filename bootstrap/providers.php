<?php

use App\Domains\Auth\Providers\DomainAuthServiceProvider;
use App\Domains\Category\Providers\CategoryServiceProvider;
use App\Domains\Product\Providers\ProductServiceProvider;
use App\Providers\AppServiceProvider;
use App\Providers\AuthServiceProvider;
use App\Providers\EventServiceProvider;

return [
    AppServiceProvider::class,
    AuthServiceProvider::class,
    EventServiceProvider::class,
    DomainAuthServiceProvider::class,
    CategoryServiceProvider::class,
    ProductServiceProvider::class,
];
