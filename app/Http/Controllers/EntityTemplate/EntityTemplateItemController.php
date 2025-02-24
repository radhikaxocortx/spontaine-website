<?php

namespace App\Http\Controllers\EntityTemplate;

use App\Http\Controllers\Controller;
use App\Http\Requests\EntityTemplate\TemplateItemFormRequest;
use App\Libs\ExceptionMessage;
use App\Models\EntityTemplate\EntityTemplateItem;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class EntityTemplateItemController extends Controller
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

    public function store(TemplateItemFormRequest $formRequest): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $entity = EntityTemplateItem::create([
                ...$formRequest->all(),

            ]);

        } catch (Exception $exception) {
            DB::rollBack();

            return redirect()
                ->back()
                ->with(['error' => ExceptionMessage::getMessage($exception)]);
        }

        DB::commit();

        return redirect()
            ->back()
            ->with(['message' => 'Template item created successfully']);
    }

    public function update(TemplateItemFormRequest $formRequest, EntityTemplateItem $templateItem): RedirectResponse
    {

        DB::beginTransaction();
        try {
            $templateItem->update([
                ...$formRequest->all(),

            ]);

        } catch (Exception $exception) {
            DB::rollBack();

            return redirect()
                ->back()
                ->with(['error' => ExceptionMessage::getMessage($exception)]);
        }

        DB::commit();

        return redirect()
            ->back()
            ->with(['message' => 'Template item updated successfully']);
    }

    public function destroy(EntityTemplateItem $templateItem): RedirectResponse
    {

        try {
            $templateItem->delete();

        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->with(['error' => ExceptionMessage::getMessage($exception)]);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Template item deleted successfully']);
    }
}
