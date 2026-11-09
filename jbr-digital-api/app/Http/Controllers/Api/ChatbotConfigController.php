<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatbotConfigResource;
use App\Models\ChatbotConfig;
use Illuminate\Http\Request;

class ChatbotConfigController extends Controller
{
    /**
     * Display the chatbot configuration.
     */
    public function show()
    {
        $config = ChatbotConfig::firstOrCreate(
            ['id' => 1],
            [
                'system_prompt' => "You are JBR Digital AI Assistant, representing an elite Qatari software development agency (شركة قطرية بإدارة قطرية). You are professional, courteous, helpful, and speak Arabic and English fluently. Answer questions about services, technologies, past projects, and pricing accurately based on provided context.",
                'company_info' => "JBR Digital is a premier Qatari software development agency managed by Qatari leadership (شركة قطرية بإدارة قطرية). We build high-end web applications, mobile apps (iOS & Android), AI chatbots, WhatsApp business automation, ERP systems, and cloud maintenance. Contact WhatsApp: +974 7137 7713, Email: info@jb-digital.qa.",
                'pricing_context' => "Prices are in US Dollars ($ USD) for our international and regional clients. General starting points: Custom Web Applications from $950 USD, High-End E-Commerce from $1,300 USD, Mobile Apps from $1,900 USD, WhatsApp AI Agents from $700 USD, ERP & Enterprise Systems from $3,200 USD. Always advise clients to contact us directly via WhatsApp (+974 7137 7713) for exact tailored proposals.",
                'faq' => [
                    ['question' => 'What are your services?', 'answer' => 'We deliver bespoke web development, native mobile apps, ERP systems, and AI automation.'],
                    ['question' => 'How much does a project cost?', 'answer' => 'Web projects start from $950 USD and mobile apps from $1,900 USD.'],
                    ['question' => 'How can I contact you?', 'answer' => 'You can chat directly with our team on WhatsApp: +974 7137 7713.'],
                ],
            ]
        );

        return new ChatbotConfigResource($config);
    }

    /**
     * Update the chatbot configuration.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'system_prompt' => 'nullable|string',
            'company_info' => 'nullable|string',
            'pricing_context' => 'nullable|string',
            'faq' => 'nullable|array',
        ]);

        $config = ChatbotConfig::firstOrCreate(['id' => 1]);
        $config->update($validated);

        return new ChatbotConfigResource($config);
    }
}

