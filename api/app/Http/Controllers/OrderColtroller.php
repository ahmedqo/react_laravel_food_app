<?php

namespace App\Http\Controllers;

use App\Mail\OrderMail;
use App\Mail\StatusMail;
use App\Models\Item;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;


class OrderColtroller extends Controller
{
    public function index()
    {
        $data = [];
        $orders = Order::with('user')->latest()->get();
        foreach ($orders as $order) {
            $order['items'] = Item::with('product')->where('order', $order->id)->latest()->get();
            array_push($data, $order);
        }

        return response()->json([
            'data' => $data,
            'status' => [
                'type' => 'success'
            ]
        ]);
    }

    public function show($id)
    {
        $order = Order::with('user')->where('id', $id)->first();
        $order['items'] = Item::with('product')->where('order', $order->id)->latest()->get();

        return response()->json([
            'data' => $order,
            'status' => [
                'type' => 'success'
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'shipping' => 'required|string',
            'total' => 'required',
            'items' => 'required',
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

        $request['user'] = $request->user()->id;

        $order = Order::create($request->toArray());

        foreach ($request->items as $item) {
            Item::create([
                'order' => $order->id,
                'product' => $item['product'],
                'quantity' => $item['quantity'],
            ]);
        }

        $order['items'] = Item::with('product')->where('order', $order->id)->latest()->get();
        $ship = json_decode($order->shipping, true);

        $mail = new OrderMail(
            [
                'order' => $order->id,
                'total' => $order->total,
                'type' => $ship['type'],
                'address' => $ship['address'],
                'comment' => $ship['comment'],
                'items' => json_decode(json_encode($order['items']), true)
            ]
        );

        Mail::to($request->user()->email)->send($mail);

        return response()->json([
            'data' => $order,
            'status' => [
                'message' => 'Order created successfully',
                'type' => 'success',
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required',
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

        Order::find($id)->update($request->toArray());
        $order = Order::with('user')->where('id', $id)->first();
        $order['items'] = Item::with('product')->where('order', $order->id)->latest()->get();
        $user = json_decode(json_encode($order), true)['user'];
        $status = -1;
        switch ($request->status) {
            case -1:
                $status = "Annulé";
                break;
            case 0:
                $status = "En attente";
                break;
            case 1:
                $status = "Confirmé";
                break;
            case 2:
                $status = "Préparé";
                break;
            case 3:
                $status = "Terminé";
                break;
            default:
                $status = "En attente";
                break;
        }

        $mail = new StatusMail(
            [
                'status' => $status,
                'order' => $id,
                'name' => $user['username'],
            ]
        );

        Mail::to($user['email'])->send($mail);

        return response()->json([
            'data' => $order,
            'status' => [
                'message' => 'Order updated successfully',
                'type' => 'success',
            ],
        ]);
    }

    public function destroy($id)
    {
        Order::destroy($id);

        return response()->json([
            'data' => [],
            'status' => [
                'message' => 'Order deleted successfully',
                'type' => 'success',
            ],
        ]);
    }
}
