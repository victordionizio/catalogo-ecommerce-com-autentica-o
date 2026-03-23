<?php

namespace App\Domains\Product\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    public $collects = ProductResource::class;

    /**
     * Lista plana de produtos transformados (o envelope success/data/meta fica no BaseApiResponse).
     *
     * @return array<int, array<string, mixed>>
     */
    public function toArray(Request $request): array
    {
        return $this->collection
            ->map(fn ($product) => (new ProductResource($product))->toArray($request))
            ->values()
            ->all();
    }
}
