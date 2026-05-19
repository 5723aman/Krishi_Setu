<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MarketPrice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MarketPriceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = MarketPrice::query()
            ->with('crop:id,name,category')
            ->orderByDesc('price_date')
            ->orderBy('mandi_name');

        if ($request->filled('crop_id')) {
            $query->where('crop_id', $request->integer('crop_id'));
        }

        return response()->json($query->limit(100)->get());
    }
}
