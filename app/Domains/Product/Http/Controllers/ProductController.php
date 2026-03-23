<?php

namespace App\Domains\Product\Http\Controllers;

use App\Domains\Product\Http\Requests\StoreProductRequest;
use App\Domains\Product\Http\Requests\UpdateProductRequest;
use App\Domains\Product\Http\Resources\ProductCollection;
use App\Domains\Product\Http\Resources\ProductResource;
use App\Domains\Product\Services\ProductService;
use App\Shared\Http\Controllers\BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends BaseController
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 15);
        $perPage = min(max($perPage, 1), 100);

        $categoryId = null;
        if ($request->filled('category')) {
            $c = (int) $request->query('category');
            $categoryId = $c > 0 ? $c : null;
        }

        $search = $request->query('search');
        $search = is_string($search) ? trim($search) : null;
        if ($search === '') {
            $search = null;
        }

        $paginator = $this->productService->listProducts($perPage, $categoryId, $search);

        return $this->success(
            (new ProductCollection($paginator))->resolve($request),
            '',
            $paginator
        );
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $product = $this->productService->getProduct($id);

        if ($product === null) {
            return $this->error('Produto não encontrado.', 404);
        }

        return $this->success(
            (new ProductResource($product))->resolve($request)
        );
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = $this->productService->createProduct($request->validated());

        return $this->success(
            (new ProductResource($product))->resolve($request),
            'Produto criado.',
            null,
            201
        );
    }

    public function update(UpdateProductRequest $request, int $id): JsonResponse
    {
        $validated = $request->validated();
        if ($validated === []) {
            return $this->error('Envie pelo menos um campo para atualizar.', 422);
        }

        $product = $this->productService->updateProduct($id, $validated);

        if ($product === null) {
            return $this->error('Produto não encontrado.', 404);
        }

        return $this->success(
            (new ProductResource($product))->resolve($request),
            'Produto atualizado.'
        );
    }

    public function destroy(int $id): JsonResponse
    {
        if (! $this->productService->deleteProduct($id)) {
            return $this->error('Produto não encontrado.', 404);
        }

        return $this->success([], 'Produto removido.');
    }
}
