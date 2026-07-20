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
                'title' => 'Company | Spontaine',
                'description' => 'Spontaine is governed intelligence for professional-services firms, built from seven years of doing the hard work inside enterprise and government environments.',
                'image' => rtrim((string) config('app.url'), '/') . '/storage/images/16.png',
                'url' => $request->fullUrl(),
                'type' => 'website',
                'noIndex' => false,
            ],
        ]);
    }
}
