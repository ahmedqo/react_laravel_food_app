<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => User::all(),
            'status' => [
                'type' => 'success'
            ]
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => User::find($id),
            'status' => [
                'type' => 'success'
            ]
        ]);
    }

    public function store(Request $request)
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

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|string',
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

        User::find($id)->update($request->toArray());

        return response()->json([
            'data' => User::find($id)->first(),
            'status' => [
                'message' => 'User updated successfully',
                'type' => 'success',
            ],
        ]);
    }

    public function destroy($id)
    {
        User::destroy($id);

        return response()->json([
            'data' => [],
            'status' => [
                'message' => 'User deleted successfully',
                'type' => 'success',
            ],
        ]);
    }
}
