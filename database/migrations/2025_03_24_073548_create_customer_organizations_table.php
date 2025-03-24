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
        Schema::create('customer_organizations', function (Blueprint $table) {
            $table->id();
            $table->string('company_legal_entity_name');
            $table->string('company_address_line_1');
            $table->string('company_address_line_2')->nullable();
            $table->string('company_city');
            $table->string('company_postal_code');
            $table->string('company_country');
            $table->string('company_tax_id')->unique();
            $table->string('company_registration_id')->unique();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_organizations');
    }
};
