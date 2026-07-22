<?php

namespace Modules\PageBuilder\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Models\Page;

class ViewBuilderController extends Controller
{
    public function __invoke(Request $request, string $url): Response|RedirectResponse
    {
        // Redirect home requests to the static home page
        if ($url === 'home' || $url === '') {
            return redirect()->route('home');
        }

        $page = Page::where('url', $url)
            ->where('published', true)
            ->firstOrFail();

        $title = (string) ($page->page_title ?? $page->title ?? config('app.name', 'Spontaine'));
        $description = (string) ($page->description ?? '');
        $image = $this->toAbsoluteImage($page->cover_image ?? $page->preview_image);

        return Inertia::render('PageBuilder/ViewBuilderPage', [
            'page' => $page,
        ])->withViewData([
            'seo' => [
                'title' => $title,
                'description' => $description,
                'image' => $image,
                'url' => $request->fullUrl(),
                'type' => 'website',
                'noIndex' => false,
            ],
        ]);
    }

    private function toAbsoluteImage(?string $image): string
    {
        $fallback = rtrim((string) config('app.url'), '/') . '/storage/images/8205df31-7880-4c23-902d-6b222d8174b5.png';

        if ($image === null || trim($image) === '') {
            return $fallback;
        }

        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://')) {
            return $image;
        }

        return rtrim((string) config('app.url'), '/') . '/' . ltrim($image, '/');
    }
}
