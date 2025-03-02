<?php

namespace Modules\PageBuilder\Controllers;

use App\Http\Controllers\Controller;
use App\Libs\ExceptionMessage;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Modules\PageBuilder\Models\Page;

class UpdateBlockController extends Controller
{
    public function __invoke(string $id, Request $request): RedirectResponse
    {

        try {
            if ($request->filled('blocks')) {
                Page::where('id', $id)
                    ->update([
                        'blocks' => $request->get('blocks'),
                    ]);
            }
        } catch (Exception $e) {
            return redirect()->back()
                ->with([
                    'error' => ExceptionMessage::getMessage($e),
                ]);
        }

        return redirect()->back();
    }
}
