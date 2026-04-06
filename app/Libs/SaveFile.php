<?php

namespace App\Libs;

use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

trait SaveFile
{
    public function save(UploadedFile $file, string|int $name, string $folder, bool $public = true): string
    {
        try {
            $fileName = $name . '.' . $file->extension();
            if (! $public) {
                $file->storeAs(
                    $folder,
                    $fileName
                );
            } else {
                Storage::disk('public')->putFileAs(
                    $folder,
                    $file,
                    $fileName
                );
            }
        } catch (Exception $e) {
            return '';
        }

        return $public ? '/storage/' . $folder . '/' . $fileName : $fileName;
    }

    public function saveSecure(UploadedFile $file, string $folder, bool $public = true): string
    {
        try {
            $fileName = $this->generateSecureFileName();

            if (! $public) {
                $file->storeAs(
                    $folder,
                    $fileName
                );
            } else {
                Storage::disk('public')->putFileAs(
                    $folder,
                    $file,
                    $fileName
                );
            }
        } catch (Exception $e) {
            return '';
        }

        return $public ? '/storage/' . $folder . '/' . $fileName : $fileName;
    }

    private function generateSecureFileName(): string
    {
        return Str::lower(Str::random(40));
    }
}
