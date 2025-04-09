<?php

namespace App\Services;

use App\Http\Requests\Workflow\WorkflowInfo;
use App\Libs\SaveFile;

trait ProcessWorkflowInfo
{
    use SaveFile;

    /**
     * @param  WorkflowInfo[]|$additionalInfo
     * @return array{
     *     0: array<int, array{
     *         workflow_item_id: int,
     *         value: string|null,
     *         number_value: int|null,
     *         date_value: string|null,
     *         mime_type: string|null,
     *         created_at: string,
     *         updated_at: string,
     *         id: int|null
     *     }>,
     *     1: string[]
     * }
     */
    private function process(array $additionalInfo, $filesTargetDir): array
    {
        $infoRecords = [];
        $filesToCleanUp = [];

        $time = now()->toDateTimeString();

        // $fileSaver = new SaveFile;

        $additionalInfo = array_map(function ($item) {

            if (isset($item['value']) && is_array($item['value'])) {
                $item['value'] = implode(',', $item['value']);
            }

            if (isset($item['file']) && is_array($item['file'])) {
                $item['file'] = request()->file("additionalInfo.{$item['workflowItemId']}.file");
            }

            return WorkflowInfo::from($item);
        }, $additionalInfo);

        foreach ($additionalInfo as $info) {
            $fieldType = $this->getType($info);
            if ($info->file == null && $fieldType === 'file') {
                continue;
            }

            $fileName = null;
            if ($fieldType === 'file') {
                // need to add owner record id to file name
                $fileName = $filesTargetDir.'/'.$this->save($info->file, time(), $filesTargetDir, false);
                $filesToCleanUp[] = $fileName;
            }

            $record = [
                'workflow_item_id' => $info->workflowItemId,
                'value' => $fieldType === 'text' ? $info->value : ($fieldType === 'file' ? $fileName : null),
                'number_value' => $fieldType === 'number' ? $info->value : null,
                'date_value' => $fieldType === 'date' ? $info->value : null,
                'mime_type' => $fieldType == 'file' ? $info->file->getClientMimeType() : null,
                'created_at' => $time,
                'updated_at' => $time,
            ];

            if (isset($info->oldRecordId)) {
                $record['id'] = $info->oldRecordId;
            }

            $infoRecords[] = $record;
        }

        return [
            $infoRecords,
            $filesToCleanUp,
        ];
    }

    public function getType(WorkflowInfo $additionalInfo): string
    {
        if ($additionalInfo->type === 'date') {
            return 'date';
        }
        if ($additionalInfo->type === 'number') {
            return 'number';
        }
        if (
            $additionalInfo->type === 'image' ||
            $additionalInfo->type === 'word_document' ||
            $additionalInfo->type === 'pdf'
        ) {
            return 'file';
        }

        return 'text';
    }
}
