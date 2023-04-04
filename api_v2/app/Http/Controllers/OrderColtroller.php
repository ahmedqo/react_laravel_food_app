<?php

namespace App\Http\Controllers;

use App\Mail\OrderMail;
use App\Mail\StatusMail;
use App\Models\Item;
use App\Models\Order;
use App\Models\Reference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;


class OrderColtroller extends Controller
{
    public function index()
    {
        $data = [];
        $orders = [];
        $references = Reference::with('user')->latest()->get();
        foreach ($references as $reference) {
            $d = Order::where('reference', $reference->id)->first();
            if ($d) {
                $d['reference'] = $reference->id;
                $d['total'] = $reference->total;
                $d['status'] = $reference->status;
                $d['user'] = @json_decode(json_encode($reference), true)['user'];
                array_push($orders, $d);
            }
        }
        foreach ($orders as $order) {
            $order['items'] = Item::with('product')->where('reference', $order->reference)->latest()->get();
            array_push($data, $order);
        }

        return response()->json([
            'data' => $orders,
            'status' => [
                'type' => 'success'
            ]
        ]);
    }

    public function show($id)
    {
        $order = Order::where('id', $id)->first();
        $reference = Reference::with('user')->where('id', $order->reference)->first();
        $order['items'] = Item::with('product')->where('reference', $reference->id)->latest()->get();
        $order['reference'] = $reference->id;
        $order['total'] = $reference->total;
        $order['status'] = $reference->status;
        $order['user'] = @json_decode(json_encode($reference), true)['user'];

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

        $reference = Reference::create([
            'user' => $request->user()->id,
            'total' => $request->total,
        ]);

        $order = Order::create([
            'reference' => $reference->id,
            'shipping' => $request->shipping,
        ]);

        foreach ($request->items as $item) {
            Item::create([
                'reference' => $reference->id,
                'product' => $item['product'],
                'quantity' => $item['quantity'],
            ]);
        }

        $order['items'] = Item::with('product')->where('reference', $reference->id)->latest()->get();
        $ship = @json_decode($order->shipping, true);

        $mail = new OrderMail(
            [
                'order' => $order->id,
                'total' => $reference->total,
                'type' => $ship['type'],
                'address' => $ship['address'],
                'comment' => $ship['comment'],
                'items' => @json_decode(json_encode($order['items']), true)
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

        $order = Order::where('id', $id)->first();
        $reference = Reference::find($order->reference)->update($request->toArray());

        $reference = Reference::with('user')->where('id', $order->reference)->first();
        $order['items'] = Item::with('product')->where('reference', $reference->id)->latest()->get();
        $order['reference'] = $reference->id;
        $order['total'] = $reference->total;
        $order['status'] = $reference->status;
        $order['user'] = @json_decode(json_encode($reference), true)['user'];

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
                'id' => $id,
                'name' => $order['user']['username'],
                'type' => 0
            ]
        );

        Mail::to($order['user']['email'])->send($mail);

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
        $order = Order::where('id', $id)->first();
        Reference::destroy($order->reference);

        return response()->json([
            'data' => [],
            'status' => [
                'message' => 'Order deleted successfully',
                'type' => 'success',
            ],
        ]);
    }
}
