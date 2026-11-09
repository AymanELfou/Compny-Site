<?php

namespace Database\Seeders;

use App\Models\ChatbotConfig;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Admin User
        $adminEmail = env('ADMIN_EMAIL', 'admin@jbr-digital.qa');
        $adminPassword = env('ADMIN_PASSWORD', 'admin123456!');

        User::firstOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'JBR Digital Admin',
                'password' => Hash::make($adminPassword),
            ]
        );

        // 2. Seed Default Chatbot Config
        ChatbotConfig::firstOrCreate(
            ['id' => 1],
            [
                'system_prompt' => "أنت المساعد الذكي الرسمي لشركة JBR Digital (شركة قطرية بإدارة قطرية). دورك هو مساعدة الزوار والعملاء، والإجابة عن استفساراتهم حول خدمات تطوير البرمجيات، وتطبيقات الجوال، والذكاء الاصطناعي، والمشاريع السابقة، والأسعار في قطر. تحدث بلباقة واحترافية باللغة العربية أو الإنجليزية حسب لغة العميل. شجع العميل دائماً على التواصل المباشر عبر واتساب على الرقم +974 7137 7713 للحصول على استشارة مجانية وعرض سعر مخصص.",
                'company_info' => "شركة JBR Digital هي شركة برمجيات رائدة في دولة قطر بإدارة قطرية متخصصة في:
- تطوير مواقع وتطبيقات الويب المتقدمة (React, Next.js, Laravel).
- تطوير تطبيقات الجوال الأصلية والهجينة (iOS & Android).
- حلول وأتمتة الواتساب ووكلاء الذكاء الاصطناعي (WhatsApp AI Agents).
- أنظمة تخطيط الموارد للمؤسسات (ERP Systems).
- الصيانة السحابية والدعم الفني المستمر 24/7.
قنوات الاتصال الرسمية:
- واتساب: +974 7137 7713
- البريد الإلكتروني: info@jb-digital.qa
- انستغرام: @jbrdigitalprograming
- تيك توك: @jbr.digital.progr",
                'pricing_context' => "العملة الرسمية لجميع الخدمات والمشاريع هي الدولار الأمريكي ($ USD) لتلبية متطلبات عملائنا الدوليين والمحليين.
الأسعار التقديرية العامة:
- تطوير المواقع ومنصات الويب: تبدأ من 950$ دولار أمريكي.
- المتاجر الإلكترونية المتقدمة: تبدأ من 1,300$ دولار أمريكي.
- تطبيقات الجوال (iOS & Android): تبدأ من 1,900$ دولار أمريكي.
- وكلاء وأتمتة الذكاء الاصطناعي لواتساب: تبدأ من 700$ دولار أمريكي.
- أنظمة ERP وحلول الشركات: تبدأ من 3,200$ دولار أمريكي.
ملاحظة: السعر النهائي يعتمد على متطلبات وميزات كل مشروع بدقة، ويُفضل دوماً توجيه العميل للتواصل عبر واتساب (+974 7137 7713) لحساب التكلفة الدقيقة.",
                'faq' => [
                    ['question' => 'ما هي خدماتكم؟', 'answer' => 'نقدم تطوير الويب، تطبيقات الجوال، المتاجر الإلكترونية، وحلول الذكاء الاصطناعي.'],
                    ['question' => 'كم تكلفة إنشاء تطبيق أو موقع؟', 'answer' => 'تبدأ أسعار المواقع من 950$ والتطبيقات من 1,900$ دولار أمريكي.'],
                    ['question' => 'كيف يمكنني التواصل معكم؟', 'answer' => 'يمكنك التواصل معنا مباشرة عبر واتساب على الرقم +974 7137 7713.'],
                ],
            ]
        );

        // 3. Seed Projects
        $initialProjects = [
            [
                'title' => 'Aura Luxe Store',
                'description' => 'متجر إلكتروني متقدم للمنتجات الفاخرة مع بوابة دفع ذكية وتتبع المخزون والطلبات لحظياً.',
                'image_url' => '/projects/aura-store.jpg',
                'tags' => ['React', 'TypeScript', 'TailwindCSS', 'Stripe'],
                'price' => 1300.00,
                'category' => 'E-Commerce',
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'title' => 'QuantumYield',
                'description' => 'منصة تحسين عوائد مالية لا مركزية بالذكاء الاصطناعي مع لوحة تحكم فورية.',
                'image_url' => '/projects/quantumyield.jpg',
                'tags' => ['React', 'TypeScript', 'TailwindCSS', 'Web3'],
                'price' => 1400.00,
                'category' => 'Web',
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'title' => 'SolanaTap',
                'description' => 'تطبيق ويب سريع مدمج داخل تيليجرام مع مزامنة المعاملات اللحظية وحماية عالية.',
                'image_url' => '/projects/solanatap.jpg',
                'tags' => ['React 19', 'Telegram SDK', 'Node.js'],
                'price' => 950.00,
                'category' => 'Web',
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'title' => 'Al Rayyan Mobile Vault',
                'description' => 'تطبيق جوال مالي آمن لإدارة الحسابات والمدفوعات اللحظية مع تشفير مصرفي.',
                'image_url' => '/projects/al-rayyan-vault.jpg',
                'tags' => ['Flutter', 'iOS', 'Android', 'Biometrics'],
                'price' => 2100.00,
                'category' => 'Mobile',
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'title' => 'Doha AI Logistics Suite',
                'description' => 'نظام ERP متكامل لإدارة الشحنات والأسطول في الدوحة مدعوم بالذكاء الاصطناعي وتتبع GPS.',
                'image_url' => '/projects/doha-logistics.jpg',
                'tags' => ['Laravel 11', 'Vue.js', 'PostgreSQL', 'AI Dispatch'],
                'price' => 3200.00,
                'category' => 'ERP',
                'is_active' => true,
                'is_featured' => false,
            ],
        ];

        foreach ($initialProjects as $proj) {
            Project::firstOrCreate(
                ['title' => $proj['title']],
                $proj
            );
        }
    }
}
