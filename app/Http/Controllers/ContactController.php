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
            'message' => 'required|string|max:1000',
            'privacy_policy' => 'required|boolean',
            'receiver_mail' => 'nullable|string|email|max:255',
            'subject' => 'nullable|string|max:255',
            'general_enquiries' => 'nullable|boolean',
            'partner_enquiries' => 'nullable|boolean',
            'investor_enquiries' => 'nullable|boolean',
            'career_enquiries' => 'nullable|boolean',
            'support' => 'nullable|boolean',
            'other' => 'nullable|boolean',
        ]);



        // Build enquiry types list
        $enquiryTypes = [];
        if ($request->general_enquiries) $enquiryTypes[] = 'General Enquiries';
        if ($request->partner_enquiries) $enquiryTypes[] = 'Partner Enquiries';
        if ($request->investor_enquiries) $enquiryTypes[] = 'Investor Enquiries';
        if ($request->career_enquiries) $enquiryTypes[] = 'Career Enquiries';
        if ($request->support) $enquiryTypes[] = 'Support';
        if ($request->other) $enquiryTypes[] = 'Other';

        $enquiryTypesString = !empty($enquiryTypes) ? implode(', ', $enquiryTypes) : 'None specified';

        // mail content
        $mailContent = "Name: $request->name <br />"
            . "Email: $request->email <br />"
            . "Phone: $request->phone <br />"
            . "Selected Enquiries: $enquiryTypesString <br />"
            . 'Privacy Policy Accepted: ' . ($request->privacy_policy ? 'Yes' : 'No') . '<br /><br />'
            . "Message:<br /> $request->message";

        $rateLimitKey = 'contact-us' . $request->ip();

        // if rate limit check is passed send mail and add to db
        if ($rateLimitingService->attemptsRemaining($rateLimitKey) > 0) {
            $rateLimitingService->incrementAttempts($rateLimitKey);
            try {
                ContactMessage::create($request->all());
            } catch (Exception $exception) {
                Log::info('Contact Message Creation Failed: ' . $exception->getMessage());
            }
            try {
                $subject = $request->subject ?? 'Contact Form Submission';
                Mail::to($request->receiver_mail ?? 'desk@intuonfx.com')
                    ->send(new TemplateMail(
                        title: $request->subject ?? 'Contact',
                        mailContent: $mailContent,
                        actionLink: '',
                        emailSubject: $subject
                    ));
            } catch (Exception $exception) {
                Log::info('Contact Mail Sending Failed: ' . $exception->getMessage());
                return redirect()->back()->with(['error' => $exception->getMessage()]);
            }
            return redirect()
                ->back()
                ->with(['message' => 'Thank you for contacting us. Our team will review your message and get back to you shortly.']);
        }

        // if rate limit check is failed return error
        $duration = $rateLimitingService->remainingTimeoutDuration($rateLimitKey);

        return redirect()->back()
            ->with([
                'error' => 'You Can Send Only 3 Messages In An Hour, Try Again In '
                    . $duration . ' Minutes',
            ]);
    }
}
