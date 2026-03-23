<?php

namespace App\Domains\Category\Http\Controllers;

use App\Domains\Category\Http\Requests\StoreCategoryRequest;
use App\Domains\Category\Http\Requests\UpdateCategoryRequest;
use App\Domains\Category\Http\Resources\CategoryCollection;
use App\Domains\Category\Http\Resources\CategoryResource;
use App\Domains\Category\Services\CategoryService;
use App\Shared\Http\Controllers\BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends BaseController
{
    public function __construct(
        private CategoryService $categoryService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 15);
        $perPage = min(max($perPage, 1), 100);

        $paginator = $this->categoryService->listCategories($perPage);

        return $this->success(
            (new CategoryCollection($paginator))->resolve($request),
            '',
            $paginator
        );
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = $this->categoryService->createCategory($request->validated());

        return $this->success(
            (new CategoryResource($category))->resolve($request),
            'Categoria criada.',
            null,
            201
        );
    }

    public function update(UpdateCategoryRequest $request, int $id): JsonResponse
    {
        $validated = $request->validated();
        if ($validated === []) {
            return $this->error('Envie pelo menos um campo para atualizar.', 422);
        }

        $category = $this->categoryService->updateCategory($id, $validated);

        if ($category === null) {
            return $this->error('Categoria não encontrada.', 404);
        }

        return $this->success(
            (new CategoryResource($category))->resolve($request),
            'Categoria atualizada.'
        );
    }

    public function destroy(int $id): JsonResponse
    {
        if (! $this->categoryService->deleteCategory($id)) {
            return $this->error('Categoria não encontrada.', 404);
        }

        return $this->success([], 'Categoria removida.');
    }
}
