<?php

namespace App\Repository\Footer;

use App\Models\UIBuilder\Footer;

class FooterRepository
{
    /**
     * @param  array<array-key, mixed>  $data
     */
    public function create(array $data): Footer
    {
        return Footer::create([
            'items' => $data,
            'created_by' => request()->user()?->id,
            'updated_by' => request()->user()?->id,
        ]);
    }

    public function getFooter(): Footer|null
    {
        return Footer::first();
    }

    /**
     * @param  array<array-key, mixed>  $data
     */
    public function update(int $id, array $data): int
    {
        return Footer::where('id', $id)
            ->update([
                'items' => $data,
                'updated_by' => request()->user()?->id,
            ]);
    }
}
