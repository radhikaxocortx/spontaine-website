<?php

namespace App\Services\Footer;

use Illuminate\Http\RedirectResponse;
use Modules\PageBuilder\Repository\Footer\FooterRepository;

class FooterCreate
{
    public function __construct(private FooterRepository $footerRepository) {}

    /**
     * @param  array<array-key, mixed>  $data
     */
    public function create(array $data): RedirectResponse
    {
        $alreadyExists = $this->footerRepository->getFooter();

        if ($alreadyExists == null) {
            return $this->createNew($data);
        }

        return $this->updateItem($alreadyExists->id, $data);
    }

    /**
     * @param  array<array-key, mixed>  $data
     */
    private function createNew(array $data): RedirectResponse
    {
        $record = $this->footerRepository->create($data);
        if ($record == null) {
            return redirect()
                ->back()
                ->with(['error' => 'Failed To Create Record']);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Footer Updated Successfully']);
    }

    /**
     * @param  array<array-key, mixed>  $data
     */
    private function updateItem(int $id, array $data): RedirectResponse
    {
        $record = $this->footerRepository->update($id, $data);
        if ($record == null) {
            return redirect()
                ->back()
                ->with(['error' => 'Failed To Update Record']);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Footer Updated Successfully']);
    }
}
