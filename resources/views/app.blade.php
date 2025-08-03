<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Spontaine') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    
    <!-- Calendly widget styles -->
    <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    @inertiaHead
    
    <!-- Calendly widget script -->
    <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
</head>

<body class="font-sans antialiased" style="scroll-behavior: smooth;">
    @inertia
</body>

</html>
