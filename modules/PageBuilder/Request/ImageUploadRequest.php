<?php

namespace Modules\PageBuilder\Request;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Mimes;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ImageUploadRequest extends Data
{
    public function __construct(
        #[Max(2000)]
        #[Mimes(['jpeg', 'png', 'webp'])]
        public UploadedFile $file,
        #[Max(255)]
        public string $name,
    ) {}
}
