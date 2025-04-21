<?php

namespace Modules\PageBuilder\Repository\NavMenu;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Modules\PageBuilder\Models\UIBuilder\NavMenuItem;

class NavMenuRepository
{
    const MENU_CACHE_KEY = 'nav.all';

    private function forgetCachedMenu(): void
    {
        cache()->forget(self::MENU_CACHE_KEY);
    }

    /**
     * @return Builder<NavMenuItem>
     */
    public function fetchSection(string $section): Builder
    {
        return NavMenuItem::where('section', $section);
    }

    /**
     * Undocumented function
     *
     * @param array{
     *  section: string,
     *  section_malayalam?: string|null,
     *  data: array{lastUUID: int, items?: array<array-key, mixed>},
     * } $data
     */
    public function create(array $data): NavMenuItem
    {
        $this->forgetCachedMenu();
        if (! isset($data['data']['items'])) {
            $data['data']['items'] = [];
        }

        return NavMenuItem::create([
            'section' => $data['section'],
            'section_malayalam' => $data['section_malayalam'] ?? '',
            'items' => $data['data'],
            'created_by' => request()->user()?->id,
            'updated_by' => request()->user()?->id,
        ]);
    }

    /**
     * @param array{
     *  section: string,
     *  section_malayalam?: string|null,
     *  data: array{lastUUID: int, items: array<array-key, mixed>},
     * } $data
     */
    public function update(int $itemId, array $data): int
    {
        $this->forgetCachedMenu();

        return NavMenuItem::where('id', $itemId)
            ->update([
                'section' => $data['section'],
                'items' => $data['data'],
                'updated_by' => request()->user()?->id,
            ]);
    }

    public function deleteSection(string $section): int
    {
        $this->forgetCachedMenu();

        return NavMenuItem::where('section', $section)
            ->update([
                'deleted_at' => now(),
                'updated_by' => request()->user()?->id,
            ]);
    }

    /**
     * @param array{
     *     section: string,
     *     section_malayalam?: string|null,
     * } $data
     */
    public function updateSection(string $section, array $data): int
    {
        $this->forgetCachedMenu();

        return NavMenuItem::where('section', $section)
            ->update([
                'section' => $data['section'],
                'section_malayalam' => $data['section_malayalam'] ?? '',
                'updated_by' => request()->user()?->id,
            ]);
    }

    /**
     * get section list
     *
     * @return Collection<NavMenuItem>
     */
    public function sectionList(): Collection
    {
        return NavMenuItem::select('section')
            ->get();
    }

    public function getAll(): Collection
    {
        return cache()->remember(self::MENU_CACHE_KEY, 3600, function () {
            return NavMenuItem::all();
        });
    }
}
