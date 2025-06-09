<?php

namespace App\Http\Controllers\ReferenceData;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReferenceDataRequests\ParameterFormRequest;
use App\Models\ReferenceData\ReferenceData;
use App\Models\ReferenceData\ReferenceDataDomain;
use App\Models\ReferenceData\ReferenceDataParameters;
use Exception;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ParameterManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $parameters = ReferenceDataParameters::with('domain')->get();

        return Inertia::render('ReferenceData/ParameterIndex', [
            'parameters' => $parameters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $domains = ReferenceDataDomain::all();

        return Inertia::render('ReferenceData/ParameterCreate', [
            'domains' => $domains,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ParameterFormRequest $request): RedirectResponse
    {
        try {
            ReferenceDataParameters::create([
                'domain_id' => $request->domainId,
                'parameter' => $request->parameter,
                'has_second_value' => $request->hasSecondValue,
            ]);
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }

        return redirect()->route('parameter-management.index')->with('message', 'Parameter created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $parameter = ReferenceDataParameters::findOrFail($id);

        $domains = ReferenceDataDomain::all();

        return Inertia::render('ReferenceData/ParameterCreate', [
            'domains' => $domains,
            'parameter' => $parameter,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ParameterFormRequest $request, string $id): RedirectResponse
    {
        try {
            $parameter = ReferenceDataParameters::findOrFail($id);

            $parameter->update([
                'domain_id' => $request->domainId,
                'parameter' => $request->parameter,
                'has_second_value' => $request->hasSecondValue,
            ]);
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }

        return redirect()->route('parameter-management.index')->with('message', 'Parameter updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $dataExist = ReferenceData::where('parameter_id', $id)->exists();
        if ($dataExist) {
            return back()->with('error', 'Parameter is used in reference data');
        }
        try {
            $parameter = ReferenceDataParameters::findOrFail($id);

            $parameter->delete();
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }

        return redirect()->route('parameter-management.index')->with('message', 'Parameter deleted successfully');
    }
}
