<?php

namespace App\Http\Livewire\Hubble;

use Livewire\Component;
use App\Models\Hubble;

class CheckStatusForUploadedFileUsingFetchID extends Component
{
    public $hubble;
    public $status = 'default';

    protected $listeners = ['check_status_for_fetch_id_file_upload' => 'checkStatusForFileUpload'];

    public function mount($hubble)
    {
        $this->hubble = $hubble;
    }

    public function checkStatusForFileUpload($hubble)
    {
        $this->hubble = $hubble;
        $hubbleInConsideration = Hubble::whereFetchId($this->hubble['fetch_id'])->first()->toArray();
        if (isset($hubbleInConsideration['file_status']) && in_array($hubbleInConsideration['file_status'], ['success', 'failed'])) {
            $this->status = $hubbleInConsideration['file_status'];
            $this->emit('success_rcvd_for_file_now_back_to_parent');
        }
    }
    public function render()
    {
        if ($this->hubble['fetch_id'] && is_numeric($this->hubble['id']) && ($this->status != 'success' || $this->status != 'failed'))
            $this->checkStatusForFileUpload($this->hubble);
        return view('livewire.frontend.hubble.check-status-for-uploaded-file-using-fetch-i-d');
    }
}
