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
                // Keep in sync with StaticHomePageV3.tsx: link-preview scrapers read these, not the client-side tags.
                'title' => 'Unify your operational stack and unlock working AI in weeks',
                'description' => 'Professional services and industrial operations don\'t fail at AI for lack of ambition. Their data is trapped in legacy ERPs, machines, time tools and CRMs. Spontaine unifies your stack in place in four weeks.',
                'image' => rtrim((string) config('app.url'), '/').'/images/home/home-share.jpg',
                'url' => $request->fullUrl(),
                'type' => 'website',
                'noIndex' => false,
            ],
        ]);
    }
}
