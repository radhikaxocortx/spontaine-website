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
        Schema::create('entity_template_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('group_number')->default(1);
            $table->string('description')->nullable();
            $table->foreignId('entity_template_id')
                ->constrained('entity_templates');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entity_template_groups');
    }
};
