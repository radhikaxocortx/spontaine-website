<?php

namespace Modules\PageBuilder\Repository\Media;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Modules\PageBuilder\Models\Document;
use Modules\PageBuilder\Models\Image;
use Modules\PageBuilder\Models\Video;
use InvalidArgumentException;

class ManageMediaRepository
{
    public function paginate(Request $request, string $type, string $search, int $perPage = 12): LengthAwarePaginator
    {
        if ($type === 'all') {
            return $this->paginateAllMedia($request, $search, $perPage);
        }

        return $this->paginateByType($type, $search, $perPage);
    }

    public function findByTypeOrFail(string $type, int $id): Document|Image|Video
    {
        [$modelClass] = $this->typeConfig($type);

        return $modelClass::query()->findOrFail($id);
    }

    public function findByTypeAndFileKeyOrFail(string $type, string $fileKey): Document|Image|Video
    {
        [$modelClass] = $this->typeConfig($type);

        return $modelClass::query()
            ->where('url', 'like', '%/' . $fileKey)
            ->orWhere('url', 'like', '%/' . $fileKey . '.%')
            ->firstOrFail();
    }

    /**
     * @return array{0: class-string<Document|Image|Video>, 1: string}
     */
    public function typeConfig(string $type): array
    {
        return match ($type) {
            'document' => [Document::class, 'documents'],
            'image' => [Image::class, 'images'],
            'video' => [Video::class, 'videos'],
            default => throw new InvalidArgumentException('Invalid media type.'),
        };
    }

    private function paginateByType(string $type, string $search, int $perPage): LengthAwarePaginator
    {
        [$modelClass] = $this->typeConfig($type);

        $paginator = $modelClass::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        $paginator->setCollection(
            $paginator->getCollection()->map(fn($item) => $this->transformRecord($item, $type))
        );

        return $paginator;
    }

    private function paginateAllMedia(Request $request, string $search, int $perPage): LengthAwarePaginator
    {
        $all = collect()
            ->concat($this->recordsForType('document', $search))
            ->concat($this->recordsForType('image', $search))
            ->concat($this->recordsForType('video', $search))
            ->sortByDesc('created_at')
            ->values();

        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $offset = ($currentPage - 1) * $perPage;

        $items = $all->slice($offset, $perPage)->values();

        return new LengthAwarePaginator(
            $items,
            $all->count(),
            $perPage,
            $currentPage,
            [
                'path' => $request->url(),
                'query' => $request->query(),
            ]
        );
    }

    /**
     * @return Collection<int, array<string, mixed>>
     */
    private function recordsForType(string $type, string $search): Collection
    {
        [$modelClass] = $this->typeConfig($type);

        return $modelClass::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->latest()
            ->get()
            ->map(fn($item) => $this->transformRecord($item, $type));
    }

    /**
     * @param Document|Image|Video $record
     * @return array<string, mixed>
     */
    private function transformRecord(object $record, string $type): array
    {
        return [
            'id' => $record->id,
            'name' => $record->name,
            'url' => $record->url,
            'file_key' => $this->extractFileKey((string) $record->url),
            'mime' => $record->mime,
            'type' => $type,
            'created_at' => $record->created_at,
        ];
    }

    private function extractFileKey(string $url): string
    {
        $path = parse_url($url, PHP_URL_PATH);

        if (!is_string($path) || $path === '') {
            return '';
        }

        return basename($path);
    }
}
