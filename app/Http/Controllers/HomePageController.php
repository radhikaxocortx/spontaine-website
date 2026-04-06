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
                'title' => 'No-Code Data Integration & AI Platform for Enterprise',
                'description' => "Transform your disconnected systems into an AI-driven command center with Spontaine's no-code data integration platform. Get real-time insights, eliminate data silos, and enable AI adoption across your organization - all in weeks, not quarters.",
                'image' => rtrim((string) config('app.url'), '/') . '/storage/images/16.png',
                'url' => $request->fullUrl(),
                'type' => 'website',
                'noIndex' => false,
            ],
        ]);
    }
}
