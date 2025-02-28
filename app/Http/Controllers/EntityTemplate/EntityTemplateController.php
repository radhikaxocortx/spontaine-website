<?php

namespace App\Http\Controllers\EntityTemplate;

use App\Http\Controllers\Controller;
use App\Http\Requests\EntityTemplate\EntityTemplateFormRequest;
use App\Libs\ExceptionMessage;
use App\Models\EntityTemplate\EntityTemplate;
use App\Models\EntityTemplate\EntityTemplateGroup;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EntityTemplateController extends Controller
{
    public function store(EntityTemplateFormRequest $request)
    {

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
    public function show(string $id)
    {
        $entityTemplate = EntityTemplate::find($id);
        $groups = EntityTemplateGroup::where('entity_template_id', $entityTemplate->id)
            ->with(['items' => function ($query) {
                $query->orderBy('field_number');
            }])
            ->get();

        return Inertia::render('EntityTemplate/EntityTemplateShow', [
            'entityTemplate' => $entityTemplate,
            'groups' => $groups,
        ]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
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
        try {
            EntityTemplate::find($id)->delete();
        } catch (Exception $e) {
            return back()
                ->with(['error' => ExceptionMessage::getMessage($e)]);
        }

    }
}
