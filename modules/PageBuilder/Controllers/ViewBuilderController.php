<?php

namespace Modules\PageBuilder\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Modules\PageBuilder\Models\Page;

class ViewBuilderController extends Controller
{
    public function __invoke(string $url): Response
    {
        $page = Page::where('url', $url)
            ->firstOrFail();

        return Inertia::render('PageBuilder/ViewBuilderPage', [
            'page' => $page,
        ]);
    }
}
