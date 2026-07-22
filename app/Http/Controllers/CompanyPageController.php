<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class CompanyPageController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('CompanyPage')->withViewData([
            'seo' => [
                'title' => 'Our Mission: Governed AI for Professional Services',
                'description' => 'We built Spontaine because professional services firms deserve AI that strengthens their judgment, not replaces it - governed, transparent, and owned by the firms that use it.',
                'image' => rtrim((string) config('app.url'), '/') . '/storage/images/8205df31-7880-4c23-902d-6b222d8174b5.png',
                'url' => $request->fullUrl(),
                'type' => 'website',
                'noIndex' => false,
            ],
        ]);
    }
}
