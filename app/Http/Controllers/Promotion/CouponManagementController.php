<?php

namespace App\Http\Controllers\Promotion;

use App\Http\Controllers\Controller;
use App\Http\Requests\Promotions\CouponFormRequest;
use App\Models\PricePlan\PricePlan;
use App\Models\Promotion\Coupon;
use Exception;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CouponManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $coupons = Coupon::with('pricePlan')
            ->when(request('search'), function ($query) {
                $query->where('coupon_code', 'like', '%'.request('search').'%');
            })
            ->paginate(10);

        return Inertia::render('Coupons/CouponIndex', [
            'coupons' => $coupons,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $pricePlans = PricePlan::all();

        return Inertia::render('Coupons/CouponCreate', [
            'pricePlans' => $pricePlans,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CouponFormRequest $request): RedirectResponse
    {
        try {
            Coupon::create($request->all());
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

        return redirect()->route('coupon.index')->with('message', 'Coupon created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $coupon = Coupon::with('pricePlan')->findOrFail($id);

        return Inertia::render('Coupons/CouponShow', [
            'coupon' => $coupon,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $coupon = Coupon::with('pricePlan')->findOrFail($id);

        return Inertia::render('Coupons/CouponCreate', [
            'coupon' => $coupon,
            'pricePlans' => PricePlan::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CouponFormRequest $request, string $id): RedirectResponse
    {
        try {
            Coupon::findOrFail($id)->update($request->all());
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

        return redirect()->route('coupon.index')->with('message', 'Coupon updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        try {
            Coupon::findOrFail($id)->delete();
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

        return redirect()->route('coupon.index')->with('message', 'Coupon deleted successfully');
    }
}
