<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Scheme;
use Illuminate\Http\JsonResponse;

class SchemeController extends Controller
{
    public function index(): JsonResponse
    {
        $schemes = Scheme::query()->orderBy('title')->get();

        return response()->json($schemes);
    }
}
