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
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->text('message', 1000);
            $table->boolean('privacy_policy');
            $table->string('receiver_mail')->nullable();
            $table->string('subject')->nullable();
            $table->boolean('general_enquiries')->nullable()->default(false);
            $table->boolean('partner_enquiries')->nullable()->default(false);
            $table->boolean('investor_enquiries')->nullable()->default(false);
            $table->boolean('career_enquiries')->nullable()->default(false);
            $table->boolean('support')->nullable()->default(false);
            $table->boolean('other')->nullable()->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};