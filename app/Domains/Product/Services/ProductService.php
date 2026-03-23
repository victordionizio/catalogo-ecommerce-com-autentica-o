<?php

namespace App\Domains\Product\Services;

use App\Domains\Product\Models\Product;
use App\Domains\Product\Repositories\Contracts\ProductRepositoryInterface;
use App\Shared\Services\BaseService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductService extends BaseService
{
    public function __construct(
        private ProductRepositoryInterface $products
    ) {}

    public function listProducts(int $perPage, ?int $categoryId, ?string $search): LengthAwarePaginator
    {
        return $this->products->paginateWithFilters($perPage, $categoryId, $search);
    }

    public function getProduct(int $id): ?Product
    {
        return $this->products->findWithCategory($id);
    }

    /**
     * @param  array{name: string, description?: string|null, price: float|int|string, category_id?: int|null, image_url?: string|null}  $attributes
     */
    public function createProduct(array $attributes): Product
    {
        $product = $this->products->create($attributes);

        return $this->products->findWithCategory((int) $product->id);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function updateProduct(int $id, array $attributes): ?Product
    {
        $existing = $this->products->findWithCategory($id);
        if ($existing === null) {
            return null;
        }

        $allowed = array_intersect_key(
            $attributes,
            array_flip(['name', 'description', 'price', 'category_id', 'image_url'])
        );

        if ($allowed === []) {
            return $existing;
        }

        $this->products->update($id, $allowed);

        return $this->products->findWithCategory($id);
    }

    public function deleteProduct(int $id): bool
    {
        return $this->products->delete($id);
    }
}
