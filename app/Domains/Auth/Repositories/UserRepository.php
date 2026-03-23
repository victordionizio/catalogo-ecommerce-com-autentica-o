<?php

namespace App\Domains\Auth\Repositories;

use App\Domains\Auth\Models\User;
use App\Domains\Auth\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Collection;

class UserRepository implements UserRepositoryInterface
{
    public function all(): Collection
    {
        return User::query()->get();
    }

    public function find(int $id): ?object
    {
        return User::query()->find($id);
    }

    public function create(array $attributes): object
    {
        return User::query()->create($attributes);
    }

    public function update(int $id, array $attributes): bool
    {
        $user = User::query()->find($id);

        if ($user === null) {
            return false;
        }

        return (bool) $user->update($attributes);
    }

    public function delete(int $id): bool
    {
        return (bool) User::query()->whereKey($id)->delete();
    }

    public function findByEmail(string $email): ?User
    {
        return User::query()->where('email', $email)->first();
    }
}
