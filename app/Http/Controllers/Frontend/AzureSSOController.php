<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use Session;

class AzureSSOController extends Controller
{
    public function registerUser()
    {
        $social_user = Socialite::driver('azure')->stateless()->user();

        $user = User::firstOrCreate(
            ['email' => $social_user->getEmail()],
            [
                'name' => $social_user->getName(),
                'password' => Hash::make(Str::random(8))
            ]
        );

        $user->assignRole('member');

        Auth::login($user);

        return redirect()->route('dashboard');
    }

    public function logoutUser()
    {
        Session::flush();
        Auth::logout();

        if (!App::environment('local')) {
            return redirect()->away('https://login.microsoftonline.com/762d8873-d777-4e7f-bb6b-e4d2cccca312/oauth2/v2.0/logout');
        }

        return redirect('/');
    }
}
