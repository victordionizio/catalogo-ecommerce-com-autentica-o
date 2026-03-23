<?php

namespace App\Shared\Http\Responses;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;

final class BaseApiResponse
{
    /**
     * Resposta de sucesso com meta.pagination vazio quando não há paginação,
     * ou com current_page, per_page e total quando há paginador.
     *
     * @param  array<int|string, mixed>|object  $data
     */
    public static function success(
        mixed $data,
        string $message = '',
        ?LengthAwarePaginator $paginator = null,
        int $status = 200
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => $message,
            'meta' => [
                'pagination' => self::paginationPayload($paginator),
            ],
        ], $status);
    }

    public static function error(string $message, int $status = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], $status);
    }

    /**
     * @return array<string, int>|object
     */
    private static function paginationPayload(?LengthAwarePaginator $paginator): array|object
    {
        if ($paginator === null) {
            return (object) [];
        }

        return [
            'current_page' => $paginator->currentPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
        ];
    }
}
