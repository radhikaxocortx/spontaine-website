<?php

namespace Modules\PageBuilder\Providers;

use Inertia\ServiceProvider;

class PageBuilderServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__.'/../Database/Migrations');

        $this->mergeConfigFrom(__DIR__.'/../PageBuilderConfig.php', 'page-builder');

        $this->app->register(PageBuilderRouteProvider::class);
    }
}
