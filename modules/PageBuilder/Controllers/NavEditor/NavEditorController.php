<?php

namespace Modules\PageBuilder\Controllers\NavEditor;

use App\Http\Controllers\Controller;
use App\Services\NavMenu\ManageNavMenu;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Models\UIBuilder\NavMenuItem;
use Modules\PageBuilder\Repository\NavMenu\NavMenuRepository;
use Modules\PageBuilder\Request\UIEditor\NavMenuFormRequest;
use Modules\PageBuilder\Request\UIEditor\UpdateNavMenuFormRequest;

class NavEditorController extends Controller implements HasMiddleware
{
    /**
     * @return string[]
     */
    public static function middleware(): array
    {
        return [
            'auth',
        ];
    }

    public function index(NavMenuRepository $navMenuRepository): Response
    {
        return Inertia::render('PageBuilder/NavEditorPage', [
            'menuItems' => $navMenuRepository->sectionList(),
        ]);
    }

    public function store(NavMenuFormRequest $request, ManageNavMenu $navMenuItemCreate): RedirectResponse
    {
        $validated = $request->validated();

        return $navMenuItemCreate->create($validated);
    }

    public function show(string $title, NavMenuRepository $navMenuRepository): JsonResponse
    {
        $navMenu = $navMenuRepository->fetchSection($title)->first();

        return response()
            ->json([
                'section' => $navMenu,
            ]);
    }

    public function update(
        int $id,
        UpdateNavMenuFormRequest $request
    ): RedirectResponse {
        $validated = $request->validated();

        try {
            NavMenuItem::where('id', $id)
                ->update($validated);
        } catch (Exception $e) {
            return redirect()->back()
                ->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()
            ->with([
                'message' => 'Updated Nav Menu Section: '.$validated['title'],
            ]);
    }

    public function destroy(int $id): RedirectResponse
    {
        try {
            NavMenuItem::where('id', $id)
                ->update([
                    'deleted_at' => now(),
                    'updated_by' => request()->user()?->id,
                ]);
        } catch (Exception $e) {
            return redirect()->back()
                ->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()
            ->with(['message' => 'Deleted Nav Menu Section']);
    }
}
