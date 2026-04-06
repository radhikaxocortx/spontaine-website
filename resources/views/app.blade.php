<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @php
        $seo = $seo ?? [];
        $defaultTitle = config('app.name', 'Spontaine');
        $defaultDescription =
            "Transform your disconnected systems into an AI-driven command center with Spontaine's no-code data integration platform.";
        $defaultImage = rtrim(config('app.url', 'https://spontaine.com'), '/') . '/storage/images/16.png';
        $seoTitle = $seo['title'] ?? $defaultTitle;
        $seoDescription = $seo['description'] ?? $defaultDescription;
        $seoImage = $seo['image'] ?? $defaultImage;
        $seoUrl = $seo['url'] ?? url()->current();
        $seoType = $seo['type'] ?? 'website';
        $noIndex = (bool) ($seo['noIndex'] ?? false);
    @endphp

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

    <!-- SEO / Open Graph (server-rendered for bots) -->
    <meta name="robots" content="{{ $noIndex ? 'noindex,nofollow' : 'index,follow' }}">
    <meta name="description" content="{{ $seoDescription }}">
    <link rel="canonical" href="{{ $seoUrl }}">

    <meta property="og:site_name" content="Spontaine">
    <meta property="og:title" content="{{ $seoTitle }}">
    <meta property="og:description" content="{{ $seoDescription }}">
    <meta property="og:image" content="{{ $seoImage }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="{{ $seoUrl }}">
    <meta property="og:type" content="{{ $seoType }}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $seoTitle }}">
    <meta name="twitter:description" content="{{ $seoDescription }}">
    <meta name="twitter:image" content="{{ $seoImage }}">
    <meta name="twitter:url" content="{{ $seoUrl }}">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    @inertiaHead

    <!-- Calendly widget script -->
    <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-EL0GPXQZX4"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-EL0GPXQZX4');
    </script>
</head>

<body class="font-sans antialiased" style="scroll-behavior: smooth;">
    @inertia
</body>

</html>
