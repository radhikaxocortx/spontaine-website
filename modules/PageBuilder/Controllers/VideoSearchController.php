<?php

namespace Modules\PageBuilder\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\PageBuilder\Models\Video;

class VideoSearchController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $files = Video::when($request->filled('search'), function ($query) use ($request) {
            $query->where('name', 'LIKE', "%$request->search%");
        })
            ->orderBy('created_at', 'desc')
            ->paginate(8);

        return response()->json($files);
    }
}
