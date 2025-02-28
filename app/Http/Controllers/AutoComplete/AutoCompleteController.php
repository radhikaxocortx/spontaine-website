<?php

namespace App\Http\Controllers\AutoComplete;

use App\Http\Controllers\Controller;
use App\Models\Country\Country;
use App\Models\PricePlan\PricePlan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AutoCompleteController extends Controller
{
    public function findCountry(Request $request): JsonResponse
    {
        if (! $request->filled('search')) {
            return response()->json();
        }
        $country = Country::where('name', 'like', '%'.$request->search.'%')
            ->orwhere('code', 'like', '%'.$request->search.'%')
            ->get();

        return response()->json($country);
    }

    public function findPriceplan(Request $request): JsonResponse
    {
        if (! $request->filled('search')) {
            return response()->json();
        }
        $priceplan = PricePlan::where('name', 'like', '%'.$request->search.'%')
            ->orwhere('code', 'like', '%'.$request->search.'%')
            ->orwhere('type', 'like', '%'.$request->search.'%')
            ->get();

        return response()->json($priceplan);
    }
}
