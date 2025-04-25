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
        Schema::create('workflow_module_verifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_workflow_id')->constrained('customer_price_plans');
            $table->foreignId('module_id')->constrained('entity_templates');
            $table->string('status')->nullable();
            $table->string('customer_notes')->nullable();
            $table->string('internal_notes')->nullable();
            $table->string('verification_date')->nullable();
            $table->boolean('allow_update')->default(false);
            $table->boolean('customer_updated')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workflow_module_verifications');
    }
};
