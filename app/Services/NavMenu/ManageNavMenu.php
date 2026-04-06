<?php

namespace App\Services\NavMenu;

use Exception;
use Illuminate\Http\RedirectResponse;
use Modules\PageBuilder\Models\UIBuilder\NavMenuItem;
use Modules\PageBuilder\Repository\NavMenu\NavMenuRepository;

class ManageNavMenu
{
    public function __construct(private readonly NavMenuRepository $navMenuRepository) {}

    /**
     * Create or update a nav menu item
     *
     * @param array{
     *  title: string,
     *  title_malayalam?: string|null,
     *  position: int,
     *  is_link: bool,
     *  link_info?: array|null,
     *  data: array{lastUUID: int, items: array<array-key, mixed>}
     * } $data
     */
    public function create(array $data): RedirectResponse
    {
        $data = $this->normalizeNavData($data);
        /**
         * @var ?NavMenuItem $alreadyExists
         */
        $alreadyExists = $this->navMenuRepository->fetchSection($data['title'])
            ->first();

        if ($alreadyExists == null) {
            return $this->addNewItem($data);
        }

        return $this->updateItem($alreadyExists->id, $data);
    }

    /**
     * Add a new nav menu item
     *
     * @param array{
     *  title: string,
     *  title_malayalam?: string|null,
     *  position: int,
     *  is_link: bool,
     *  link_info?: array|null,
     *  data: array{lastUUID: int, items: array<array-key, mixed>},
     * } $data
     */
    private function addNewItem(array $data): RedirectResponse
    {
        $data = $this->normalizeNavData($data);
        try {
            $this->navMenuRepository->create($data);
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Added Nav Menu Section: ' . $data['title']]);
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
    private function updateItem(int $menuItemId, array $data): RedirectResponse
    {
        $data = $this->normalizeNavData($data);
        try {
            $this->navMenuRepository->update($menuItemId, $data);
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Updated Nav Menu Section: ' . $data['title']]);
    }

    public function deleteSection(string $title): RedirectResponse
    {
        try {
            $this->navMenuRepository->deleteSection($title);
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Deleted Nav Menu Section: ' . $title]);
    }

    /**
     * Update a nav menu section
     *
     * @param array{
     *     title: string,
     *     title_malayalam?: string|null,
     *     position?: int,
     * } $data
     */
    public function updateSection(string $title, array $data): RedirectResponse
    {
        try {
            $this->navMenuRepository->updateSection($title, $data);
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Updated Nav Menu Section: ' . $data['title']]);
    }

    /**
     * Ensure submenu links contain safe defaults for optional fields.
     *
     * @param array{
     *   data?: array{lastUUID: int, items?: array<array-key, mixed>}
     * } $data
     * @return array
     */
    private function normalizeNavData(array $data): array
    {
        if (! isset($data['data']) || ! is_array($data['data'])) {
            return $data;
        }

        $items = $data['data']['items'] ?? [];
        foreach ($items as $i => $item) {
            if (! isset($item['links']) || ! is_array($item['links'])) {
                continue;
            }
            foreach ($item['links'] as $j => $link) {
                // description multilingual shape
                $desc = $link['description'] ?? null;
                if (! is_array($desc)) {
                    $desc = ['english' => null, 'malayalam' => null];
                } else {
                    $desc['english'] = $desc['english'] ?? null;
                    $desc['malayalam'] = $desc['malayalam'] ?? null;
                }

                // media object shape
                $media = $link['media'] ?? null;
                if (! is_array($media)) {
                    $media = [
                        'type' => null,
                        'source' => null,
                        'pathOrUrl' => null,
                        'thumbnail' => null,
                    ];
                } else {
                    $media['type'] = $media['type'] ?? null;
                    $media['source'] = $media['source'] ?? null;
                    $media['pathOrUrl'] = $media['pathOrUrl'] ?? null;
                    $media['thumbnail'] = $media['thumbnail'] ?? null;
                }

                $item['links'][$j]['description'] = $desc;
                $item['links'][$j]['media'] = $media;
            }
            $items[$i] = $item;
        }

        $data['data']['items'] = $items;
        return $data;
    }
}
