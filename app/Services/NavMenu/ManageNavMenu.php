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
     * Undocumented function
     *
     * @param array{
     *  section: string,
     *  section_malayalam?: string|null,
     *  data: array{lastUUID: int, items: array<array-key, mixed>},
     * } $data
     */
    public function create(array $data): RedirectResponse
    {
        /**
         * @var ?NavMenuItem $alreadyExists
         */
        $alreadyExists = $this->navMenuRepository->fetchSection($data['section'])
            ->first();

        if ($alreadyExists == null) {
            return $this->addNewItem($data);
        }

        return $this->updateItem($alreadyExists->id, $data);
    }

    /**
     * Undocumented function
     *
     * @param array{
     *  section: string,
     *  section_malayalam?: string|null,
     *  data: array{lastUUID: int, items: array<array-key, mixed>},
     * } $data
     */
    private function addNewItem(array $data): RedirectResponse
    {
        try {
            $this->navMenuRepository->create($data);
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Added Nav Menu Section: '.$data['section']]);
    }

    /**
     * Undocumented function
     *
     * @param array{
     *  section: string,
     *  section_malayalam?: string|null,
     *  data: array{lastUUID: int, items: array<array-key, mixed>},
     * } $data
     */
    private function updateItem(int $menuItemId, array $data): RedirectResponse
    {
        try {
            $this->navMenuRepository->update($menuItemId, $data);
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Updated Nav Menu Section: '.$data['section']]);
    }

    public function deleteSection(string $section): RedirectResponse
    {
        try {
            $this->navMenuRepository->deleteSection($section);
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Deleted Nav Menu Section: '.$section]);
    }

    /**
     * @param array{
     *     section: string,
     *     section_malayalam?: string|null,
     * } $data
     */
    public function updateSection(string $section, array $data): RedirectResponse
    {
        try {
            $this->navMenuRepository->updateSection($section, $data);
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Updated Nav Menu Section: '.$section]);
    }
}
