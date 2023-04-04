<?php

namespace App\Http\Controllers;

use App\Mail\ForgotMail;
use App\Models\Item;
use App\Models\Order;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users',
            'email' => 'required|string|unique:users',
            'phone' => 'required|string',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => $validator->errors()->all(),
                    'type' => 'error',
                ],
            ]);
        }

        $request['password'] = Hash::make($request->password);
        $request['remember_token'] = Str::random(10);
        $user = User::create($request->toArray());

        return response()->json([
            'data' => $user,
            'status' => [
                'message' => 'User created successfully',
                'type' => 'success',
            ],
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => $validator->errors()->all(),
                    'type' => 'error',
                ],
            ]);
        }

        $user = User::where('username', $request->username)->first();

        if (!$user) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => 'User do not exsist',
                    'type' => 'error',
                ]
            ]);
        }

        if ($user && !Hash::check($request->password, $user->password)) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => 'Password missmatch',
                    'type' => 'error',
                ]
            ]);
        }

        $token = $user->createToken('Laravel Password Grant Client')->accessToken;

        Cookie::queue('role', $user->role);
        Cookie::queue('token', $token);

        return response()->json([
            'data' => [
                'token' => $token,
                'type' => 'Bearer',
                'user' => $user
            ],
            'status' => [
                'type' => 'success',
            ]
        ]);
    }

    public function forgot(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => $validator->errors()->all(),
                    'type' => 'error',
                ],
            ]);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => 'User do not exsist',
                    'type' => 'error',
                ]
            ]);
        }

        $token = Str::random(50);
        DB::table('password_resets')->insert([
            'email' => $user->email,
            'token' => $token,
        ]);

        $mail = new ForgotMail(
            [
                'name' => $user->username,
                'token' => $token,
            ]
        );

        Mail::to($user->email)->send($mail);

        return response()->json([
            'data' => [],
            'status' => [
                'message' => 'Check your email to reset password',
                'type' => 'success',
            ]
        ]);
    }

    public function reset(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => $validator->errors()->all(),
                    'type' => 'error',
                ],
            ]);
        }

        $row = DB::table('password_resets')->where('token', $request->token)->first();

        if (!$row) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => 'Invalid token',
                    'type' => 'error',
                ]
            ]);
        }

        $user = User::where('email', $row->email)->first();

        if (!$user) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => 'User do not exsist',
                    'type' => 'error',
                ]
            ]);
        }

        DB::table('password_resets')->where('token', $request->token)->delete();
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'data' => [],
            'status' => [
                'message' => 'Password changed successfully',
                'type' => 'success',
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        Cookie::delete('token');
        Cookie::delete('role');

        return response()->json([
            'data' => [],
            'status' => [
                'message' => 'Successfully logged out',
                'type' => 'success',
            ]
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'data' => $request->user(),
            'status' => [
                'type' => 'success'
            ]
        ]);
    }

    public function profile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username,' . $request->user()->id,
            'email' => 'required|string|unique:users,email,' . $request->user()->id,
            'phone' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => $validator->errors()->all(),
                    'type' => 'error',
                ],
            ]);
        }

        User::find($request->user()->id)->update($request->toArray());

        return response()->json([
            'data' => User::find($request->user()->id),
            'status' => [
                'message' => 'Profile updated successfully',
                'type' => 'success'
            ]
        ]);
    }

    public function password(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old' => 'required|string',
            'new' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => $validator->errors()->all(),
                    'type' => 'error',
                ],
            ]);
        }

        if (!Hash::check($request->old, $request->user()->password)) {
            return response()->json([
                'data' => [],
                'status' => [
                    'message' => 'Old password missmatch',
                    'type' => 'error',
                ]
            ]);
        }

        $request['password'] = Hash::make($request->new);
        $request['remember_token'] = Str::random(10);

        User::find($request->user()->id)->update($request->toArray());

        return response()->json([
            'data' => User::find($request->user()->id),
            'status' => [
                'message' => 'Password updated successfully',
                'type' => 'success'
            ]
        ]);
    }

    public function orders(Request $request)
    {
        $data = [];
        $orders = Order::where('user', $request->user()->id)->latest()->get();
        foreach ($orders as $order) {
            $order['items'] = $order['items'] = Item::with('product')->where('order', $order->id)->latest()->get();
            array_push($data, $order);
        }

        return response()->json([
            'data' => $data,
            'status' => [
                'type' => 'success',
            ]
        ]);
    }
}
