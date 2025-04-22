<?php

declare(strict_types=1);

namespace Modules\PageBuilder\Request\UIEditor;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class UpdateNavMenuFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('nav_menu_items', 'title')->ignore($this->route('id')),
            ],
            'title_malayalam' => ['nullable', 'string', 'max:255'],
            'position' => ['required', 'integer'],
            'is_link' => ['required', 'boolean'],
            'link_info' => ['nullable', 'array'],
            'link_info.link' => ['required', 'string', 'max:255'],
            'link_info.name' => ['required', 'array'],
            'link_info.name.english' => ['required', 'string', 'max:255'],
            'link_info.name.malayalam' => ['nullable', 'string', 'max:255'],
            'link_info.external' => ['required', 'boolean'],
        ];
    }
}
