<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lead Capture Submission</title>
</head>

<body style="margin:0;padding:24px;background-color:#f4f7f9;font-family:Arial,sans-serif;color:#13212e;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
        style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dce5ea;border-radius:10px;overflow:hidden;">
        <tr>
            <td style="padding:20px 24px;background:#13212e;color:#ffffff;">
                <h1 style="margin:0;font-size:20px;line-height:1.4;">New Lead Capture Submission</h1>
            </td>
        </tr>
        <tr>
            <td style="padding:24px;">
                <p style="margin:0 0 16px 0;font-size:14px;line-height:1.6;color:#314654;">
                    A visitor submitted the lead capture form with the following details.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
                    style="border-collapse:collapse;">
                    <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #e6edf1;font-weight:600;width:180px;">Name
                        </td>
                        <td style="padding:10px 0;border-bottom:1px solid #e6edf1;">{{ $name }}</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #e6edf1;font-weight:600;">Business Email</td>
                        <td style="padding:10px 0;border-bottom:1px solid #e6edf1;">{{ $businessEmail }}</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #e6edf1;font-weight:600;">Organization</td>
                        <td style="padding:10px 0;border-bottom:1px solid #e6edf1;">{{ $organization }}</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 0;font-weight:600;">Country</td>
                        <td style="padding:10px 0;">
                            {{ $countryName ?: $countryCode }}
                            @if (!empty($countryName))
                                ({{ $countryCode }})
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:10px 0;border-top:1px solid #e6edf1;font-weight:600;">Downloaded File</td>
                        <td style="padding:10px 0;border-top:1px solid #e6edf1;">
                            {{ $downloadedFileName ?? 'Not provided' }}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
