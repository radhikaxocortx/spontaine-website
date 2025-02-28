<?php

namespace Modules\Request;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class PageBuilderFormRequest extends Data
{
    public function __construct(
        public string $title,
        public ?string $pageTitle,
        public ?string $description,
        public string $url,
        public bool $published,
        public string $type,
        public ?UploadedFile $previewImage,

    ) {}
}
