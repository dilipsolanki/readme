<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use auth;
use App\Models\ModelHasRoles;

class EnableDisableDebugger
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        $getUserRoleId = ModelHasRoles::where('model_id', auth()->id())->pluck('role_id')->toArray();
        if (in_array(1, $getUserRoleId)) {
            \Debugbar::enable();
        } else {
            \Debugbar::disable();
        }
        return $next($request);
    }
}
