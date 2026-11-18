<?php

declare(strict_types=1);

use Database\Seeders\IndustrialGroupsPageSeeder;
use Inertia\Testing\AssertableInertia as Assert;
use Modules\PageBuilder\Models\Page;

test('the seeder creates the published industrial-groups page', function () {
    $this->seed(IndustrialGroupsPageSeeder::class);

    $page = Page::where('url', 'industrial-groups')->firstOrFail();

    expect($page->published)->toBeTrue()
        ->and(collect($page->blocks['blocks'])->pluck('blockName')->all())->toBe([
            'Spontaine V3 - Hero Large',
            'Spontaine V3 - Pillars Row',
            'Spontaine V3 - Feature Split',
            'Spontaine V3 - Facts Row',
            'Spontaine V3 - Accordion',
            'Spontaine V3 - Feature Split',
            'Spontaine V3 - Worked Example',
            'Spontaine V3 - Steps',
            'Spontaine V3 - Trust Band',
            'Spontaine V3 - Accordion',
            'Spontaine V3 - CTA',
        ]);
});

test('the industrial-groups page renders through the page builder', function () {
    $this->seed(IndustrialGroupsPageSeeder::class);

    $this->get('/industrial-groups')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('PageBuilder/ViewBuilderPage')
            ->where('page.url', 'industrial-groups'));
});

test('the seeder leaves an existing page untouched', function () {
    $this->seed(IndustrialGroupsPageSeeder::class);
    Page::where('url', 'industrial-groups')->update(['title' => 'Edited in the builder']);

    $this->seed(IndustrialGroupsPageSeeder::class);

    expect(Page::where('url', 'industrial-groups')->count())->toBe(1)
        ->and(Page::where('url', 'industrial-groups')->value('title'))->toBe('Edited in the builder');
});
