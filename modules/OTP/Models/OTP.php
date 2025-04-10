<?php

namespace Modules\OTP\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Customer\OTP
 *
 * @property int $id
 * @property string $email
 * @property string $otp
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static Builder|OTP newModelQuery()
 * @method static Builder|OTP newQuery()
 * @method static Builder|OTP otp(string $email, string $otp)
 * @method static Builder|OTP query()
 * @method static Builder|OTP valid()
 * @method static Builder|OTP whereCreatedAt($value)
 * @method static Builder|OTP whereEmail($value)
 * @method static Builder|OTP whereId($value)
 * @method static Builder|OTP whereOtp($value)
 * @method static Builder|OTP whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class OTP extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'otp',
    ];

    /**
     * @param  Builder<OTP>  $query
     * @return Builder<OTP>
     */
    public function scopeOtp(Builder $query, string $email, string $otp): Builder
    {
        return $query->where('email', $email)->where('otp', $otp);
    }

    /**
     * @param  Builder<OTP>  $query
     * @return Builder<OTP>
     */
    public function scopeValid(Builder $query): Builder
    {
        return $query->where('created_at', '>=', now()->subMinutes(15));
    }
}
