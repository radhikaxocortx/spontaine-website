<?php

namespace App\Http\Controllers\EntityTemplate;

use App\Http\Controllers\Controller;
use App\Models\Workflow\Workflow;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class workflowAPIController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $name = $request->input('name');
        $country = $request->input('country');

        if ($name == null) {

            return response()->json([
                'workflow' => null,
            ]);
        }

        $workflow = Workflow::where('name', $name)
            ->with('workflowModules.workflowItems')
            ->first();

        return response()->json([
            'workflow' => $workflow,
        ]);
    }

    public function workflowTest()
    {
        return Inertia::render('WorkflowTest');
    }
}
