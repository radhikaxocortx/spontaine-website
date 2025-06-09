<?php

namespace App\Http\Controllers\Workflow;

use App\Http\Controllers\Controller;
use App\Http\Requests\Workflow\WorkflowFormRequest;
use App\Models\ReferenceData\ReferenceData;
use App\Models\Workflow\Workflow;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class WorkflowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Workflow::class);
        $workflows = Workflow::with('country', 'priceplan')->get();

        return Inertia::render('Workflow/WorkflowIndex', [
            'workflows' => $workflows,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Workflow::class);
        $status = ReferenceData::fullData()
            ->where('domain', 'Workflow')
            ->where('parameter', 'Status')
            ->get();

        return Inertia::render('Workflow/WorkflowCreate',
            ['status' => $status]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WorkflowFormRequest $request): RedirectResponse
    {
        try {
            $record = Workflow::create($request->all());
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);

        }

        return redirect()
            ->route('workflow.index')
            ->with(['message' => 'Workflow Created Successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $workflow = Workflow::with('country', 'priceplan', 'workflowModules.workflowItems')->findOrFail($id);
        Gate::authorize('view', $workflow);

        return Inertia::render('Workflow/WorkflowShow', [
            'workflow' => $workflow,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $workflow = Workflow::with('country', 'priceplan')->find($id);
        Gate::authorize('update', $workflow);
        $status = ReferenceData::fullData()
            ->where('domain', 'Workflow')
            ->where('parameter', 'Status')
            ->get();

        return Inertia::render('Workflow/WorkflowEdit', [
            'workflow' => $workflow,
            'status' => $status,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WorkflowFormRequest $request, string $id): RedirectResponse
    {
        try {
            $workflow = Workflow::findOrFail($id);
            Gate::authorize('update', $workflow);
            $workflow->update($request->all());
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('workflow.index')
            ->with(['message' => 'Workflow Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $workflow = Workflow::findOrFail($id);
        Gate::authorize('delete', $workflow);
        try {
            $workflow->delete();
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('workflow.index')
            ->with(['message' => 'Workflow Deleted Successfully']);
    }
}
