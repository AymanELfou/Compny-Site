# 🚀 JBR Digital — Laravel 11 Backend API & Admin CMS

REST API backend for **JBR Digital** agency website, powering project management, live pricing, and dynamic AI chatbot knowledge base with OpenAI integration.

---

## ⚡ Quick Start

### 1. Requirements
- PHP 8.2+
- MySQL Server (running on 127.0.0.1:3306)
- Composer

### 2. Run the Development Server
```bash
cd "c:\Users\Pro\Desktop\Company\Compny Site\jbr-digital-api"
php artisan serve
```
The API is available at: `http://localhost:8000/api`

---

## 🔐 Default Admin Credentials

- **URL:** `http://localhost:5173/admin/login`
- **Email:** `admin@jbr-digital.qa`
- **Password:** `admin123456!`

---

## 📡 API Endpoints

### Public Endpoints
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/projects` | List all active portfolio projects |
| `POST` | `/api/chat` | Send message to OpenAI Assistant (dynamic DB context) |
| `POST` | `/api/admin/login` | Login and receive Bearer Token |

### Protected Endpoints (`Authorization: Bearer <token>`)
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/admin/logout` | Revoke token |
| `GET` | `/api/admin/me` | Current authenticated admin |
| `POST` | `/api/projects` | Create new project with title, price, tags, image |
| `GET` | `/api/projects/{id}` | Show project |
| `PUT` | `/api/projects/{id}` | Update project details, price, active status |
| `DELETE` | `/api/projects/{id}` | Delete project |
| `GET` | `/api/chatbot-config` | Get AI System Prompt, Company Info, Pricing Context |
| `PUT` | `/api/chatbot-config` | Save updated AI System Prompt & Knowledge Base |

---

## 🤖 Dynamic OpenAI Chat Flow
Whenever a client asks a question on `/api/chat`, the controller:
1. Loads the latest **Chatbot Knowledge Base** (`system_prompt`, `company_info`, `pricing_context`) from the database.
2. Loads all currently active **Projects** and their **Prices (QAR)** from the database.
3. Automatically synthesizes them into a system prompt for OpenAI `gpt-4o-mini`.
4. Returns an accurate response in Arabic or English, recommending relevant projects and directing clients to the official WhatsApp: **+974 7137 7713**.
