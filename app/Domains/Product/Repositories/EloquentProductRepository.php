<?php

namespace App\Domains\Product\Repositories;

use App\Domains\Product\Models\Product;
use App\Domains\Product\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class EloquentProductRepository implements ProductRepositoryInterface
{
    public function all(): Collection
    {
        return Product::query()->with('category')->orderBy('name')->get();
    }

    public function find(int $id): ?object
    {
        return $this->findWithCategory($id);
    }

    public function findWithCategory(int $id): ?Product
    {
        return Product::query()->with('category')->find($id);
    }

    public function paginateWithFilters(int $perPage, ?int $categoryId, ?string $search): LengthAwarePaginator
    {
        $query = Product::query()->with('category');

        if ($categoryId !== null) {
            $query->where('category_id', $categoryId);
        }

        if ($search !== null && $search !== '') {
            $pattern = '%'.addcslashes($search, '%_\\').'%';
            $query->where(function ($q) use ($pattern) {
                $q->where('name', 'like', $pattern)
                    ->orWhere('description', 'like', $pattern);
            });
        }

        return $query->orderBy('name')->paginate($perPage);
    }

    public function create(array $attributes): object
    {
        return Product::query()->create($attributes);
    }

    public function update(int $id, array $attributes): bool
    {
        $product = Product::query()->find($id);

        if ($product === null) {
            return false;
        }

        return (bool) $product->update($attributes);
    }

    public function delete(int $id): bool
    {
        return (bool) Product::query()->whereKey($id)->delete();
    }
}
