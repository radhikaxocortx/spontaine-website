<?php

use Database\Seeders\Providers\AppServiceProvider;
use Modules\OTP\Providers\OtpServiceProvider;
use Modules\PageBuilder\Providers\PageBuilderServiceProvider;
use Modules\Permission\Providers\PermissionServiceProvider;

return [
    AppServiceProvider::class,
    PageBuilderServiceProvider::class,
    OtpServiceProvider::class,
    PermissionServiceProvider::class,
];
