<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', function (Request $request) {
    return User::all();
});

Route::get('/', \App\Http\Controllers\Frontend\WelcomeController::class);

Route::get('/posts/{post:slug}', \App\Http\Controllers\Frontend\PostShowController::class);

Route::apiResource('/dashboard/posts', App\Http\Controllers\PostController::class)
    ->middleware('auth:sanctum')
    ->except(['create', 'edit']);
