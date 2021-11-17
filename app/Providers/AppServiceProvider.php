<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Horizon\Horizon;
use App\Models\ModelHasRoles;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Support\Facades\DB;
use BeyondCode\ServerTiming\Facades\ServerTiming as Stopwatch;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        DB::listen(function ($query): void {
            $previous = Stopwatch::getDuration('Database') ?? 0;
            Stopwatch::setDuration('Database', $previous + $query->time);
        });

        Horizon::auth(function ($request) {
            $getUserRoleId = ModelHasRoles::where('model_id', auth()->id())->pluck('role_id')->toArray();
            if (in_array(1, $getUserRoleId)) {
                return true;
            } else {
                return false;
            }
        });
    }
}
