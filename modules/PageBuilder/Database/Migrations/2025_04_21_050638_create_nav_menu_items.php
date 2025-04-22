<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nav_menu_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('position');
            $table->string('title');
            $table->string('title_malayalam')->nullable();
            $table->boolean('is_link')->default(0);
            $table->json('link_info')->nullable();
            $table->json('items');
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nav_menu_items');
    }
};
