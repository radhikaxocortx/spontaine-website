<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ContactMessage
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property string $about
 * @property string $message
 * @property bool $privacy_policy
 * @property string|null $receiver_mail
 * @property string|null $subject
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage whereAbout($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage wherePrivacyPolicy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage whereReceiverMail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactMessage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'about',
        'message',
        'privacy_policy',
        'receiver_mail',
        'subject',
    ];
}
