<?php

namespace Modules\PageBuilder\Services\Media;

use App\Libs\SaveFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Modules\PageBuilder\Models\Document;
use Modules\PageBuilder\Models\Image;
use Modules\PageBuilder\Models\Video;
use Modules\PageBuilder\Repository\Media\ManageMediaRepository;
use Throwable;

class UploadMediaService
{
    use SaveFile;

    public function __construct(
        private readonly ManageMediaRepository $mediaRepository
    ) {}

    /**
     * @throws Throwable
     */
    public function upload(string $type, string $name, UploadedFile $file, ?int $userId): Document|Image|Video
    {
        [$modelClass, $folder] = $this->mediaRepository->typeConfig($type);

        return DB::transaction(function () use ($modelClass, $folder, $name, $file, $userId) {
            /** @var Document|Image|Video $record */
            $record = $modelClass::create([
                'name' => $name,
                'mime' => $file->getMimeType(),
                'created_by' => $userId,
                'updated_by' => $userId,
            ]);

            $filePath = $this->saveSecure($file, $folder);

            if ($filePath === '') {
                throw new \RuntimeException('Failed to upload media.');
            }

            $record->url = $filePath;
            $record->save();

            return $record;
        });
    }
}
