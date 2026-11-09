export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  price: number;
  category: string;
  is_active: boolean;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ChatbotConfig {
  id: number;
  system_prompt: string;
  company_info: string;
  pricing_context: string;
  faq?: Array<{ question: string; answer: string }>;
  created_at?: string;
  updated_at?: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
}

