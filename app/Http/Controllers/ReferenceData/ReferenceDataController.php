<?php

namespace App\Http\Controllers\ReferenceData;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReferenceDataRequests\ReferenceDataSearchRequest;
use App\Models\ReferenceData\ReferenceData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReferenceDataController extends Controller
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
