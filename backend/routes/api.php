<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\front\AccountController;
use App\Http\Controllers\front\ChatController;
use App\Http\Controllers\front\DocumentController;


Route::post('/register',[AccountController::class,'register']);

Route::post('/login',[AccountController::class,'authenticate']);

Route::get('/user', function (Request $request) {
    return $request->user();

})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/chat/session', [ChatController::class, 'createSession']);

    Route::get('/chat/sessions', [ChatController::class, 'getSessions']);

    Route::get('/chat/session/{id}', [ChatController::class, 'getMessages']);

    Route::post('/chat/session/{id}/message', [ChatController::class, 'sendMessage']);

});

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/documents', [DocumentController::class, 'upload']);

    Route::get('/documents', [DocumentController::class, 'index']);

    Route::get('/documents/{id}', [DocumentController::class, 'show']);

    Route::delete('/documents/{id}', [DocumentController::class, 'destroy']);

});
