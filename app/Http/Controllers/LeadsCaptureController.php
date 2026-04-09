<?php

namespace App\Http\Controllers;

use App\Mail\LeadCaptureMail;
use App\Services\RateLimiter\RateLimitingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class LeadsCaptureController extends Controller
{
    public function sendMail(Request $request, RateLimitingService $rateLimitingService): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'organization' => 'required|string|max:255',
            'country' => 'required|string|max:10',
            'country_name' => 'nullable|string|max:255',
            'download_file_name' => 'nullable|string|max:255',
            'privacy_policy' => 'accepted',
            'receiver_mail' => 'nullable|string|max:2000',
            'subject' => 'nullable|string|max:255',
        ]);

        $recipients = $this->resolveRecipients($validated['receiver_mail'] ?? null);

        if ($recipients === []) {
            return redirect()->back()->with([
                'error' => 'Receiver email must contain one or more valid email addresses.',
            ]);
        }

        $rateLimitKey = 'lead-capture' . $request->ip();

        if ($rateLimitingService->attemptsRemaining($rateLimitKey) <= 0) {
            $duration = $rateLimitingService->remainingTimeoutDuration($rateLimitKey);

            return redirect()->back()->with([
                'error' => 'You Can Send Only 3 Messages In An Hour, Try Again In ' . $duration . ' Minutes',
            ]);
        }

        $rateLimitingService->incrementAttempts($rateLimitKey);

        try {
            Mail::to($recipients)
                ->send(new LeadCaptureMail(
                    name: $validated['name'],
                    businessEmail: $validated['email'],
                    organization: $validated['organization'],
                    countryCode: $validated['country'],
                    countryName: $validated['country_name'] ?? null,
                    downloadedFileName: $validated['download_file_name'] ?? null,
                    emailSubject: $validated['subject'] ?? 'Lead Capture Form Submission',
                ));
        } catch (Throwable $exception) {
            Log::info('Lead Capture Mail Sending Failed: ' . $exception->getMessage());

            return redirect()->back()->with(['error' => $exception->getMessage()]);
        }

        return redirect()->back();
    }

    /**
     * @return array<int, string>
     */
    private function resolveRecipients(?string $rawRecipients): array
    {
        if ($rawRecipients === null || trim($rawRecipients) === '') {
            return ['desk@intuonfx.com'];
        }

        $parts = preg_split('/[\s,;]+/', $rawRecipients) ?: [];

        $emails = array_values(array_filter(array_map(static function (string $email): ?string {
            $trimmed = trim($email);

            if ($trimmed === '' || filter_var($trimmed, FILTER_VALIDATE_EMAIL) === false) {
                return null;
            }

            return $trimmed;
        }, $parts)));

        return array_values(array_unique($emails));
    }
}
