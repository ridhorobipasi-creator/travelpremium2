<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BookingController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('packages', PackageController::class);
Route::apiResource('cars', CarController::class);
Route::apiResource('bookings', BookingController::class);
Route::apiResource('blogs', App\Http\Controllers\BlogController::class);
Route::apiResource('home-heroes', App\Http\Controllers\HomeHeroController::class);
Route::apiResource('features', App\Http\Controllers\FeatureController::class);
Route::apiResource('gallery-items', App\Http\Controllers\GalleryItemController::class);
Route::get('settings', [App\Http\Controllers\Api\SettingController::class, 'index']);
