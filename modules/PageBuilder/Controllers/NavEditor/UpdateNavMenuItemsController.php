<?php

declare(strict_types=1);

namespace Modules\PageBuilder\Controllers\NavEditor;

use Exception;
use Illuminate\Http\RedirectResponse;
use Modules\PageBuilder\Models\UIBuilder\NavMenuItem;
use Modules\PageBuilder\Request\UIEditor\UpdateNavMenuItemsRequest;

final class UpdateNavMenuItemsController
{
    public function __invoke(
        int $id,
        UpdateNavMenuItemsRequest $request
    ): RedirectResponse {
        $validated = $request->validated();

        try {
            NavMenuItem::where('id', $id)
                ->update([
                    'items' => $validated['data'],
                    'updated_by' => request()->user()?->id,
                ]);
        } catch (Exception $e) {
            return redirect()->back()
                ->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()
            ->with([
                'message' => 'Updated Nav Menu Items',
            ]);
    }
}
