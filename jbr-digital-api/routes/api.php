<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChatbotConfigController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
// Live Projects for website and portfolio
Route::get('/projects', [ProjectController::class, 'index']);

// AI Chatbot endpoint for clients
Route::post('/chat', [ChatController::class, 'send']);

// Contact Page submission endpoint (sends inquiry email to company)
Route::post('/contact', [ContactController::class, 'send']);

// Admin Login
Route::post('/admin/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Admin Routes (Sanctum Auth)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Admin Auth Actions
    Route::post('/admin/logout', [AuthController::class, 'logout']);
    Route::get('/admin/me', [AuthController::class, 'me']);

    // Image Upload
    Route::post('/upload', [UploadController::class, 'upload']);

    // Projects CRUD Management
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::get('/projects/{project}', [ProjectController::class, 'show']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    // Chatbot Knowledge Base & Configuration
    Route::get('/chatbot-config', [ChatbotConfigController::class, 'show']);
    Route::put('/chatbot-config', [ChatbotConfigController::class, 'update']);
});
