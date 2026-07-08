<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            // Original filename uploaded by user
            $table->string('original_name');

            // Filename stored on disk
            $table->string('file_name');

            // Storage path
            $table->string('file_path');

            // application/pdf
            $table->string('mime_type');

            // Bytes
            $table->unsignedBigInteger('file_size');

            // Processing status
            $table->enum('status', [
                'processing',
                'completed',
                'failed',
            ])->default('processing');

            // Optional error message
            $table->text('error')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
