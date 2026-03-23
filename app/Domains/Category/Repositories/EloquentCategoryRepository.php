<?php

namespace App\Domains\Category\Repositories;

use App\Domains\Category\Models\Category;
use App\Domains\Category\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class EloquentCategoryRepository implements CategoryRepositoryInterface
{
    public function all(): Collection
    {
        return Category::query()->orderBy('name')->get();
    }

    public function find(int $id): ?object
    {
        return Category::query()->find($id);
    }

    public function paginateOrdered(int $perPage): LengthAwarePaginator
    {
        return Category::query()->orderBy('name')->paginate($perPage);
    }

    public function create(array $attributes): object
    {
        return Category::query()->create($attributes);
    }

    public function update(int $id, array $attributes): bool
    {
        $category = Category::query()->find($id);

        if ($category === null) {
            return false;
        }

        return (bool) $category->update($attributes);
    }

    public function delete(int $id): bool
    {
        return (bool) Category::query()->whereKey($id)->delete();
    }
}
