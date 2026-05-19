<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\FarmerInquiryMail;
use App\Models\FarmerInquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class FarmerInquiryController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'phone' => ['required', 'string', 'max:32'],
            'district' => ['nullable', 'string', 'max:120'],
            'topic' => ['required', 'string', 'in:advisory,scheme,market,training,other'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $inquiry = FarmerInquiry::create($data);

        $notifyTo = config('inquiry.notify_email');
        if (is_string($notifyTo) && filter_var($notifyTo, FILTER_VALIDATE_EMAIL)) {
            try {
                Mail::to($notifyTo)->send(new FarmerInquiryMail($inquiry));
            } catch (\Throwable $e) {
                Log::error('Farmer inquiry email failed', [
                    'inquiry_id' => $inquiry->id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        return response()->json([
            'message' => 'Thank you. Your request has been recorded. An extension officer may contact you soon.',
            'id' => $inquiry->id,
        ], 201);
    }
}
