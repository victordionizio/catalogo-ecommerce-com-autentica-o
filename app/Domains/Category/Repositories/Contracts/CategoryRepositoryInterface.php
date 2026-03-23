<?php

namespace App\Domains\Category\Repositories\Contracts;

use App\Shared\Infrastructure\Repositories\BaseRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface CategoryRepositoryInterface extends BaseRepositoryInterface
{
    public function paginateOrdered(int $perPage): LengthAwarePaginator;
}
