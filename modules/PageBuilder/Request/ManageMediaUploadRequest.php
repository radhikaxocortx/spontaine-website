<?php

namespace Modules\PageBuilder\Request;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class ManageMediaUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', Rule::in(['document', 'image', 'video'])],
            'filter_type' => ['nullable', 'string', Rule::in(['all', 'document', 'image', 'video'])],
            'search' => ['nullable', 'string', 'max:255'],
            'file' => array_merge(['required', 'file'], $this->typeSpecificFileRules()),
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $file = $this->file('file');

            if (!$file instanceof UploadedFile) {
                return;
            }

            $detectedMime = $this->detectMimeType($file);
            $allowed = $this->allowedMimeTypesByType((string) $this->input('type'));

            if ($detectedMime === null || !in_array($detectedMime, $allowed, true)) {
                $validator->errors()->add('file', 'The uploaded file content does not match the selected media type.');
            }
        });
    }

    /**
     * @return array<int, string>
     */
    private function typeSpecificFileRules(): array
    {
        return match ($this->input('type')) {
            'document' => ['max:20480', 'mimetypes:application/pdf'],
            'video' => ['max:51200', 'mimetypes:video/mp4'],
            default => ['max:5120', 'mimetypes:image/jpeg,image/png,image/webp'],
        };
    }

    /**
     * @return array<int, string>
     */
    private function allowedMimeTypesByType(string $type): array
    {
        return match ($type) {
            'document' => ['application/pdf'],
            'video' => ['video/mp4'],
            default => ['image/jpeg', 'image/png', 'image/webp'],
        };
    }

    private function detectMimeType(UploadedFile $file): ?string
    {
        $path = $file->getPathname();

        if ($path === '' || !is_file($path)) {
            return null;
        }

        $finfo = finfo_open(FILEINFO_MIME_TYPE);

        if ($finfo === false) {
            return null;
        }

        $mime = finfo_file($finfo, $path);
        finfo_close($finfo);

        return is_string($mime) ? $mime : null;
    }
}
