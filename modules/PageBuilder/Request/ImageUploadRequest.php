<?php

namespace Modules\PageBuilder\Request;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\MimeTypes;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ImageUploadRequest extends Data
{
    public function __construct(
        #[Max(5000)]
        #[MimeTypes(['image/jpeg', 'image/png', 'image/webp'])]
        public UploadedFile $file,
        #[Max(255)]
        public string $name,
    ) {}
}
