<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactInquiryMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Handle incoming contact inquiries and send email to the company.
     */
    public function send(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'fullName'   => ['required', 'string', 'min:2', 'max:255'],
            'clientType' => ['required', 'string', 'in:company,individual'],
            'phone'      => ['required', 'string', 'min:6', 'max:50'],
            'email'      => ['required', 'email', 'max:255'],
            'subject'    => ['required', 'string', 'min:3', 'max:255'],
            'message'    => ['required', 'string', 'min:10', 'max:10000'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();
        $validated['ip'] = $request->ip();

        $recipient = env('COMPANY_CONTACT_EMAIL', 'jbrdigitalsoftwareprograming@gmail.com');

        try {
            Mail::to($recipient)->send(new ContactInquiryMail($validated));

            return response()->json([
                'success' => true,
                'message' => 'Your inquiry has been sent successfully to JBR Digital.',
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Contact form email failed to send: ' . $e->getMessage(), [
                'exception' => $e->getMessage(),
                'recipient' => $recipient,
                'payload'   => [
                    'fullName' => $validated['fullName'],
                    'email'    => $validated['email'],
                    'subject'  => $validated['subject'],
                ],
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to send email right now. Please try again later or contact us directly via phone or WhatsApp.',
                'error'   => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }
}

