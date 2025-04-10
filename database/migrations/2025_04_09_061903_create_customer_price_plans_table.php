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
        Schema::create('customer_price_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->unique();
            $table->foreignId('price_plan_id')->constrained('price_plans');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_price_plans');
    }
};
