<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Models\Page;

final class BlogsListController extends Controller
{
    public function __invoke(Request $request): Response
    {
        // Get featured posts (Blog, Article, Opinion types that are marked as featured)
        $featuredPosts = Page::where('published', true)
            ->where('featured', true)
            ->whereIn('type', ['Blog', 'Article', 'Opinion'])
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        // Get all posts with pagination (Blog, Article, Opinion types)
        $allPosts = Page::where('published', true)
            ->whereIn('type', ['Blog', 'Article', 'Opinion'])
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('BlogsList', [
            'featuredPosts' => $featuredPosts,
            'allPosts' => $allPosts,
        ]);
    }
}