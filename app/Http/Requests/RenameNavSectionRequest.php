<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class UpdateNavSectionNameRequest
 *
 * @property string $section
 * @property ?string $section_malayalam
 *
 * @method array{
 * section: string,
 * section_malayalam?: string|null,
 * } validated()
 */
class RenameNavSectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, string[]>
     */
    public function rules(): array
    {
        return [
            'section' => ['required', 'string', 'max:255'],
            'section_malayalam' => ['nullable', 'string', 'max:255'],
        ];
    }
}
