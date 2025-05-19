<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Modules\PageBuilder\Models\UIBuilder\Footer;
use Modules\PageBuilder\Repository\NavMenu\NavMenuRepository;
use Modules\Permission\Services\Roles\FindRoleInfo;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $role = null;
        if ($user = $request->user()) {
            $role = app(FindRoleInfo::class)->findRole($user->role ?? '');
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'customer' => Auth::guard('customer')->user(),
                'role' => $role,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'nav' => fn () => app(NavMenuRepository::class)->getAll(),
            'lang' => fn () => $request->session()->get('lang', 'en'),
            'footer' => fn () => [
                'items' => Footer::first()->items ?? [],
            ],
        ];
    }
}
