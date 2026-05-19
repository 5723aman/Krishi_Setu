<?php

use App\Http\Controllers\Api\AdvisoryController;
use App\Http\Controllers\Api\CropController;
use App\Http\Controllers\Api\FarmerInquiryController;
use App\Http\Controllers\Api\MarketPriceController;
use App\Http\Controllers\Api\SchemeController;
use App\Http\Controllers\Api\StatsController;
use Illuminate\Support\Facades\Route;

Route::get('/stats', [StatsController::class, 'index']);
Route::get('/crops', [CropController::class, 'index']);
Route::get('/crops/{crop}', [CropController::class, 'show']);
Route::get('/market-prices', [MarketPriceController::class, 'index']);
Route::get('/advisories', [AdvisoryController::class, 'index']);
Route::get('/schemes', [SchemeController::class, 'index']);
Route::post('/inquiries', [FarmerInquiryController::class, 'store']);
