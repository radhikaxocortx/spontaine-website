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
        // Redirect home requests to the static home page
        if ($url === 'home' || $url === '') {
            return redirect()->route('home');
        }

        $page = Page::where('url', $url)
            ->where('published', true)
            ->firstOrFail();

        return Inertia::render('PageBuilder/ViewBuilderPage', [
            'page' => $page,
        ]);
    }
}
