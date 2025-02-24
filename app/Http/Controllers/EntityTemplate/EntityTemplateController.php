<?php

namespace App\Http\Controllers\EntityTemplate;

use App\Http\Controllers\Controller;
use App\Libs\ExceptionMessage;
use App\Models\EntityTemplate\EntityTemplate;
use App\Models\EntityTemplate\EntityTemplateGroup;
use Exception;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EntityTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $entityTemplates = EntityTemplate::when($request->filled(key: 'search'), fn (Builder $builder) => $builder->where('name', operator: 'like', value: '%'.$request->input(key: 'search').'%'))
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('EntityTemplate/EntityTemplateIndex', [
            'entityTemplates' => $entityTemplates,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('EntityTemplate/EntityTemplateCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            /** @var EntityTemplate $record */
            $record = EntityTemplate::create($request->all());
        } catch (Exception $e) {
            return back()
                ->with(['error' => ExceptionMessage::getMessage($e)]);
        }

        return redirect()
            ->route('entity-templates.show', $record->id)
            ->with(['message' => 'Data added successfully.']);
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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $entityTemplate = EntityTemplate::find($id);

        return Inertia::render('EntityTemplate/EntityTemplateCreate', [
            'entityTemplate' => $entityTemplate,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        try {
            $record = EntityTemplate::find($id)->update($request->all());
        } catch (Exception $e) {
            return back()
                ->with(['error' => ExceptionMessage::getMessage($e)]);
        }

        return redirect()
            ->route('entity-templates.index')
            ->with(['message' => 'Record updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        try {
            EntityTemplate::find($id)->delete();
        } catch (Exception $e) {
            return back()
                ->with(['error' => ExceptionMessage::getMessage($e)]);
        }

        return redirect()
            ->route('entity-templates.index')
            ->with(['message' => 'Record deleted successfully.']);
    }
}
