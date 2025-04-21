<?php

namespace Modules\PageBuilder\Repository\NavMenu;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Modules\PageBuilder\Models\UIBuilder\NavMenuItem;

class NavMenuRepository
{
    /**
     * @return Builder<NavMenuItem>
     */
    public function fetchSection(string $title): Builder
    {
        return NavMenuItem::where('title', $title);
    }

    /**
     * Create a new nav menu item
     *
     * @param array{
     *  title: string,
     *  title_malayalam?: string|null,
     *  position: int,
     *  is_link: bool,
     *  link_info?: array|null,
     *  data: array{lastUUID: int, items?: array<array-key, mixed>},
     * } $data
     */
    public function create(array $data): NavMenuItem
    {
        if (! isset($data['data']['items'])) {
            $data['data']['items'] = [];
        }

        return NavMenuItem::create([
            'title' => $data['title'],
            'title_malayalam' => $data['title_malayalam'] ?? '',
            'position' => $data['position'],
            'is_link' => $data['is_link'],
            'link_info' => $data['is_link'] ? $data['link_info'] : null,
            'items' => $data['data'],
            'created_by' => request()->user()?->id,
            'updated_by' => request()->user()?->id,
        ]);
    }

    /**
     * Update an existing nav menu item
     *
     * @param array{
     *  title: string,
     *  title_malayalam?: string|null,
     *  position?: int,
     *  is_link?: bool,
     *  link_info?: array|null,
     *  data: array{lastUUID: int, items: array<array-key, mixed>},
     * } $data
     */
    public function update(int $itemId, array $data): int
    {

        $updateData = [
            'title' => $data['title'],
            'title_malayalam' => $data['title_malayalam'] ?? '',
            'items' => $data['data'],
            'updated_by' => request()->user()?->id,
        ];

        if (isset($data['position'])) {
            $updateData['position'] = $data['position'];
        }

        if (isset($data['is_link'])) {
            $updateData['is_link'] = $data['is_link'];
            $updateData['link_info'] = $data['is_link'] && isset($data['link_info']) ? $data['link_info'] : null;
        }

        return NavMenuItem::where('id', $itemId)
            ->update($updateData);
    }

    public function deleteSection(string $title): int
    {

        return NavMenuItem::where('title', $title)
            ->update([
                'deleted_at' => now(),
                'updated_by' => request()->user()?->id,
            ]);
    }

    /**
     * @param array{
     *     title: string,
     *     title_malayalam?: string|null,
     *     position?: int,
     * } $data
     */
    public function updateSection(string $title, array $data): int
    {

        $updateData = [
            'title' => $data['title'],
            'title_malayalam' => $data['title_malayalam'] ?? '',
            'updated_by' => request()->user()?->id,
        ];

        if (isset($data['position'])) {
            $updateData['position'] = $data['position'];
        }

        return NavMenuItem::where('title', $title)
            ->update($updateData);
    }

    /**
     * get section list
     *
     * @return Collection<NavMenuItem>
     */
    public function sectionList(): Collection
    {
        return NavMenuItem::select(
            'id',
            'title',
            'title_malayalam',
            'is_link',
            'link_info',
            'position'
        )
            ->orderBy('position', 'asc')
            ->get();
    }

    public function getAll(): Collection
    {
        return NavMenuItem::orderBy('position', 'asc')->get();
    }
}
