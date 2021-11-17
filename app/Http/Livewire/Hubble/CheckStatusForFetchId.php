<?php

namespace App\Http\Livewire\Hubble;

use App\Models\Hubble;
use Livewire\Component;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class CheckStatusForFetchId extends Component
{
    public $status = '';
    public $jsonResult = '';
    public $hubble;
    protected $hubbleContentApiUrl;
    protected $hubbleConfigOptions;
    protected $authorizationToken;

    protected $listeners = [
        'check_status_for_fetch_id' => 'checkStatus'
    ];

    public function mount($hubble)
    {
        $this->hubble = $hubble;
    }

    public function checkStatus($hubble)
    {
        $this->hubble = $hubble;

        if ($this->hubble['fetch_id'] && is_numeric($this->hubble['id'])) {
            $this->hubbleConfigOptions = json_decode($this->hubble['data'], true);
            // LYNX customization
            if ($this->hubbleConfigOptions['model'] == 3) {
                $this->hubbleContentApiUrl = config('constants.hubble_lynx_fetch_url');
                // 'https://test.hubble.cactuslabs.io/api/v1/fetch';
                $this->authorizationToken = config('constants.hubble_lynx_token');
                // 'lAa0lNdzCFnUMZhtkNEN6SUGZoisVUHM2L4OZiyD2CA';
            } else {
                $this->hubbleContentApiUrl = config('constants.hubble_api_fetch_url');
                $this->authorizationToken = config('constants.hubble_auth_token');
                // 'mfXb4kriPdphYWBwbF9qfkYuxrOLOJE-shVK5Eu_yKg';
            }
            // Required headers.
            $paramsToGetDataFromHubbleApiUsingFetchID = [
                'headers' => [
                    'Accept'        => 'application/json',
                    'Content-type'  => 'application/json',
                    'Authorization' => 'Bearer ' . $this->authorizationToken,
                ],
                'query'   => ['fetch_id' => $this->hubble['fetch_id']],
            ];

            try {
                $client = new Client([
                    'verify' => false, // to be removed
                ]);

                $response = $client->get($this->hubbleContentApiUrl, $paramsToGetDataFromHubbleApiUsingFetchID);
                $result = $response->getBody()->getContents();
                if ($result) {
                    $this->jsonResult = $result;
                    $originalResult = json_decode($result);
                    $this->status = $originalResult->status;
                    if ($originalResult->status == 'success') {
                        $this->emit('success_rcvd_back_to_parent', $result);
                    }
                }
            } catch (\Exception $e) {
                Log::info('Hubble API Exception Error in CheckStatusForFetchId: ' . $e->getMessage());
            }
        }
    }

    public function render()
    {
        if ($this->hubble['fetch_id'] && is_numeric($this->hubble['id']) && ($this->status != 'success' || $this->status != 'failed'))
            $this->checkStatus($this->hubble);

        return view('livewire.frontend.hubble.check-status-for-fetch-id');
    }
}
