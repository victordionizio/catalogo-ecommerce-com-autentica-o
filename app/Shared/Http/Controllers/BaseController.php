<?php

namespace App\Shared\Http\Controllers;

use App\Shared\Http\Responses\BaseApiResponse;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

abstract class BaseController extends Controller
{
    /**
     * @param  array<int|string, mixed>|object  $data
     */
    protected function success(
        mixed $data = null,
        string $message = '',
        ?LengthAwarePaginator $paginator = null,
        int $status = 200
    ): JsonResponse {
        return BaseApiResponse::success($data ?? [], $message, $paginator, $status);
    }

    /**
     * @param  array<string, mixed>  $user
     */
    protected function authSuccess(array $user, string $token, string $message = '', int $status = 200): JsonResponse
    {
        return BaseApiResponse::success([
            'user' => $user,
            'token' => $token,
        ], $message, null, $status);
    }

    protected function error(string $message, int $status = 400): JsonResponse
    {
        return BaseApiResponse::error($message, $status);
    }
}
