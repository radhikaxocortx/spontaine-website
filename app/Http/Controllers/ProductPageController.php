<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class ProductPageController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('ProductPage')->withViewData([
            'seo' => [
                'title' => 'Governed AI Data Infrastructure Your Firm Owns',
                'description' => 'Spontaine ingests your data into a governed, client-exclusive environment - nothing migrates out. Your firm keeps full ownership of every workflow, dashboard, and output.',
                'image' => rtrim((string) config('app.url'), '/') . '/storage/images/8205df31-7880-4c23-902d-6b222d8174b5.png',
                'url' => $request->fullUrl(),
                'type' => 'website',
                'noIndex' => false,
            ],
        ]);
    }
}
