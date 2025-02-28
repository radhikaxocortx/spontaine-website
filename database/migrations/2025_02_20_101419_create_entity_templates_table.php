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
        Schema::create('entity_templates', function (Blueprint $table) {
            $table->id();
            $table->integer('sequence');
            $table->string('name');
            $table->string('description');
            $table->foreignId('workflow_id')->constrained('workflows');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entity_templates');
    }
};
