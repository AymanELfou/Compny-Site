<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatbotConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        'system_prompt',
        'company_info',
        'pricing_context',
        'faq',
    ];

    protected $casts = [
        'faq' => 'array',
    ];
}

