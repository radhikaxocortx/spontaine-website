<?php

namespace Modules\PageBuilder\Controllers;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Models\Document;
use Modules\PageBuilder\Repository\Media\ManageMediaRepository;
use Modules\PageBuilder\Request\ManageMediaUploadRequest;
use Modules\PageBuilder\Services\Media\UploadMediaService;
use Throwable;

class ManageMediaController extends Controller
{
    public function __construct(
        private readonly ManageMediaRepository $mediaRepository,
        private readonly UploadMediaService $uploadMediaService,
    ) {}

    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Document::class);

        $type = $request->string('type')->toString();
        $search = trim((string) $request->query('search', ''));

        $activeType = in_array($type, ['all', 'document', 'image', 'video'], true) ? $type : 'all';

        $media = $this->mediaRepository->paginate($request, $activeType, $search);

        return Inertia::render('PageBuilder/ManageMediaPage', [
            'media' => $media,
            'filters' => [
                'type' => $activeType,
                'search' => $search,
            ],
            'typeOptions' => [
                ['value' => 'all', 'label' => 'All'],
                ['value' => 'document', 'label' => 'Document'],
                ['value' => 'image', 'label' => 'Image'],
                ['value' => 'video', 'label' => 'Video'],
            ],
        ]);
    }

    /**
     * @throws Throwable
     */
    public function upload(ManageMediaUploadRequest $request): RedirectResponse
    {
        Gate::authorize('create', Document::class);

        $type = (string) $request->input('type');

        try {
            $user = Auth::user();

            $this->uploadMediaService->upload(
                $type,
                (string) $request->input('name'),
                $request->file('file'),
                $user?->id,
            );

            return redirect()
                ->route('manage-media.index', [
                    'type' => $request->input('filter_type', 'all'),
                    'search' => $request->input('search', ''),
                ])
                ->with(['message' => ucfirst($type) . ' uploaded successfully.']);
        } catch (Throwable $exception) {
            throw $exception;
        }
    }

    public function destroy(Request $request, string $type, int $id): RedirectResponse
    {
        $record = $this->mediaRepository->findByTypeOrFail($type, $id);

        Gate::authorize('delete', $record);

        $record->delete();

        return redirect()
            ->route('manage-media.index', [
                'type' => $request->query('type', 'all'),
                'search' => $request->query('search', ''),
            ])
            ->with(['message' => ucfirst($type) . ' deleted successfully.']);
    }

    public function file(Request $request, string $type, string $key): BinaryFileResponse
    {
        abort_unless(preg_match('/^[A-Za-z0-9._-]+$/', $key) === 1, 404);

        $record = $this->mediaRepository->findByTypeAndFileKeyOrFail($type, $key);
        $relativePath = ltrim((string) $record->url, '/');

        if (str_starts_with($relativePath, 'storage/')) {
            $relativePath = substr($relativePath, 8);
        }

        abort_if($relativePath === '' || !Storage::disk('public')->exists($relativePath), 404);

        $absolutePath = Storage::disk('public')->path($relativePath);
        $mime = (string) $record->mime;
        $extension = $this->resolveExtension($mime, (string) $record->url);
        $downloadName = $this->buildDownloadName((string) $record->name, $extension);

        if ($request->boolean('download')) {
            return response()->download($absolutePath, $downloadName, [
                'Content-Type' => $mime,
            ]);
        }

        return response()->file($absolutePath, [
            'Content-Type' => $mime,
            'Content-Disposition' => 'inline; filename="' . $downloadName . '"',
        ]);
    }

    private function buildDownloadName(string $name, string $extension): string
    {
        $base = trim($name);

        if ($base === '') {
            $base = 'file';
        }

        // Remove characters that are not valid in common filesystem filenames.
        $base = preg_replace('/[\\\\\/:*?"<>|\x00-\x1F]+/', '_', $base) ?? 'file';

        if ($base === '') {
            $base = 'file';
        }

        $suffix = '.' . strtolower($extension);

        if (strtolower(substr($base, -strlen($suffix))) === $suffix) {
            return $base;
        }

        return $base . $suffix;
    }

    private function resolveExtension(string $mime, string $storedUrl): string
    {
        $fromUrl = pathinfo($storedUrl, PATHINFO_EXTENSION);

        if ($fromUrl !== '') {
            return strtolower($fromUrl);
        }

        return match ($mime) {
            'application/pdf' => 'pdf',
            'application/msword' => 'doc',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
            'application/vnd.ms-excel' => 'xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xlsx',
            'application/vnd.ms-powerpoint' => 'ppt',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation' => 'pptx',
            'text/plain' => 'txt',
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
            'image/avif' => 'avif',
            'video/mp4' => 'mp4',
            'video/webm' => 'webm',
            'video/quicktime' => 'mov',
            default => 'bin',
        };
    }
}
