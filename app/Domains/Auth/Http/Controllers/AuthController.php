<?php

namespace App\Domains\Auth\Http\Controllers;

use App\Domains\Auth\Http\Requests\LoginRequest;
use App\Domains\Auth\Http\Requests\RegisterRequest;
use App\Domains\Auth\Services\AuthService;
use App\Shared\Http\Controllers\BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends BaseController
{
    public function __construct(
        private AuthService $authService
    ) {
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        [$user, $token] = $this->authService->register($request->validated());

        return $this->authSuccess(
            $user->toArray(),
            $token,
            'Registo efetuado com sucesso.'
        );
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->attemptLogin(
            $request->validated('email'),
            $request->validated('password')
        );

        if ($result === null) {
            return $this->error('Credenciais inválidas.', 401);
        }

        [$user, $token] = $result;

        return $this->authSuccess(
            $user->toArray(),
            $token,
            'Sessão iniciada com sucesso.'
        );
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return $this->authSuccess(
            $user->toArray(),
            '',
            ''
        );
    }
}
