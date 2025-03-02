<?php

namespace Modules\PageBuilder\Controllers;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Models\Page;
use Modules\PageBuilder\Request\PageBuilderFormRequest;

class PagesController extends Controller
{
    public function index(): Response
    {
        $pages = Page::all();

        return Inertia::render('PageBuilder/PageBuilderIndex', [
            'pages' => $pages,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('PageBuilder/PageBuilderCreate');
    }

    public function store(PageBuilderFormRequest $request): RedirectResponse
    {
        try {
            $record = Page::create([
                ...$request->all(),
                'blocks' => [
                    'lastUUID' => 1,
                    'blocks' => [],
                ],
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('pages.index')
            ->with(['message' => 'Page Builder Created Successfully']);
    }

    public function show(string $id): Response
    {
        return Inertia::render('PageBuilder/UIBuilderPage', [
            'page' => Page::findOrFail($id),
        ]);
    }

    public function edit(string $id): Response
    {
        $page = Page::find($id);

        return Inertia::render('PageBuilder/PageBuilderEdit', [
            'page' => $page,
        ]);
    }

    public function update(PageBuilderFormRequest $request, string $id): RedirectResponse
    {
        try {
            $record = Page::find($id);
            $record->update($request->all());
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('pages.index')
            ->with(['message' => 'Page Builder Updated Successfully']);
    }

    public function destroy(string $id): RedirectResponse
    {
        try {
            $record = Page::find($id);
            $record->delete();
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('pages.index')
            ->with(['message' => 'Page Builder Deleted Successfully']);
    }
}
