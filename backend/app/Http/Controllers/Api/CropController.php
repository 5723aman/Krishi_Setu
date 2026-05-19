<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Crop;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CropController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Crop::query()->orderBy('name');

        if ($request->filled('category')) {
            $query->where('category', $request->string('category'));
        }

        return response()->json($query->get());
    }

    public function show(Crop $crop): JsonResponse
    {
        $crop->load('marketPrices');

        return response()->json($crop);
    }
}
