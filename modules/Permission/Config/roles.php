<?php

declare(strict_types=1);

return [
    'roles' => [
        [
            'role' => 'Admin',
            'is_admin' => true,
            'actions' => [

            ],
        ],
        [
            'role' => 'Verifier',
            'is_admin' => false,
            'actions' => [
                ['action' => 'customer-priceplan.viewAny', 'allowed_attributes' => null],
                ['action' => 'customer-priceplan.view', 'allowed_attributes' => null],
                ['action' => 'customer-priceplan.create', 'allowed_attributes' => null],
                ['action' => 'customer-priceplan.update', 'allowed_attributes' => null],
                ['action' => 'customer-priceplan.delete', 'allowed_attributes' => null],

            ],
        ],

    ],
];
