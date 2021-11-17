<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Session;

class CustomAuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }


    public function customLogin(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return redirect()->intended('dashboard')
                ->withSuccess('Signed in');
        }

        return redirect()->route('labs-login')->withSuccess('Login details are not valid');
    }

    public function labsLogOut()
    {
        Session::flush();
        Auth::logout();

        return redirect()->route('labs-login');
    }
}
