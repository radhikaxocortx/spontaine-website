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
                'title' => 'Product | Spontaine',
                'description' => 'Build the AI-native professional services firm with governed answers, reusable capabilities, and workflows your firm owns.',
                'image' => rtrim((string) config('app.url'), '/') . '/storage/images/16.png',
                'url' => $request->fullUrl(),
                'type' => 'website',
                'noIndex' => false,
            ],
        ]);
    }
}
