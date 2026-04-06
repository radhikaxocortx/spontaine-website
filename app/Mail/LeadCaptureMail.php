<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LeadCaptureMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(
        private readonly string $name,
        private readonly string $businessEmail,
        private readonly string $organization,
        private readonly string $countryCode,
        private readonly ?string $countryName,
        private readonly ?string $downloadedFileName,
        private readonly string $emailSubject,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->emailSubject,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.lead-capture',
            with: [
                'name' => $this->name,
                'businessEmail' => $this->businessEmail,
                'organization' => $this->organization,
                'countryCode' => $this->countryCode,
                'countryName' => $this->countryName,
                'downloadedFileName' => $this->downloadedFileName,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
