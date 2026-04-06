<?php

namespace Modules\PageBuilder\Controllers;

use App\Http\Controllers\Controller;
use App\Libs\SaveFile;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Models\Page;
use Modules\PageBuilder\Request\PageBuilderFormRequest;

class PagesController extends Controller
{
    use SaveFile;

    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $type = trim((string) $request->query('type', ''));
        $published = $request->query('published');
        $featured = $request->query('featured');

        $pages = Page::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('title', 'like', '%' . $search . '%')
                        ->orWhere('page_title', 'like', '%' . $search . '%')
                        ->orWhere('description', 'like', '%' . $search . '%');
                });
            })
            ->when($type !== '', function ($query) use ($type) {
                $query->where('type', $type);
            })
            ->when($published !== null && $published !== '', function ($query) use ($published) {
                $query->where('published', filter_var($published, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? (bool) $published);
            })
            ->when($featured !== null && $featured !== '', function ($query) use ($featured) {
                $query->where('featured', filter_var($featured, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? (bool) $featured);
            })
            ->latest()
            ->get();

        return Inertia::render('PageBuilder/PageBuilderIndex', [
            'pages' => $pages,
            'filters' => [
                'search' => $search,
                'type' => $type,
                'published' => $published !== null ? (string) $published : '',
                'featured' => $featured !== null ? (string) $featured : '',
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('PageBuilder/PageBuilderCreate');
    }

    public function store(PageBuilderFormRequest $request): RedirectResponse
    {
        try {

            $previewImagePath = null;
            $coverImagePath = null;
            $previewVideoPath = null;

            if ($request->previewImage) {
                $previewImagePath = $this->saveSecure(
                    $request->previewImage,
                    'page_previews'
                );
            }

            if ($request->previewVideo) {
                $previewVideoPath = $this->saveSecure(
                    $request->previewVideo,
                    'page_preview_videos'
                );
            }

            if ($request->coverImage) {
                $coverImagePath = $this->saveSecure(
                    $request->coverImage,
                    'page_cover_images'
                );
            }

            $record = Page::create([
                ...$request->all(),
                'preview_image' => $previewImagePath,
                'cover_image' => $coverImagePath,
                'preview_video' => $previewVideoPath,
                'download_url' => $request->downloadUrl,
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
            $record = Page::findOrFail($id);

            $previewImagePath = $record->preview_image;
            $coverImagePath = $record->cover_image;
            $previewVideoPath = $record->preview_video;

            if ($request->previewImage) {
                $previewImagePath = $this->saveSecure(
                    $request->previewImage,
                    'page_previews'
                );
            }

            if ($request->previewVideo) {
                $previewVideoPath = $this->saveSecure(
                    $request->previewVideo,
                    'page_preview_videos'
                );
            }

            if ($request->coverImage) {
                $coverImagePath = $this->saveSecure(
                    $request->coverImage,
                    'page_cover_images'
                );
            }

            $record->update([
                ...$request->all(),
                'preview_image' => $previewImagePath,
                'cover_image' => $coverImagePath,
                'preview_video' => $previewVideoPath,
                'download_url' => $request->downloadUrl,
            ]);
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
