<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WorkflowAdminMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public string $type;

    public string $date;

    public string $time;

    public string $name;

    public string $address;

    public string $phone;

    public string $email;

    public function __construct(array $data)
    {
        $this->type = $data['type'];
        $this->date = $data['date'];
        $this->time = $data['time'];
        $this->name = $data['name'];
        $this->address = $data['address'];
        $this->phone = $data['phone'];
        $this->email = $data['email'];
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New {$this->type} verification request received from {$this->name}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'workflowadminmail',
            with: [
                'type' => $this->type,
                'date' => $this->date,
                'time' => $this->time,
                'name' => $this->name,
                'address' => $this->address,
                'phone' => $this->phone,
                'email' => $this->email,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
