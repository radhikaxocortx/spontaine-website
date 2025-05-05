<?php

namespace App\Http\Controllers\ReferenceData;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReferenceDataRequests\RefDataFormRequest;
use App\Http\Requests\ReferenceDataRequests\ReferenceDataSearchRequest;
use App\Models\ReferenceData\ReferenceData;
use App\Models\ReferenceData\ReferenceDataDomain;
use App\Services\ReferenceData\HasSecondValue;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ReferenceDataController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            'auth',
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(ReferenceDataSearchRequest $searchRequest)
    {
        //
        Gate::authorize('viewAny', ReferenceData::class);

        $referenceData = ReferenceData::fullData()
            ->filter($searchRequest)
            ->paginate(20);

        $domains = ReferenceDataDomain::get();

        return Inertia::render('ReferenceData/ReferenceDataIndex', [
            'referenceData' => $referenceData,
            'domains' => $domains,
            'oldDomain' => $searchRequest->domainId ?? '',
            'oldParameter' => $searchRequest->parameterId ?? '',
            'oldValue' => $searchRequest->value ?? '',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', ReferenceData::class);

        $domains = ReferenceDataDomain::get();

        return Inertia::render('ReferenceData/ReferenceDataCreate', [
            'domains' => $domains,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RefDataFormRequest $request, HasSecondValue $hasSecondValue)
    {
        $response = $hasSecondValue->check($request);

        if ($response->error) {
            return back()->with([
                'error' => $response->message,
            ]);
        }

        try {
            ReferenceData::create($request->all());
        } catch (Exception $e) {
            return back()->with([
                'error' => $e->getMessage(),
            ]);
        }

        return redirect()
            ->route('reference-data.index')
            ->with([
                'message' => 'Reference Data Added successfully',
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $domains = ReferenceDataDomain::get();

        $referenceData = ReferenceData::findOrFail($id);
        Gate::authorize('view', $referenceData);

        return Inertia::render('ReferenceData/ReferenceDataEdit', [
            'referenceData' => $referenceData,
            'domains' => $domains,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, RefDataFormRequest $request, HasSecondValue $hasSecondValue): RedirectResponse
    {

        $response = $hasSecondValue->check($request);

        if ($response->error) {
            return back()->with([
                'error' => $response->message,
            ]);
        }

        try {
            ReferenceData::where('id', $id)
                ->update($request->all());
        } catch (Exception $e) {
            return back()->with([
                'error' => $e->getMessage(),
            ]);
        }

        return redirect()
            ->route('reference-data.index')
            ->with([
                'message' => 'Reference Data Updated successfully',
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
