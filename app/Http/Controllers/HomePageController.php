<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Models\Page;

final class HomePageController extends Controller
{
    public function __invoke(): Response
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

        return Inertia::render('HomePage', [
            'featuredVideoPosts' => $featuredVideoPosts,
        ]);
    }
}
