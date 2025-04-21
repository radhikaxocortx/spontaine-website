<?php

namespace Modules\PageBuilder\Controllers\NavEditor;

use App\Http\Controllers\Controller;
use App\Http\Requests\RenameNavSectionRequest;
use App\Http\Requests\UIEditor\NavMenuFormRequest;
use App\Services\NavMenu\ManageNavMenu;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Repository\NavMenu\NavMenuRepository;

class NavEditorController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            'auth',
        ];
    }

    public function index(NavMenuRepository $navMenuRepository): Response
    {
        return Inertia::render('PageBuilder/NavEditorPage', [
            'sections' => $navMenuRepository->sectionList(),
        ]);
    }

    public function store(NavMenuFormRequest $request, ManageNavMenu $navMenuItemCreate): RedirectResponse
    {

        $validated = $request->validated();

        return $navMenuItemCreate->create($validated);
    }

    public function show(string $section, NavMenuRepository $navMenuRepository): JsonResponse
    {

        $navMenu = $navMenuRepository->fetchSection($section)->first();

        return response()
            ->json([
                'section' => $navMenu,
            ]);
    }

    public function update(
        string $section,
        RenameNavSectionRequest $request,
        ManageNavMenu $navMenuItemCreate
    ): RedirectResponse {

        $validated = $request->validated();

        return $navMenuItemCreate->updateSection($section, $validated);
    }

    public function destroy(string $section, ManageNavMenu $navMenuItemCreate): RedirectResponse
    {

        return $navMenuItemCreate->deleteSection($section);
    }
}
