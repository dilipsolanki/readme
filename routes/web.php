<?php

use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\PermissionController;
use App\Http\Controllers\Backend\RoleController;
use App\Http\Controllers\Backend\ToolsController;
use App\Http\Controllers\Backend\UserController;
use App\Http\Controllers\Backend\ToolNavigationController;

use App\Http\Controllers\Frontend\AzureSSOController;
use App\Http\Controllers\Frontend\CustomAuthController;
use App\Http\Controllers\Frontend\DashboardController as FrontendDashboardController;
use App\Http\Controllers\Frontend\HubbleController;
use App\Http\Controllers\Frontend\HubbleFileUploadCallbackController;
use App\Http\Controllers\Frontend\SuggestionsController;
use App\Models\FeedbackSuggestion;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
})->name('homepage');

// Production Authentication Routes
if (!App::environment('local')) {
    Route::get('/login', function () {
        return Socialite::driver('azure')->stateless()->redirect();
    })->name('login');

    Route::get('login/azure/callback', [AzureSSOController::class, 'registerUser']);

    Route::get('/logout', [AzureSSOController::class, 'logoutUser'])->name('logout');
}

$enableViews = config('fortify.views', true);

// Authentication...
if ($enableViews) {
    Route::get('labs-login', [AuthenticatedSessionController::class, 'create'])
        // ->middleware(['guest:' . config('fortify.guard')])
        ->name('labs-login');
}

$limiter = config('fortify.limiters.login');

Route::post('labs-login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(array_filter([
        'guest:' . config('fortify.guard'),
        $limiter ? 'throttle:' . $limiter : null,
    ]))
    ->name('labs-login-post');

// Route::post('labs-logout', [AuthenticatedSessionController::class, 'destroy'])
//     ->name('labs-logout');

// Fallback routes that can be used to login with local users.
// Route::get('/labs-login', [CustomAuthController::class, 'showLoginForm'])->name('labs-login');
// Route::post('/labs-login', [CustomAuthController::class, 'customLogin'])->name('login.custom');
Route::post('labs-logout', [CustomAuthController::class, 'labsLogOut'])->name('labs-logout');

Route::post('hubble/callback', [HubbleFileUploadCallbackController::class, 'index'])->name('hubble.callback');

Route::middleware(['auth'])->get('/dashboard', [FrontendDashboardController::class, 'index'])->name('dashboard')->breadcrumb('Dashboard');

Route::get('hubble/history', [HubbleController::class, 'history'])->middleware(['auth', 'role:administrator|hubble'])->name('hubble.history')->breadcrumb('History', 'dashboard.hubble');
Route::get('hubble/delete/{id}', [HubbleController::class, 'delete'])->middleware(['auth', 'role:administrator|hubble'])->name('hubble.delete');

Route::group(['as' => 'actions.', 'middleware' => ['auth', 'role:administrator|member']], function () {
    Route::post('/save-suggestion', [SuggestionsController::class, 'saveSuggestions'])->name('spell-check.save-suggestions');
    Route::post('/save-feedback', [FeedbackSuggestion::class, 'saveFeedback'])->name('spell-check.save-feedback');
    Route::post('/save-faves', [FrontendDashboardController::class, 'saveFavorites'])->name('save-faves');
});

/*
*
* Backend Routes
* These routes need can only be accessed by role:administrator
* ------------------------------------------------------------
*/
Route::group([
    'prefix' => 'admin',
    'as' => 'backend.',
    'middleware' => ['auth', 'role:administrator']
], function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::group(['middleware' => ['role:administrator']], function () {
        Route::resource('users', UserController::class);
        Route::resource('roles', RoleController::class);
        Route::resource('permissions', PermissionController::class);
        Route::resource('tools', ToolsController::class);
        Route::resource('navigation', ToolNavigationController::class);
    });
});
