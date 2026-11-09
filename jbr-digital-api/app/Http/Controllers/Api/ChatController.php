<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatbotConfig;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    /**
     * Handle incoming chat message and query OpenAI.
     */
    public function send(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
            'history' => 'nullable|array',
        ]);

        $userMessage = trim($request->input('message'));
        $history = $request->input('history', []);

        // 1. Fetch dynamic config & projects from database
        $config = ChatbotConfig::first();
        $systemPromptText = $config?->system_prompt ?? "You are JBR Digital AI Assistant, representing an elite Qatari software development agency (شركة قطرية بإدارة قطرية).";
        $companyInfo = $config?->company_info ?? "JBR Digital is a premier Qatari software development agency.";
        $pricingContext = $config?->pricing_context ?? "Prices are in US Dollars ($ USD). Contact WhatsApp: +974 7137 7713.";

        $activeProjects = Project::where('is_active', true)->get();
        $projectsList = "";
        foreach ($activeProjects as $p) {
            $priceStr = $p->price > 0 ? "$" . number_format($p->price, 0) . " USD" : "Custom Quote";
            $projectsList .= "- [{$p->category}] {$p->title} | Price: {$priceStr}\n  Description: {$p->description}\n";
        }

        // 2. Build full composite system instructions
        $compositeSystemPrompt = <<<EOT
{$systemPromptText}

=== OFFICIAL AGENCY DETAILS ===
{$companyInfo}

=== PRICING & QUOTATION RULES ===
{$pricingContext}

=== OUR PORTFOLIO & RECENT PROJECTS ===
{$projectsList}

=== STRICT GUIDELINES ===
1. Always maintain a polite, respectful, and professional tone in Arabic or English according to the user's language.
2. If asked about prices, provide the relevant project price or starting range in US Dollars ($ USD) based on the context above.
3. If asked about projects, recommend relevant examples from our portfolio above.
4. Encourage clients to book a free consultation or chat directly via official WhatsApp: +974 7137 7713.
5. If you do not have specific information, invite the client to WhatsApp for an exact proposal.
EOT;

        // 3. Prepare messages payload for OpenAI
        $messages = [
            ['role' => 'system', 'content' => $compositeSystemPrompt],
        ];

        // Append recent chat history if provided
        if (is_array($history)) {
            foreach (array_slice($history, -6) as $entry) {
                if (isset($entry['role'], $entry['content'])) {
                    $messages[] = [
                        'role' => in_array($entry['role'], ['user', 'assistant']) ? $entry['role'] : 'user',
                        'content' => (string) $entry['content'],
                    ];
                }
            }
        }

        // Add latest user message
        $messages[] = ['role' => 'user', 'content' => $userMessage];

        $apiKey = env('OPENAI_API_KEY');
        $model = env('OPENAI_MODEL', 'gpt-4o-mini');

        // 4. Query OpenAI API
        try {
            if (empty($apiKey)) {
                return response()->json([
                    'reply' => "مرحباً بك! للاستفسار والحصول على عرض سعر فوري، يسعدنا تواصلك معنا مباشرة عبر واتساب على الرقم: +974 7137 7713.",
                    'status' => 'fallback_no_key',
                ]);
            }

            $response = Http::withToken($apiKey)
                ->timeout(30)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => $model,
                    'messages' => $messages,
                    'temperature' => 0.7,
                    'max_tokens' => 500,
                ]);

            if ($response->successful()) {
                $data = $response->json();
                $reply = $data['choices'][0]['message']['content'] ?? 'لم أتمكن من معالجة الرد، يرجى المحاولة مرة أخرى.';

                return response()->json([
                    'reply' => trim($reply),
                    'model' => $model,
                ]);
            } else {
                Log::error('OpenAI API Error: ' . $response->body());
                return response()->json([
                    'reply' => "مرحباً بك في JBR Digital! يسعدنا تقديم المساعدة واستقبال استفسارك مباشرة عبر واتساب: +974 7137 7713.",
                    'status' => 'api_error',
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Chat Exception: ' . $e->getMessage());
            return response()->json([
                'reply' => "شكراً لتواصلك معنا! للحصول على تفاصيل فورية، يرجى مراسلتنا عبر واتساب: +974 7137 7713.",
                'status' => 'exception',
            ]);
        }
    }
}

