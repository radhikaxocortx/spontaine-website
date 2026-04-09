<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Models\Page;

final class BlogsListController extends Controller
{
    private const LIST_SEO_TITLE = 'Blogs | Spontaine';
    private const LIST_SEO_DESCRIPTION = 'Read insights, opinions, and product thinking from the Spontaine team on data, AI, and decision intelligence.';
    private const LIST_SEO_IMAGE = '/storage/images/0f631aea-7147-4194-97b4-e0aa74e10c49.png';

    public function __invoke(Request $request): Response
    {
        return $this->renderBlogsList($request);
    }

    public function showBlog(Request $request, string $slug): Response
    {
        // Find the blog post by slug
        $post = Page::where('published', true)
            ->whereIn('type', ['Blog', 'Article', 'Opinion'])
            ->where(function ($query) use ($slug) {
                $query->where('url', $slug)
                    ->orWhere('url', "/{$slug}")
                    ->orWhere('url', "/blog/{$slug}");
            })
            ->firstOrFail();

        // Render the dedicated blog page
        $title = (string) ($post->title ?? config('app.name', 'Spontaine'));
        $description = (string) ($post->description ?? '');

        return Inertia::render('BlogPage', [
            'post' => $post,
        ])->withViewData([
            'seo' => [
                'title' => $title,
                'description' => $description,
                'image' => $this->toAbsoluteImage($post->cover_image ?? $post->preview_image),
                'url' => $request->fullUrl(),
                'type' => 'article',
                'noIndex' => false,
            ],
        ]);
    }

    private function renderBlogsList(Request $request, ?string $selectedBlogSlug = null): Response
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
            'selectedBlogSlug' => $selectedBlogSlug,
        ])->withViewData([
            'seo' => [
                'title' => self::LIST_SEO_TITLE,
                'description' => self::LIST_SEO_DESCRIPTION,
                'image' => $this->toAbsoluteImage(self::LIST_SEO_IMAGE),
                'url' => $request->fullUrl(),
                'type' => 'website',
                'noIndex' => false,
            ],
        ]);
    }

    private function toAbsoluteImage(?string $image): string
    {
        $fallback = rtrim((string) config('app.url'), '/') . '/storage/images/16.png';

        if ($image === null || trim($image) === '') {
            return $fallback;
        }

        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://')) {
            return $image;
        }

        return rtrim((string) config('app.url'), '/') . '/' . ltrim($image, '/');
    }
}
