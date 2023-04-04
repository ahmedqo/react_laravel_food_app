<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CuisineController;
use App\Http\Controllers\OrderColtroller;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the 'api' middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['prefix' => 'password'], function () {
    Route::post('/forgot', [AuthController::class, 'forgot']);
    Route::post('/reset', [AuthController::class, 'reset']);
});

Route::get('/cuisines', [CuisineController::class, 'index']);
Route::get('/cuisine/{id}', [CuisineController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'user']);
    Route::put('/me/update', [AuthController::class, 'profile']);
    Route::put('/password/update', [AuthController::class, 'password']);
    Route::get('/orders/me', [AuthController::class, 'orders']);

    Route::get('/order/{id}', [OrderColtroller::class, 'show']);
    Route::post('/order/new', [OrderColtroller::class, 'store']);
});

Route::group(['middleware' => ['auth:api', 'admin'], 'prefix' => 'admin'], function () {
    Route::post('/cuisine/new', [CuisineController::class, 'store']);
    Route::put('/cuisine/{id}', [CuisineController::class, 'update']);
    Route::delete('/cuisine/{id}', [CuisineController::class, 'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::post('/user/new', [UserController::class, 'store']);
    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);

    Route::get('/products/top', [ProductController::class, 'top']);
    Route::post('/product/new', [ProductController::class, 'store']);
    Route::put('/product/{id}', [ProductController::class, 'update']);
    Route::delete('/product/{id}', [ProductController::class, 'destroy']);

    Route::get('/orders', [OrderColtroller::class, 'index']);
    Route::put('/order/{id}', [OrderColtroller::class, 'update']);
    Route::delete('/order/{id}', [OrderColtroller::class, 'destroy']);
});
