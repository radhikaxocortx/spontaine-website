<?php

declare(strict_types=1);

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
        if (! Schema::hasTable('pages')) {
            // Table not yet created; skip to avoid failure when earlier migrations haven't run.
            return; // On fresh install the create_pages_table migration will run later in sequence? (should already be earlier). Safeguard.
        }

        Schema::table('pages', function (Blueprint $table) {
            if (! Schema::hasColumn('pages', 'author')) {
                // Place after preview_video if that column exists, otherwise after preview_image.
                if (Schema::hasColumn('pages', 'preview_video')) {
                    $table->string('author')->nullable()->after('preview_video');
                } elseif (Schema::hasColumn('pages', 'preview_image')) {
                    $table->string('author')->nullable()->after('preview_image');
                } else {
                    $table->string('author')->nullable();
                }
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasTable('pages')) {
            return; // Nothing to do.
        }

        Schema::table('pages', function (Blueprint $table) {
            if (Schema::hasColumn('pages', 'author')) {
                $table->dropColumn('author');
            }
        });
    }
};
