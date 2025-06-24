Dear {{ $name }}
<br/>
<br/>
Your Kadodo application status has been updated to {{ $status }}.
<br/>
@if($note)
{{ $note }}
@endif
<br/>
<br/>
You may review status at any time by logging on to your Kadodo account.
<br/>
For details, please sign-in here.
<br/>
<br/>
<link>{{ route('customer-login') }}</link>
<br/>
<br/>
Thanks,<br/>
Team Kadodo
<br/>