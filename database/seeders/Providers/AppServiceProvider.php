<?php

namespace Database\Seeders\Providers;

use App\Models\Country\Country;
use App\Models\ReferenceData\ReferenceData;
use App\Policies\CountryPolicy;
use App\Policies\ReferenceDataPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Gate::policy(ReferenceData::class, ReferenceDataPolicy::class);
        Gate::policy(Country::class, CountryPolicy::class);

    }
}
