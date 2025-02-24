<?php

namespace App\Http\Controllers\EntityTemplate;

use App\Http\Controllers\Controller;
use App\Http\Requests\EntityTemplate\TemplateGroupFormRequest;
use App\Libs\ExceptionMessage;
use App\Models\EntityTemplate\EntityTemplateGroup;
use Exception;
use Illuminate\Http\RedirectResponse;

class EntityTemplateGroupController extends Controller
{
    /**
     * @return string[]
     */
    public static function middleware(): array
    {
        return [
            'auth',
        ];
    }

    public function store(TemplateGroupFormRequest $formRequest): RedirectResponse
    {

        try {
            EntityTemplateGroup::create([
                ...$formRequest->all(),

            ]);
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->with([
                    'error' => ExceptionMessage::getMessage($exception),
                ]);
        }

        return redirect()
            ->back()
            ->with([
                'message' => 'Entity Template Group created successfully',
            ]);
    }

    public function update(EntityTemplateGroup $templateGroup, TemplateGroupFormRequest $formRequest): RedirectResponse
    {
        try {
            $templateGroup->update($formRequest->all());
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->with([
                    'error' => ExceptionMessage::getMessage($exception),
                ]);
        }

        return redirect()
            ->back()
            ->with([
                'message' => 'Entity Template Group updated successfully',
            ]);
    }

    public function destroy(EntityTemplateGroup $templateGroup): RedirectResponse
    {
        try {
            $templateGroup->delete();
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->with([
                    'error' => ExceptionMessage::getMessage($exception),
                ]);
        }

        return redirect()
            ->back()
            ->with([
                'message' => 'Entity Template Group deleted successfully',
            ]);
    }
}
