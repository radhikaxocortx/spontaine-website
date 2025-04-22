<?php

namespace Modules\PageBuilder\Request\UIEditor;

use Illuminate\Foundation\Http\FormRequest;

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
            'title' => ['required', 'string', 'max:255', 'unique:nav_menu_items,title'],
            'title_malayalam' => ['nullable', 'string', 'max:255'],
            'position' => ['required', 'integer', 'min:0'],
            'is_link' => ['required', 'boolean'],
            'link_info' => ['nullable', 'array', 'required_if:is_link,true'],
            'link_info.link' => ['required_if:is_link,true', 'string', 'max:255'],
            'link_info.name' => ['required_if:is_link,true', 'array'],
            'link_info.name.english' => ['required_if:is_link,true', 'string', 'max:255'],
            'link_info.name.malayalam' => ['nullable', 'string', 'max:255'],
            'link_info.external' => ['required_if:is_link,true', 'boolean'],
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
