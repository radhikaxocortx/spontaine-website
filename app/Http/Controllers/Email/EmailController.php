<?php

namespace App\Http\Controllers\Email;

use App\Http\Controllers\Controller;
use App\Mail\AdminMailForCustomerRegister;
use App\Mail\RegisteredCustomerMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function customerRegisterEmail(Request $request)
    {

        Mail::to($request->email)->send(new RegisteredCustomerMail($request->email, $request->name));

        return redirect()->route('customer-login')->with(['message' => 'Your details are registered in Kadodo Africe, please check your email.']);
    }

    public function customerRegisterAdminEmail(Request $request)
    {

        Mail::to(User::pluck('email')->toArray())
            ->send(new AdminMailForCustomerRegister(['email' => $request->email, 'name' => $request->name, 'phone' => $request->phone]));

        return redirect()->route('customer-register-email', ['email' => $request->email, 'name' => $request->name]);
    }
}
