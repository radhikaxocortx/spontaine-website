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
        Schema::create('entity_template_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('entity_template_group_id')
                ->constrained('entity_template_groups');

            $table->unsignedInteger('field_number')->default(1);

            $table->string('field_name');
            $table->string('type');
            $table->string('default_value')->nullable();

            $table->string('domain')->nullable();
            $table->string('parameter')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entity_template_items');
    }
};
