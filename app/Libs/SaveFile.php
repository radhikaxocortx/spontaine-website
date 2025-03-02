<?php

namespace App\Libs;

use Exception;
use Illuminate\Http\UploadedFile;

trait SaveFile
{
    public function save(UploadedFile $file, string|int $name, string $folder, bool $public = true): string
    {
        try {
            $fileName = $name.'.'.$file->extension();
            $file->storePublicly(
                $folder.'/',
                $fileName
            );
        } catch (Exception $e) {
            return '';
        }

        return $public ? '/storage/'.$folder.'/'.$fileName : $fileName;
    }
}
