<?php

namespace Modules\PageBuilder\Request\UIEditor;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Class NavMenuFormRequest
 *
 * @property string $title
 * @property ?string $title_malayalam
 * @property int $position
 * @property bool $is_link
 * @property ?array{link: string, name: array{english: string, malayalam?: string}, external: bool} $link_info
 * @property array{lastUUID: int, items: array<array-key, mixed>} $data
 *
 * @method array{
 * title: string,
 * title_malayalam?: string|null,
 * position: int,
 * is_link: bool,
 * link_info?: array{link: string, name: array{english: string, malayalam?: string}, external: bool}|null,
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
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('nav_menu_items', 'title')->whereNull('deleted_at'),
            ],
            'title_malayalam' => ['nullable', 'string', 'max:255'],
            'position' => ['required', 'integer', 'min:0'],
            'is_link' => ['required', 'boolean'],
            'link_info' => ['nullable', 'array'],
            'link_info.link' => ['required', 'string', 'max:255'],
            'link_info.name' => ['required', 'array'],
            'link_info.name.english' => ['required', 'string', 'max:255'],
            'link_info.name.malayalam' => ['nullable', 'string', 'max:255'],
            'link_info.external' => ['required', 'boolean'],
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
