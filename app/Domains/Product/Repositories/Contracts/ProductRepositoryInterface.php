<?php

namespace App\Domains\Product\Repositories\Contracts;

use App\Domains\Product\Models\Product;
use App\Shared\Infrastructure\Repositories\BaseRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface extends BaseRepositoryInterface
{
    public function paginateWithFilters(int $perPage, ?int $categoryId, ?string $search): LengthAwarePaginator;

    public function findWithCategory(int $id): ?Product;
}
