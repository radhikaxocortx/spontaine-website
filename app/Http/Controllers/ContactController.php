<?php

namespace App\Http\Controllers;

use App\Mail\TemplateMail;
use App\Models\ContactMessage;
use App\Services\RateLimiter\RateLimitingService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendMail(Request $request, RateLimitingService $rateLimitingService): RedirectResponse
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'required|string|max:255',
            'about' => 'required|string|in:general,support,billing,partnership,other',
            'message' => 'required|string|max:1000',
            'privacy_policy' => 'required|boolean',
            'receiver_mail' => 'nullable|string|email|max:255',
            'subject' => 'nullable|string|max:255',
        ]);

        // mail content
        Log::info($request->all());
        $mailContent = "Name: $request->name <br />"
            ."Email: $request->email <br />"
            ."Phone: $request->phone <br />"
            ."About: $request->about <br />"
            .'Privacy Policy Accepted: '.($request->privacy_policy ? 'Yes' : 'No').'<br /><br />'
            ."Message:<br /> $request->message";

        $rateLimitKey = 'contact-us'.$request->ip();

        // if rate limit check is passed send mail and add to db
        if ($rateLimitingService->attemptsRemaining($rateLimitKey) > 0) {
            $rateLimitingService->incrementAttempts($rateLimitKey);
            try {
                $subject = ($request->subject ?? 'Contact').' - '.($request->about ?? '');
                Mail::to($request->receiver_mail ?? config('app.receiver_mail'))
                    ->send(new TemplateMail(
                        title: $request->subject ?? 'Contact',
                        mailContent: $mailContent,
                        actionLink: '',
                        emailSubject: $subject
                    ));
                Log::info('Mail Sent');
            } catch (Exception $exception) {
                return redirect()->back()->with(['error' => $exception->getMessage()]);
            }
            try {
                ContactMessage::create($request->all());
            } catch (Exception $exception) {
                //
            }

            return redirect()->back()->with(['message' => 'Message sent successfully']);
        }

        // if rate limit check is failed return error
        $duration = $rateLimitingService->remainingTimeoutDuration($rateLimitKey);

        return redirect()->back()
            ->with([
                'error' => 'You Can Send Only 3 Messages In An Hour, Try Again In '
                    .$duration.' Minutes',
            ]);
    }
}
