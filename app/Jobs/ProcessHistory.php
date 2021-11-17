<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\CentralStoringHistory;
use Illuminate\Contracts\Queue\ShouldBeUniqueUntilProcessing;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;


class ProcessHistory implements ShouldQueue, ShouldBeUniqueUntilProcessing
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $data  = [];

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // if ($this->data['tool_name'] == 'SC') {
        //     $this->data['update_id'] = CentralStoringHistory::whereToolName('SC')->whereUserId(user()->id)->count() + 1;
        // }

        CentralStoringHistory::updateOrCreate(
            [
                'update_id' => $this->data['update_id'],
                'user_id' => $this->data['user_id'],
                'tool_id' => $this->data['tool_id'],
                'tool_name' => $this->data['tool_name'],
            ],
            [
                'request_payload' => ($this->data['request_payload'] ?? null),
                'is_file_content' => ($this->data['is_file_content']) ?? 0,
                'response_payload' => ($this->data['response_payload'] ?? null),
            ]
        );
    }

    /**
     * Get the tags that should be assigned to the job.
     *
     * @return array
     */
    public function tags()
    {
        $tagArray = ['history', 'tool_name:' . $this->data['tool_name'], 'user_id:' . $this->data['user_id']];
        if (isset($this->data['fetch_id']) && !blank($this->data['fetch_id']))
            array_push($tagArray, 'fetch_id:' . $this->data['fetch_id']);
        return $tagArray;
    }
}
