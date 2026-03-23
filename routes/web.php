<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes — SPA shell (React via Vite)
|--------------------------------------------------------------------------
*/

Route::view('/{any?}', 'spa')->where('any', '.*');
