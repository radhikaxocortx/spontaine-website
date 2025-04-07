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
        Schema::create('customer_workflows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workflow_item_id')->constrained('entity_template_items');
            $table->foreignId('customer_id')->constrained('customers');
            $table->text('value')->nullable();
            $table->double('number_value')->nullable();
            $table->date('date_value')->nullable();
            $table->string('mime_type')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_workflows');
    }
};
