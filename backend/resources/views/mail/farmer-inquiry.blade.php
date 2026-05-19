<x-mail::message>
# New farmer enquiry

Someone submitted the contact form on **{{ config('app.name') }}**.

<x-mail::panel>
**Name:** {{ $inquiry->name }}  
**Phone:** {{ $inquiry->phone }}  
@if($inquiry->district)
**District:** {{ $inquiry->district }}  
@endif
**Topic:** {{ str_replace('_', ' ', $inquiry->topic) }}  
**Reference ID:** #{{ $inquiry->id }}
</x-mail::panel>

## Message

{{ $inquiry->message }}

<x-mail::subcopy>
This email was sent automatically when enquiry #{{ $inquiry->id }} was stored in the database.
</x-mail::subcopy>
</x-mail::message>
