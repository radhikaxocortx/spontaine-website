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
        Schema::table('payment_details', function (Blueprint $table) {
            $table->string('payment_method')->nullable();
            $table->foreignId('coupon_id')->nullable()->constrained('coupons');
            $table->float('discount_amount')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payment_details', function (Blueprint $table) {
            $table->dropColumn('payment_method');
            $table->dropColumn('coupon_id');
            $table->dropColumn('discount_amount');
        });
    }
};
