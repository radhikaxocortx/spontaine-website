<?php

namespace App\Http\Controllers\EntityTemplate;

use App\Http\Controllers\Controller;
use App\Http\Requests\EntityTemplate\EntityTemplateFormRequest;
use App\Libs\ExceptionMessage;
use App\Models\EntityTemplate\EntityTemplate;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class EntityTemplateController extends Controller
{
    public function store(EntityTemplateFormRequest $request): RedirectResponse
    {
        Gate::authorize('create', EntityTemplate::class);

        try {

            EntityTemplate::create([
                ...$request->all(),

            ]);
        } catch (Exception $e) {
            return back()
                ->with(['error' => ExceptionMessage::getMessage($e)]);
        }

        return redirect()
            ->back();
    }

    /**
     * Display the specified resource.
     */
    public function update(Request $request, string $id): RedirectResponse
    {

        try {

            $entityTemplate = EntityTemplate::findOrFail($id);
            Gate::authorize('update', $entityTemplate);

            $entityTemplate->update($request->all());

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
                'message' => 'Workflow Module updated successfully',
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        try {
            $entityTemplate = EntityTemplate::findOrFail($id);
            Gate::authorize('delete', $entityTemplate);
            $entityTemplate->delete();
        } catch (Exception $e) {
            return back()
                ->with(['error' => ExceptionMessage::getMessage($e)]);
        }

        return redirect()
            ->back()
            ->with([
                'message' => 'Workflow Module deleted successfully',
            ]);
    }
}
