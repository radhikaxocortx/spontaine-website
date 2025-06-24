<?php

namespace App\Http\Controllers\Promotion;

use App\Http\Controllers\Controller;
use App\Models\Promotion\Coupon;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ValidateCouponController extends Controller
{
    public function validateCoupon(Request $request): JsonResponse
    {
        $coupon = Coupon::with('pricePlan')
            ->where('price_plan_id', $request->priceplan_id)
            ->where('coupon_code', $request->promotion_code)
            ->first();

        if (! $coupon) {
            return response()->json(['message' => 'Invalid Promotion code.'], 422);
        }

        $today = Carbon::today();
        if ($today->lt(Carbon::parse($coupon->start_date)) || $today->gt(Carbon::parse($coupon->end_date))) {
            return response()->json(['message' => 'Coupon is expired.'], 422);
        }

        return response()->json(['coupon' => $coupon]);
    }
}
