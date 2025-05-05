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
                // ['action' => 'person.viewAny', 'allowed_attributes' => null],
                // ['action' => 'person.view', 'allowed_attributes' => null],
                // ['action' => 'person.create', 'allowed_attributes' => null],
                // ['action' => 'person.update', 'allowed_attributes' => null],
                // ['action' => 'person.delete', 'allowed_attributes' => null],
                // ['action' => 'training-activity.viewAny', 'allowed_attributes' => null],
                // ['action' => 'training-activity.view', 'allowed_attributes' => null],
                // ['action' => 'training-activity.create', 'allowed_attributes' => null],
                // ['action' => 'training-activity.update', 'allowed_attributes' => null],
                // ['action' => 'training-activity.delete', 'allowed_attributes' => null],
                // ['action' => 'training.viewAny', 'allowed_attributes' => null],
            ],
        ],

    ],
];
