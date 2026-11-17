<?php

declare(strict_types=1);

use App\Models\User;
use Modules\PageBuilder\Models\UIBuilder\NavMenuItem;

function navMenuSectionsPayload(): array
{
    return [
        'data' => [
            'lastUUID' => 1,
            'items' => [
                [
                    'id' => 1,
                    'lastUUID' => 1,
                    'section' => ['english' => 'By situation', 'malayalam' => null],
                    'links' => [
                        [
                            'id' => 1,
                            'name' => ['english' => 'Grown by acquisition', 'malayalam' => null],
                            'link' => '/solutions/buy-and-build',
                            'external' => false,
                            'description' => [
                                'english' => 'Comparable numbers across every company you own.',
                                'malayalam' => null,
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ];
}

function createNavMenuItem(): NavMenuItem
{
    return NavMenuItem::create([
        'title' => 'Solutions',
        'is_link' => 0,
        'items' => ['lastUUID' => 0, 'items' => []],
        'position' => 2,
    ]);
}

test('guests cannot save nav menu sections', function () {
    $menu = createNavMenuItem();

    $this->post("/nav-editor/{$menu->id}/sections", navMenuSectionsPayload())
        ->assertRedirect(route('login'));

    expect($menu->fresh()->items['items'])->toBe([]);
});

test('signed-in users can save nav menu sections with link descriptions', function () {
    $menu = createNavMenuItem();

    $this->actingAs(User::factory()->create())
        ->post("/nav-editor/{$menu->id}/sections", navMenuSectionsPayload())
        ->assertSessionHasNoErrors()
        ->assertRedirect();

    expect($menu->fresh()->items['items'][0]['links'][0]['description']['english'])
        ->toBe('Comparable numbers across every company you own.');
});

test('guests cannot open or change the footer editor', function () {
    $this->get('/footer-editor')->assertRedirect(route('login'));
    $this->post('/footer-editor', ['data' => []])->assertRedirect(route('login'));
});

test('signed-in users can open the footer editor', function () {
    $this->actingAs(User::factory()->create())
        ->get('/footer-editor')
        ->assertOk();
});
