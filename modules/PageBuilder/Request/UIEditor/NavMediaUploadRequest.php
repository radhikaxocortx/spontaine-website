<?php

declare(strict_types=1);

namespace Modules\PageBuilder\Request\UIEditor;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $type
 * @property \Illuminate\Http\UploadedFile $file
 */
final class NavMediaUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $rules = [
            'type' => ['required', 'in:image,video'],
            'file' => ['required', 'file', 'max:20480'], // up to ~20MB
        ];

        if (($this->input('type') ?? '') === 'image') {
            $rules['file'][] = 'mimes:jpeg,png,webp';
        } elseif (($this->input('type') ?? '') === 'video') {
            $rules['file'][] = 'mimetypes:video/avi,video/mpeg,video/mp4,video/quicktime';
        }

        return $rules;
    }
}
