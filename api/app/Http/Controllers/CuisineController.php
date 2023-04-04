<?php

namespace App\Http\Controllers;

use App\Models\Cuisine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CuisineController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Cuisine::all(),
            'status' => [
                'type' => 'success'
            ]
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Cuisine::find($id),
            'status' => [
                'type' => 'success'
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'label' => 'required|string|unique:cuisines',
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

        $cuisine = Cuisine::create($request->toArray());

        return response()->json([
            'data' => $cuisine,
            'status' => [
                'message' => 'Cuisine created successfully',
                'type' => 'success',
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'label' => 'required|string|unique:cuisines,label,' . $id,
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

        Cuisine::find($id)->update($request->toArray());

        return response()->json([
            'data' => Cuisine::find($id)->first(),
            'status' => [
                'message' => 'Cuisine updated successfully',
                'type' => 'success',
            ],
        ]);
    }

    public function destroy($id)
    {
        Cuisine::destroy($id);

        return response()->json([
            'data' => [],
            'status' => [
                'message' => 'Cuisine deleted successfully',
                'type' => 'success',
            ],
        ]);
    }
}
