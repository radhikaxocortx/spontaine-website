<?php

namespace App\Http\Controllers\UIBuilder;

use App\Http\Controllers\Controller;
use App\Models\UIBuilder\Footer;
use App\Services\Footer\FooterCreate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FooterController extends Controller
{
    public static function middleware()
    {
        return [
            'auth',
        ];
    }

    public function index(): Response
    {

        $footer = Footer::first();

        return Inertia::render('PageBuilder/FooterEditorPage', [
            'footer' => $footer,
        ]);
    }

    public function store(Request $request, FooterCreate $footerCreate): RedirectResponse
    {

        $data = $request->data;

        return $footerCreate->create($data);
    }
}
