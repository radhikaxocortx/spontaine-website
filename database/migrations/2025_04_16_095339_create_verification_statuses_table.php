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
        Schema::create('verification_statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_workflow_id')->constrained('customer_price_plans');
            $table->string('status')->nullable();
            $table->string('notes')->nullable();
            $table->string('customer_notes')->nullable();
            $table->string('kadodo_id')->nullable();
            $table->date('status_date')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verification_statuses');
    }
};
