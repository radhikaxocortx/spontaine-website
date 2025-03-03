<?php

namespace Modules\PageBuilder\Controllers;

use App\Http\Controllers\Controller;
use App\Libs\SaveFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\PageBuilder\Models\Video;
use Modules\PageBuilder\Request\VideoUploadRequest;
use Throwable;

class VideoUploadController extends Controller
{
    use SaveFile;

    /**
     * @throws Throwable
     */
    public function __invoke(VideoUploadRequest $request): JsonResponse
    {
        $user = Auth::user();
        DB::beginTransaction();
        $video = Video::create([
            'name' => $request->name,
            'mime' => $request->file->getMimeType(),
            'created_by' => $user?->id,
            'updated_by' => $user?->id,
        ]);

        if ($video == null) {
            DB::rollBack();

            return response()->json(['created' => false, 'message' => 'Failed To Upload Image']);
        }

        $fileName = $this->save($request->file, $video->id, 'videos');

        if ($fileName == '') {
            DB::rollBack();

            return response()->json(['created' => false, 'message' => 'Failed To Upload Image']);
        }

        $video->url = $fileName;
        $video->save();

        DB::commit();

        return response()->json([
            'created' => true,
            'message' => 'Video Uploaded',
            'record' => Video::find($video->id),
        ]);
    }
}
