<?php

namespace App\Http\Controllers\PricePlan;

use App\Http\Controllers\Controller;
use App\Http\Requests\PricePlanRequest\PricePlanFormRequest;
use App\Models\PricePlan\PricePlan;
use App\Models\ReferenceData\ReferenceData;
use Exception;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PricePlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', PricePlan::class);
        $pricePlans = PricePlan::all();

        return Inertia::render('PricePlan/PricePlanIndex', [
            'pricePlans' => $pricePlans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', PricePlan::class);
        $type = ReferenceData::fullData()
            ->where('domain', 'Price Plan')
            ->where('parameter', 'Type')
            ->get();

        return Inertia::render('PricePlan/PricePlanCreate', [
            'type' => $type,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PricePlanFormRequest $request)
    {

        try {
            $record = PricePlan::create($request->all());
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('price-plan.index')
            ->with(['message' => 'Price Plan Created Successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        Gate::authorize('view', PricePlan::class);
        $pricePlan = PricePlan::find($id);

        return Inertia::render('PricePlan/PricePlanShow', [
            'pricePlan' => $pricePlan,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        Gate::authorize('update', PricePlan::class);
        $pricePlan = PricePlan::find($id);
        $type = ReferenceData::fullData()
            ->where('domain', 'Price Plan')
            ->where('parameter', 'Type')
            ->get();

        return Inertia::render('PricePlan/PricePlanEdit', [
            'pricePlan' => $pricePlan,
            'type' => $type,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PricePlanFormRequest $request, string $id)
    {
        try {
            PricePlan::where('id', $id)
                ->update($request->all());
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('price-plan.index')
            ->with(['message' => 'Price Plan Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Gate::authorize('delete', PricePlan::class);
        try {
            PricePlan::where('id', $id)
                ->delete();
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('price-plan.index')
            ->with(['message' => 'Price Plan Deleted Successfully']);
    }
}
