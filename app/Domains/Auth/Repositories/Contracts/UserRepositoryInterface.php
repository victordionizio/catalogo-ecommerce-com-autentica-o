<?php

namespace App\Domains\Auth\Repositories\Contracts;

use App\Domains\Auth\Models\User;
use App\Shared\Infrastructure\Repositories\BaseRepositoryInterface;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    public function findByEmail(string $email): ?User;
}
