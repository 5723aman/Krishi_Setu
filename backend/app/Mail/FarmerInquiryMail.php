<?php

namespace App\Mail;

use App\Models\FarmerInquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class FarmerInquiryMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public FarmerInquiry $inquiry)
    {
        //
    }

    public function envelope(): Envelope
    {
        $topic = str_replace('_', ' ', $this->inquiry->topic);

        return new Envelope(
            subject: '[Efarm] New enquiry — '.$topic.' — '.$this->inquiry->name,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.farmer-inquiry',
        );
    }

    /**
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
