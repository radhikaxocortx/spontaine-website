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
        Schema::table('pages', function (Blueprint $table) {
            if (!Schema::hasColumn('pages', 'featured')) {
                $table->boolean('featured')->default(false)->after('published');
            }
            if (!Schema::hasColumn('pages', 'preview_video')) {
                $table->string('preview_video')->nullable()->after('preview_image');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            if (Schema::hasColumn('pages', 'featured')) {
                $table->dropColumn('featured');
            }
            if (Schema::hasColumn('pages', 'preview_video')) {
                $table->dropColumn('preview_video');
            }
        });
    }
};