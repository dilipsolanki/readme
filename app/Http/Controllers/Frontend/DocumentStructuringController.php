<?php
namespace App\Http\Controllers\Frontend;
use App\Events\InvokeLambda;
use App\Http\Controllers\Controller;
use App\Jobs\InvokeLambdaForDocumentStructuring;
use App\Models\DocumentStructuring;
use App\Models\DocumentStructuringSuggestion;
use Illuminate\Http\Request;
use AWS;
use Auth;
use Aws\Credentials\CredentialProvider;
use Aws\S3\S3Client;
use Aws\Lambda\LambdaClient;

class DocumentStructuringController extends Controller
{
    public function index()
    {
        return view('frontend.ds.index');
    }
}
