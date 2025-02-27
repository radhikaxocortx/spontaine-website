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
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('page_title')->nullable();
            $table->text('description')->nullable();
            $table->string('url')->nullable();
            $table->fullText('title');
            $table->fullText('description');
            $table->json('blocks')->nullable();
            $table->longText('block_content')->nullable();
            $table->longText('block_content_mal')->nullable();
            $table->fullText('block_content');
            $table->fullText('block_content_mal')->language('malayalam');
            $table->boolean('published')->default(0);
            $table->string('type')->default('Page');
            $table->string('preview_image')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
