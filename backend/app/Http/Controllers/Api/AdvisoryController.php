<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Advisory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdvisoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Advisory::query()->orderByDesc('published_at')->orderByDesc('id');

        if ($request->filled('category')) {
            $query->where('category', $request->string('category'));
        }

        return response()->json($query->get());
    }
}
