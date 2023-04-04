<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Product::with('cuisine')->latest()->get(),
            'status' => [
                'type' => 'success'
            ]
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Product::with('cuisine')->where('id', $id)->first(),
            'status' => [
                'type' => 'success'
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cuisine' => 'required',
            'name' => 'required|string|unique:products',
            'description' => 'required|string',
            'price' => 'required',
            'ingridients' => 'required|string',
            'image' => 'required|string'
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

        $product = Product::create($request->toArray());

        return response()->json([
            'data' => $product,
            'status' => [
                'message' => 'Product created successfully',
                'type' => 'success',
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'cuisine' => 'required',
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required',
            'ingridients' => 'required|string',
            'image' => 'required|string'
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

        Product::find($id)->update($request->toArray());

        return response()->json([
            'data' => Product::with('cuisine')->find($id)->first(),
            'status' => [
                'message' => 'Product updated successfully',
                'type' => 'success',
            ],
        ]);
    }

    public function destroy($id)
    {
        Product::destroy($id);

        return response()->json([
            'data' => [],
            'status' => [
                'message' => 'Product deleted successfully',
                'type' => 'success',
            ],
        ]);
    }

    public function top()
    {
        $data = [];
        $sort =  DB::table('items')
            ->select('product',  DB::raw('count(quantity) as total'))
            ->groupBy('product')->take(5)->orderBy('total', 'Desc')->get();

        foreach ($sort as $row) {
            $product = Product::find($row->product);
            array_push($data, $product);
        }

        return response()->json([
            'data' => $data,
            'status' => [
                'type' => 'success',
            ],
        ]);
    }
}
