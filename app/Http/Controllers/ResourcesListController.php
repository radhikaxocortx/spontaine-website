<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Models\Page;

final class ResourcesListController extends Controller
{
    /** @var array<int, string> */
    private const RESOURCE_TYPES = ['Whitepapers', 'Use Cases', 'Case Studies'];
    private const LIST_SEO_TITLE = 'Resources | Spontaine';
    private const LIST_SEO_DESCRIPTION = 'Explore Spontaine resources: case studies, whitepapers, and practical guides for faster AI-powered business decisions.';
    private const LIST_SEO_IMAGE = '/storage/images/27417a93-39e7-49cb-82f0-3ccfbeb41d63.png';

    public function __invoke(Request $request): Response
    {
        return $this->renderResourcesList($request);
    }

    public function showResource(Request $request, string $slug): Response
    {
        $post = Page::where('published', true)
            ->whereIn('type', self::RESOURCE_TYPES)
            ->where(function ($query) use ($slug) {
                $query->where('url', $slug)
                    ->orWhere('url', "/{$slug}")
                    ->orWhere('url', "/resources/{$slug}")
                    ->orWhere('url', "/resource/{$slug}");
            })
            ->firstOrFail();

        $title = (string) ($post->title ?? config('app.name', 'Spontaine'));
        $description = (string) ($post->description ?? '');

        return Inertia::render('ResourcePage', [
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

    private function renderResourcesList(Request $request, ?string $selectedResourceSlug = null): Response
    {
        $resourceTabs = collect(self::RESOURCE_TYPES)
            ->map(static fn(string $type): array => [
                'type' => $type,
                'count' => Page::where('published', true)->where('type', $type)->count(),
            ])
            ->values();

        /** @var array<int, string> $availableResourceTypes */
        $availableResourceTypes = $resourceTabs
            ->filter(static fn(array $tab): bool => $tab['count'] > 0)
            ->pluck('type')
            ->values()
            ->all();

        $requestedType = $request->query('type');
        $activeResourceType = is_string($requestedType) && in_array($requestedType, $availableResourceTypes, true)
            ? $requestedType
            : ($availableResourceTypes[0] ?? null);

        $featuredPosts = Page::where('published', true)
            ->where('featured', true)
            ->whereIn('type', self::RESOURCE_TYPES)
            ->orderBy('created_at', 'desc')
            ->limit(1)
            ->get();

        $allPostsQuery = Page::where('published', true)
            ->whereIn('type', self::RESOURCE_TYPES)
            ->orderBy('created_at', 'desc');

        if (is_string($activeResourceType)) {
            $allPostsQuery->where('type', $activeResourceType);
        }

        $allPosts = $allPostsQuery
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('ResourcesList', [
            'featuredPosts' => $featuredPosts,
            'allPosts' => $allPosts,
            'resourceTabs' => $resourceTabs,
            'activeResourceType' => $activeResourceType,
            'selectedResourceSlug' => $selectedResourceSlug,
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
