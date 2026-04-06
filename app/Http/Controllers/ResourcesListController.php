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

        return Inertia::render('ResourcePage', [
            'post' => $post,
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
        ]);
    }
}
