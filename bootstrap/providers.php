<?php

use Database\Seeders\Providers\AppServiceProvider;
use Modules\OTP\Providers\OtpServiceProvider;
use Modules\PageBuilder\Providers\PageBuilderServiceProvider;

return [
    AppServiceProvider::class,
    PageBuilderServiceProvider::class,
    OtpServiceProvider::class,
];
