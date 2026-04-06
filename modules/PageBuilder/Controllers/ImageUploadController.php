<?php

namespace Modules\PageBuilder\Controllers;

use App\Http\Controllers\Controller;
use App\Libs\SaveFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\PageBuilder\Models\Image;
use Modules\PageBuilder\Request\ImageUploadRequest;
use Throwable;

class ImageUploadController extends Controller
{
    use SaveFile;

    /**
     * @throws Throwable
     */
    public function __invoke(ImageUploadRequest $request): JsonResponse
    {
        $user = Auth::user();

        DB::beginTransaction();

        /** @var Image $image */
        $image = Image::create([
            'name' => $request->name,
            'mime' => $request->file->getMimeType(),
            'created_by' => $user?->id,
            'updated_by' => $user?->id,
        ]);

        if ($image == null) {
            DB::rollBack();

            return response()->json(['created' => false, 'message' => 'Failed To Upload Image']);
        }

        $fileName = $this->saveSecure($request->file, 'images');

        if ($fileName == '') {
            DB::rollBack();

            return response()->json(['created' => false, 'message' => 'Failed To Upload Image']);
        }

        $image->url = $fileName;
        $image->save();

        DB::commit();

        return response()->json([
            'created' => true,
            'message' => 'Image Uploaded',
            'record' => Image::find($image->id),
        ]);
    }
}
