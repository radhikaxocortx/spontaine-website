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
    public function store(EntityTemplateFormRequest $request)
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
    public function show(string $id) {}

    public function update(Request $request, string $id): RedirectResponse
    {
        Gate::authorize('update', EntityTemplate::class);
        try {

            $entityTemplate = EntityTemplate::find($id);

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
    public function destroy(string $id)
    {
        Gate::authorize('delete', EntityTemplate::class);
        try {
            EntityTemplate::find($id)->delete();
        } catch (Exception $e) {
            return back()
                ->with(['error' => ExceptionMessage::getMessage($e)]);
        }

    }
}
