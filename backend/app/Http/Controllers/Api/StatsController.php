<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Advisory;
use App\Models\Crop;
use App\Models\FarmerInquiry;
use App\Models\MarketPrice;
use App\Models\Scheme;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'crops_catalogued' => Crop::count(),
            'active_mandi_quotes' => MarketPrice::where('price_date', '>=', now()->subDays(14))->count(),
            'advisories' => Advisory::count(),
            'schemes_listed' => Scheme::count(),
            'inquiries_received' => FarmerInquiry::count(),
        ]);
    }
}
