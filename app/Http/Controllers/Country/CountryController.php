<?php

namespace App\Http\Controllers\Country;

use App\Http\Controllers\Controller;
use App\Http\Requests\CountryRequest\CountryFormRequest;
use App\Models\Country\Country;
use App\Models\ReferenceData\ReferenceData;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {

        Gate::authorize('viewAny', Country::class);

        $countries = Country::all();

        return Inertia::render('Country/CountryIndex', [
            'countries' => $countries,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Country::class);

        $currency = ReferenceData::fullData()
            ->where('domain', 'Country')
            ->where('parameter', 'Currency')
            ->get();

        return Inertia::render('Country/CountryCreate', [
            'currency' => $currency,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CountryFormRequest $request): RedirectResponse
    {
        try {
            Country::create($request->all());
        } catch (Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('country.index')
            ->with(['message' => 'Country Created Successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        Gate::authorize('view', Country::class);

        $country = Country::find($id);

        return Inertia::render('Country/CountryShow', [
            'country' => $country,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        Gate::authorize('create', Country::class);

        $country = Country::find($id);
        $currency = ReferenceData::fullData()
            ->where('domain', 'Country')
            ->where('parameter', 'Currency')
            ->get();

        return Inertia::render('Country/CountryEdit', [
            'country' => $country,
            'currency' => $currency,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CountryFormRequest $request, string $id): RedirectResponse
    {
        try {
            Country::where('id', $id)
                ->update($request->all());
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('country.index')
            ->with(['message' => 'Country Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        Gate::authorize('delete', Country::class);

        try {
            $country = Country::where('id', $id)
                ->delete();
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('country.index')
            ->with(['message' => 'Country Deleted Successfully']);
    }
}
