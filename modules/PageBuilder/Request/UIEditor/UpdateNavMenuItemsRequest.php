<?php

declare(strict_types=1);

namespace Modules\PageBuilder\Request\UIEditor;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class UpdateNavMenuItemsRequest
 *
 * @property array{lastUUID: int, items: array<array-key, mixed>} $data
 */
final class UpdateNavMenuItemsRequest extends FormRequest
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
            // Optional rich description per submenu link
            'data.items.*.links.*.description' => ['nullable', 'array'],
            'data.items.*.links.*.description.english' => ['nullable', 'string', 'max:1000'],
            'data.items.*.links.*.description.malayalam' => ['nullable', 'string', 'max:1000'],
            // Optional media per submenu link
            'data.items.*.links.*.media' => ['nullable', 'array'],
            'data.items.*.links.*.media.type' => ['nullable', 'in:image,video'],
            'data.items.*.links.*.media.source' => ['nullable', 'in:upload,url'],
            'data.items.*.links.*.media.pathOrUrl' => ['nullable', 'string', 'max:2048'],
            'data.items.*.links.*.media.thumbnail' => ['nullable', 'string', 'max:2048'],
        ];
    }
}
