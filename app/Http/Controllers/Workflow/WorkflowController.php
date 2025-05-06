<?php

namespace App\Http\Controllers\Workflow;

use App\Http\Controllers\Controller;
use App\Http\Requests\Workflow\WorkflowFormRequest;
use App\Models\ReferenceData\ReferenceData;
use App\Models\Workflow\Workflow;
use Exception;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class WorkflowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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
    public function create()
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
    public function store(WorkflowFormRequest $request)
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
    public function show(string $id)
    {
        Gate::authorize('view', Workflow::class);
        $workflow = Workflow::with('country', 'priceplan', 'workflowModules.workflowItems')->findOrFail($id);

        return Inertia::render('Workflow/WorkflowShow', [
            'workflow' => $workflow,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        Gate::authorize('update', Workflow::class);
        $workflow = Workflow::with('country', 'priceplan')->find($id);
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
    public function update(WorkflowFormRequest $request, string $id)
    {
        try {
            $record = Workflow::find($id)->update($request->all());
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
    public function destroy(string $id)
    {
        Gate::authorize('delete', Workflow::class);
        try {
            Workflow::find($id)->delete();
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('workflow.index')
            ->with(['message' => 'Workflow Deleted Successfully']);
    }
}
