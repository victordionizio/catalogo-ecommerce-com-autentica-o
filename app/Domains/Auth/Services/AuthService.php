<?php

namespace App\Domains\Auth\Services;

use App\Domains\Auth\Models\User;
use App\Domains\Auth\Repositories\Contracts\UserRepositoryInterface;
use App\Shared\Services\BaseService;
use Illuminate\Support\Facades\Hash;

class AuthService extends BaseService
{
    public function __construct(
        private UserRepositoryInterface $users
    ) {
    }

    /**
     * @param  array{name: string, email: string, password: string}  $data
     * @return array{0: User, 1: string}
     */
    public function register(array $data): array
    {
        $user = $this->users->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if (! $user instanceof User) {
            throw new \RuntimeException('Falha ao criar utilizador.');
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return [$user, $token];
    }

    /**
     * @return array{0: User, 1: string}|null
     */
    public function attemptLogin(string $email, string $password): ?array
    {
        $user = $this->users->findByEmail($email);

        if ($user === null || ! Hash::check($password, $user->password)) {
            return null;
        }

        $user->tokens()->delete();
        $token = $user->createToken('auth-token')->plainTextToken;

        return [$user, $token];
    }
}
