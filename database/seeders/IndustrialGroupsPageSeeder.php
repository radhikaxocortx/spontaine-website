<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Modules\PageBuilder\Models\Page;
use RuntimeException;

/**
 * Creates the /industrial-groups page from database/seeders/data/industrial-groups-page.json.
 *
 * Run once per environment:
 *   php artisan db:seed --class=IndustrialGroupsPageSeeder
 *
 * It never overwrites a live page: if one already exists at this URL it is left alone,
 * so edits made in the page builder are safe. A soft-deleted page at the URL is restored
 * with the seed content.
 */
final class IndustrialGroupsPageSeeder extends Seeder
{
    private const DATA_FILE = __DIR__.'/data/industrial-groups-page.json';

    public function run(): void
    {
        $data = $this->loadPageData();

        DB::transaction(function () use ($data): void {
            $existing = Page::withTrashed()->where('url', $data['url'])->first();

            if ($existing !== null && ! $existing->trashed()) {
                $this->command?->info("Page /{$data['url']} already exists; left unchanged.");

                return;
            }

            if ($existing !== null) {
                $existing->restore();
                $existing->update($data);
                $this->command?->info("Restored /{$data['url']} with the seed content.");

                return;
            }

            Page::create($data);
            $this->command?->info("Created /{$data['url']}.");
        });
    }

    /**
     * @return array<string, mixed>
     */
    private function loadPageData(): array
    {
        $json = file_get_contents(self::DATA_FILE);

        if ($json === false) {
            throw new RuntimeException('Missing seed file: '.self::DATA_FILE);
        }

        /** @var array<string, mixed> $data */
        $data = json_decode($json, true, flags: JSON_THROW_ON_ERROR);

        return $data;
    }
}
