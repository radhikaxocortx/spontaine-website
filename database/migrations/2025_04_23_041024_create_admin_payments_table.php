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
        Schema::create('admin_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_workflow_id')->constrained('customer_price_plans')->unique();
            $table->foreignId('updated_by')->constrained('users');
            $table->bigInteger('amount');
            $table->string('payment_method');
            $table->string('notes');
            $table->string('payment_date');
            $table->string('accounting_reference')->uniquue();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_payments');
    }
};
