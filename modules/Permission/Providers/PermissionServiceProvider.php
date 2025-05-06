<?php

declare(strict_types=1);

namespace Modules\Permission\Providers;

use Illuminate\Support\ServiceProvider;

final class PermissionServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void {}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__.'/../Database/Migrations');
        $this->loadViewsFrom(__DIR__.'/../Resources/views', 'permission');

        // Register config file
        $this->mergeConfigFrom(
            __DIR__.'/../Config/permission.php',
            'permission'
        );

        $this->mergeConfigFrom(
            __DIR__.'/../Config/roles.php',
            'permission.roles'
        );

        $this->app->register(PermissionRouteServiceProvider::class);
    }
}
