<?php

namespace Database\Seeders\Providers;

use App\Models\Country\Country;
use App\Models\Customer\CustomerPricePlan;
use App\Models\EntityTemplate\EntityTemplate;
use App\Models\EntityTemplate\EntityTemplateItem;
use App\Models\PricePlan\PricePlan;
use App\Models\ReferenceData\ReferenceData;
use App\Models\Workflow\Workflow;
use App\Policies\CountryPolicy;
use App\Policies\CustomerPricePlanPolicy;
use App\Policies\PriceplanPolicy;
use App\Policies\ReferenceDataPolicy;
use App\Policies\WorkflowItemPolicy;
use App\Policies\WorkflowModulePolicy;
use App\Policies\WorkflowPolicy;
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
        Gate::policy(PricePlan::class, PriceplanPolicy::class);
        Gate::policy(Workflow::class, WorkflowPolicy::class);
        Gate::policy(EntityTemplate::class, WorkflowModulePolicy::class);
        Gate::policy(EntityTemplateItem::class, WorkflowItemPolicy::class);
        Gate::policy(CustomerPricePlan::class, CustomerPricePlanPolicy::class);
    }
}
