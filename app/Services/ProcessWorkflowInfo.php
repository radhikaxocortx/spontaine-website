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
        $processedInfo = [];

        foreach ($additionalInfo as $item) {
            $workflowItemId = $item['workflow_item_id'];
            $file = request()->file("additionalInfo.{$workflowItemId}.file") ?? $item['file'] ?? null;

            if (isset($item['value']) && is_array($item['value'])) {
                foreach ($item['value'] as $value) {
                    $newItem = $item;
                    $newItem['value'] = is_array($value) ? json_encode($value) : $value;
                    $newItem['file'] = $file;
                    $processedInfo[] = WorkflowInfo::from($newItem);
                }
            } else {
                $item['value'] = is_array($item['value'] ?? null) ? json_encode($item['value']) : ($item['value'] ?? null);
                $item['file'] = $file;
                $processedInfo[] = WorkflowInfo::from($item);
            }
        }

        foreach ($processedInfo as $info) {
            $fieldType = $this->getType($info);
            if ($info->file == null && $fieldType === 'file') {
                continue;
            }

            $fileName = null;
            if ($fieldType === 'file') {
                $fileName = $filesTargetDir.'/'.$this->save($info->file, time(), $filesTargetDir, false);
                $filesToCleanUp[] = $fileName;
            }

            $record = [
                'workflow_item_id' => $info->workflowItemId,
                'value' => $fieldType === 'text' ? $info->value : ($fieldType === 'file' ? $fileName : null),
                'number_value' => $fieldType === 'number' ? $info->value : null,
                'date_value' => $fieldType === 'date' ? $info->value : null,
                'mime_type' => $fieldType === 'file' ? $info->file->getClientMimeType() : null,
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
