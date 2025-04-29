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
        Schema::create('kadodo_i_d_s', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_priceplan_id')->constrained('customer_price_plans');
            $table->string('kadodo_id')->unique();
            $table->date('valid_from');
            $table->date('valid_to');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kadodo_i_d_s');
    }
};
