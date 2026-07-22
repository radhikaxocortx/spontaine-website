<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Models\Page;

final class HomePageController extends Controller
{
    public function __invoke(Request $request): Response
    {
        // Get featured posts with videos for the video section
        $featuredVideoPosts = Page::where('published', true)
            ->where('featured', true)
            ->whereIn('type', ['Blog', 'Article', 'Opinion'])
            ->whereNotNull('preview_video')
            ->where('preview_video', '!=', '')
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get();

        // Get featured blog posts for the blogs carousel
        $featuredBlogs = Page::where('published', true)
            ->where('featured', true)
            ->where('type', 'Blog')
            ->orderBy('created_at', 'desc')
            ->limit(10) // Get more than 3 in case some don't have images
            ->get();

        return Inertia::render('HomePage', [
            'featuredVideoPosts' => $featuredVideoPosts,
            'featuredBlogs' => $featuredBlogs,
        ])->withViewData([
            'seo' => [
                'title' => 'Governed AI Data Infrastructure for Professional Services',
                'description' => "Spontaine turns your firm's data and judgment into governed intelligence you own - one system orchestrating client delivery, workflows, dashboards, and outputs.",
                'image' => rtrim((string) config('app.url'), '/') . '/storage/images/8205df31-7880-4c23-902d-6b222d8174b5.png',
                'url' => $request->fullUrl(),
                'type' => 'website',
                'noIndex' => false,
            ],
        ]);
    }
}
