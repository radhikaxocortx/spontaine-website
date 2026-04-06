<?php

declare(strict_types=1);

namespace Modules\PageBuilder\Controllers\NavEditor;

use App\Http\Controllers\Controller;
use App\Libs\SaveFile;
use Illuminate\Http\JsonResponse;
use Modules\PageBuilder\Request\UIEditor\NavMediaUploadRequest;

final class NavMediaUploadController extends Controller
{
    use SaveFile;

    public function __invoke(NavMediaUploadRequest $request): JsonResponse
    {
        $type = $request->input('type');
        $folder = $type === 'image' ? 'images' : 'videos';

        $file = $request->file('file');
        $path = $this->saveSecure($file, $folder, true);

        if ($path === '') {
            return response()->json([
                'created' => false,
                'message' => 'Failed to upload file',
            ], 422);
        }

        return response()->json([
            'created' => true,
            'message' => 'Media uploaded',
            'record' => [
                'url' => $path,
                'mime' => $file->getMimeType(),
                'type' => $type,
            ],
        ]);
    }
}
