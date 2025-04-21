<?php

namespace App\Http\Requests\UIEditor;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class NavMenuFormRequest
 *
 * @property string $section
 * @property ?string $section_malayalam
 * @property array{lastUUID: int, items: array<array-key, mixed>} $data
 *
 * @method array{
 * section: string,
 * section_malayalam?: string|null,
 * data: array{lastUUID: int, items: array<array-key, mixed>},
 * } validated()
 */
class NavMenuFormRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'section' => ['required', 'string', 'max:255'],
            'section_malayalam' => ['nullable', 'string', 'max:255'],
            'data' => ['required', 'array'],
            'data.lastUUID' => ['required', 'integer', 'min:0'],
            'data.items' => ['nullable', 'array'],
            'data.items.*.id' => ['required', 'integer', 'min:0'],
            'data.items.*.lastUUID' => ['required', 'integer', 'min:0'],
            'data.items.*.section.english' => ['required', 'string', 'max:255'],
            'data.items.*.section.malayalam' => ['nullable', 'string', 'max:255'],
            'data.items.*.links' => ['nullable', 'array'],
            'data.items.*.links.*.id' => ['required', 'integer', 'min:0'],
            'data.items.*.links.*.name.english' => ['required', 'string', 'max:255'],
            'data.items.*.links.*.name.malayalam' => ['nullable', 'string', 'max:255'],
            'data.items.*.links.*.link' => ['required', 'string', 'max:255'],
            'data.items.*.links.*.external' => ['required', 'boolean'],
        ];
    }
}
