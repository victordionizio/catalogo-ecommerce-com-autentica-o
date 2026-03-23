<?php

namespace App\Domains\Category\Services;

use App\Domains\Category\Models\Category;
use App\Domains\Category\Repositories\Contracts\CategoryRepositoryInterface;
use App\Shared\Services\BaseService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CategoryService extends BaseService
{
    public function __construct(
        private CategoryRepositoryInterface $categories
    ) {}

    public function listCategories(int $perPage): LengthAwarePaginator
    {
        return $this->categories->paginateOrdered($perPage);
    }

    /**
     * @param  array{name: string}  $attributes
     */
    public function createCategory(array $attributes): Category
    {
        /** @var Category */
        return $this->categories->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function updateCategory(int $id, array $attributes): ?Category
    {
        $existing = $this->categories->find($id);
        if (! $existing instanceof Category) {
            return null;
        }

        $allowed = array_intersect_key($attributes, array_flip(['name']));
        if ($allowed === []) {
            return $existing;
        }

        $this->categories->update($id, $allowed);
        $updated = $this->categories->find($id);

        return $updated instanceof Category ? $updated : null;
    }

    public function deleteCategory(int $id): bool
    {
        return $this->categories->delete($id);
    }
}
