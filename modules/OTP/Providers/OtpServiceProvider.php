<?php

namespace Modules\OTP\Providers;

use Illuminate\Support\ServiceProvider;

class OtpServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__.'/../Database/Migrations');

        $this->mergeConfigFrom(__DIR__.'/../OtpConfig.php', 'otp');

        $this->loadViewsFrom(__DIR__.'/../views', 'otp');

    }
}
