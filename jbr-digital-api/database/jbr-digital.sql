-- JBR Digital MySQL Database Export
SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES ('1', 'JBR Digital Admin', 'admin@jbr-digital.qa', NULL, '$2y$12$hP3XHofYalTjYo.zdeLeyuI99o4jOyCdV5GanhAG1B/8Y3KRXt69G', NULL, '2026-11-05 16:09:52', '2026-11-05 16:09:52');

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `category` varchar(255) NOT NULL DEFAULT 'Web',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `projects` (`id`, `title`, `description`, `image_url`, `tags`, `price`, `category`, `is_active`, `is_featured`, `created_at`, `updated_at`) VALUES ('1', 'Aura Luxe Store', 'متجر إلكتروني متقدم للمنتجات الفاخرة مع بوابة دفع ذكية وتتبع المخزون والطلبات لحظياً.', '/projects/aura-store.jpg', '[\"React\",\"TypeScript\",\"TailwindCSS\",\"Stripe\"]', '1300.00', 'E-Commerce', '1', '1', '2026-11-05 16:09:52', '2026-11-05 18:04:57');
INSERT INTO `projects` (`id`, `title`, `description`, `image_url`, `tags`, `price`, `category`, `is_active`, `is_featured`, `created_at`, `updated_at`) VALUES ('2', 'QuantumYield', 'منصة تحسين عوائد مالية لا مركزية بالذكاء الاصطناعي مع لوحة تحكم فورية.', '/projects/quantumyield.jpg', '[\"React\",\"TypeScript\",\"TailwindCSS\",\"Web3\"]', '1400.00', 'Web', '1', '1', '2026-11-05 16:09:52', '2026-11-05 18:04:57');
INSERT INTO `projects` (`id`, `title`, `description`, `image_url`, `tags`, `price`, `category`, `is_active`, `is_featured`, `created_at`, `updated_at`) VALUES ('3', 'SolanaTap', 'تطبيق ويب سريع مدمج داخل تيليجرام مع مزامنة المعاملات اللحظية وحماية عالية.', '/projects/solanatap.jpg', '[\"React 19\",\"Telegram SDK\",\"Node.js\"]', '950.00', 'Web', '1', '1', '2026-11-05 16:09:52', '2026-11-05 18:04:57');
INSERT INTO `projects` (`id`, `title`, `description`, `image_url`, `tags`, `price`, `category`, `is_active`, `is_featured`, `created_at`, `updated_at`) VALUES ('4', 'Al Rayyan Mobile Vault', 'تطبيق جوال مالي آمن لإدارة الحسابات والمدفوعات اللحظية مع تشفير مصرفي.', 'http://localhost:8000/uploads/projects/proj_1793902607_Wv2Xruk1.webp', '[\"Flutter\",\"iOS\",\"Android\",\"Biometrics\"]', '2100.00', 'Mobile', '1', '0', '2026-11-05 16:09:52', '2026-11-05 18:16:52');
INSERT INTO `projects` (`id`, `title`, `description`, `image_url`, `tags`, `price`, `category`, `is_active`, `is_featured`, `created_at`, `updated_at`) VALUES ('5', 'Doha AI Logistics Suite', 'نظام ERP متكامل لإدارة الشحنات والأسطول في الدوحة مدعوم بالذكاء الاصطناعي وتتبع GPS.', 'http://localhost:8000/uploads/projects/proj_1793902762_y0Un02NN.webp', '[\"Laravel 11\",\"Vue.js\",\"PostgreSQL\",\"AI Dispatch\"]', '3200.00', 'ERP', '1', '0', '2026-11-05 16:09:52', '2026-11-05 18:19:24');

DROP TABLE IF EXISTS `chatbot_configs`;
CREATE TABLE `chatbot_configs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `system_prompt` text DEFAULT NULL,
  `company_info` text DEFAULT NULL,
  `pricing_context` text DEFAULT NULL,
  `faq` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`faq`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `chatbot_configs` (`id`, `system_prompt`, `company_info`, `pricing_context`, `faq`, `created_at`, `updated_at`) VALUES ('1', 'أنت المساعد الذكي الرسمي لشركة JBR Digital (شركة قطرية بإدارة قطرية). دورك هو مساعدة الزوار والعملاء، والإجابة عن استفساراتهم حول خدمات تطوير البرمجيات، وتطبيقات الجوال، والذكاء الاصطناعي، والمشاريع السابقة، والأسعار في قطر. تحدث بلباقة واحترافية باللغة العربية أو الإنجليزية حسب لغة العميل. شجع العميل دائماً على التواصل المباشر عبر واتساب على الرقم +974 7137 7713 للحصول على استشارة مجانية وعرض سعر مخصص.', 'شركة JBR Digital هي شركة برمجيات رائدة في دولة قطر بإدارة قطرية متخصصة في:\n- تطوير مواقع وتطبيقات الويب المتقدمة (React, Next.js, Laravel).\n- تطوير تطبيقات الجوال الأصلية والهجينة (iOS & Android).\n- حلول وأتمتة الواتساب ووكلاء الذكاء الاصطناعي (WhatsApp AI Agents).\n- أنظمة تخطيط الموارد للمؤسسات (ERP Systems).\n- الصيانة السحابية والدعم الفني المستمر 24/7.\nقنوات الاتصال الرسمية:\n- واتساب: +974 7137 7713\n- البريد الإلكتروني: info@jb-digital.qa\n- انستغرام: @jbrdigitalprograming\n- تيك توك: @jbr.digital.progr', 'الأسعار محددة بالدولار الأمريكي ($ USD) لخدمة عملائنا دولياً ومحلياً. الأسعار التقديرية: تطوير الويب يبدأ من 950$، المتاجر الإلكترونية من 1,200$، تطبيقات الجوال من 1,900$، وحلول الأتمتة من 700$. للحصول على تسعيرة دقيقة، يُرجى التواصل عبر واتساب الرسمي: +974 7137 7713.', '[{\"question\":\"\\u0645\\u0627 \\u0647\\u064a \\u062e\\u062f\\u0645\\u0627\\u062a\\u0643\\u0645\\u061f\",\"answer\":\"\\u0646\\u0642\\u062f\\u0645 \\u062a\\u0637\\u0648\\u064a\\u0631 \\u0627\\u0644\\u0648\\u064a\\u0628\\u060c \\u062a\\u0637\\u0628\\u064a\\u0642\\u0627\\u062a \\u0627\\u0644\\u062c\\u0648\\u0627\\u0644\\u060c \\u0627\\u0644\\u0645\\u062a\\u0627\\u062c\\u0631 \\u0627\\u0644\\u0625\\u0644\\u0643\\u062a\\u0631\\u0648\\u0646\\u064a\\u0629\\u060c \\u0648\\u062d\\u0644\\u0648\\u0644 \\u0627\\u0644\\u0630\\u0643\\u0627\\u0621 \\u0627\\u0644\\u0627\\u0635\\u0637\\u0646\\u0627\\u0639\\u064a.\"},{\"question\":\"\\u0643\\u0645 \\u062a\\u0643\\u0644\\u0641\\u0629 \\u0625\\u0646\\u0634\\u0627\\u0621 \\u062a\\u0637\\u0628\\u064a\\u0642 \\u0623\\u0648 \\u0645\\u0648\\u0642\\u0639\\u061f\",\"answer\":\"\\u062a\\u0628\\u062f\\u0623 \\u0623\\u0633\\u0639\\u0627\\u0631 \\u0627\\u0644\\u0645\\u0648\\u0627\\u0642\\u0639 \\u0645\\u0646 3,500 \\u0631\\u064a\\u0627\\u0644 \\u0648\\u0627\\u0644\\u062a\\u0637\\u0628\\u064a\\u0642\\u0627\\u062a \\u0645\\u0646 7,000 \\u0631\\u064a\\u0627\\u0644 \\u0642\\u0637\\u0631\\u064a.\"},{\"question\":\"\\u0643\\u064a\\u0641 \\u064a\\u0645\\u0643\\u0646\\u0646\\u064a \\u0627\\u0644\\u062a\\u0648\\u0627\\u0635\\u0644 \\u0645\\u0639\\u0643\\u0645\\u061f\",\"answer\":\"\\u064a\\u0645\\u0643\\u0646\\u0643 \\u0627\\u0644\\u062a\\u0648\\u0627\\u0635\\u0644 \\u0645\\u0639\\u0646\\u0627 \\u0645\\u0628\\u0627\\u0634\\u0631\\u0629 \\u0639\\u0628\\u0631 \\u0648\\u0627\\u062a\\u0633\\u0627\\u0628 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0631\\u0642\\u0645 +974 7137 7713.\"}]', '2026-11-05 16:09:52', '2026-11-05 20:13:44');

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES ('4', 'App\\Models\\User', '1', 'admin-token', '10efd4b2fcb872c463779b39e6c563c69c90c7bae62ebaef88ea67a2333851da', '[\"*\"]', '2026-11-06 13:40:28', NULL, '2026-11-05 20:52:36', '2026-11-06 13:40:28');

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES ('1', '0001_01_01_000000_create_users_table', '1');
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES ('2', '0001_01_01_000001_create_cache_table', '1');
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES ('3', '0001_01_01_000002_create_jobs_table', '1');
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES ('4', '2026_11_05_160515_create_personal_access_tokens_table', '1');
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES ('5', '2026_11_05_160551_create_projects_table', '2');
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES ('6', '2026_11_05_160603_create_chatbot_configs_table', '2');

SET FOREIGN_KEY_CHECKS=1;
