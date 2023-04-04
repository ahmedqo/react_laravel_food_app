<?php

namespace App\Http\Controllers;

use App\Mail\ReserveMail;
use App\Mail\StatusMail;
use App\Models\Item;
use App\Models\Reference;
use App\Models\Reserve;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ReserveController extends Controller
{
    public function index()
    {
        $data = [];
        $orders = [];
        $references = Reference::with('user')->latest()->get();
        foreach ($references as $reference) {
            $d = Reserve::where('reference', $reference->id)->first();
            if ($d) {
                $d['reference'] = $reference->id;
                $d['total'] = $reference->total;
                $d['status'] = $reference->status;
                $d['user'] = @json_decode(json_encode($reference), true)['user'];
                array_push($orders, $d);
            }
        }
        foreach ($orders as $reserve) {
            $reserve['items'] = Item::with('product')->where('reference', $reserve->reference)->latest()->get();
            array_push($data, $reserve);
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
        $reserve = Reserve::where('id', $id)->first();
        $reference = Reference::with('user')->where('id', $reserve->reference)->first();
        $reserve['items'] = Item::with('product')->where('reference', $reference->id)->latest()->get();
        $reserve['reference'] = $reference->id;
        $reserve['total'] = $reference->total;
        $reserve['status'] = $reference->status;
        $reserve['user'] = @json_decode(json_encode($reference), true)['user'];

        return response()->json([
            'data' => $reserve,
            'status' => [
                'type' => 'success'
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required',
            'time' => 'required',
            'count' => 'required',
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

        $reserve = Reserve::create([
            'reference' => $reference->id,
            'date' => $request->date,
            'time' => $request->time,
            'count' => $request->count,
            'comment' => $request->comment,
        ]);

        foreach ($request->items as $item) {
            Item::create([
                'reference' => $reference->id,
                'product' => $item['product'],
                'quantity' => $item['quantity'],
            ]);
        }

        $reserve['items'] = Item::with('product')->where('reference', $reference->id)->latest()->get();

        $mail = new ReserveMail(
            [
                'reserve' => $reserve->id,
                'total' => $reference->total,
                'date' => $reserve->date,
                'time' => $reserve->time,
                'count' => $reserve->count,
                'comment' => $reserve->comment,
                'items' => @json_decode(json_encode($reserve['items']), true)
            ]
        );

        Mail::to($request->user()->email)->send($mail);

        return response()->json([
            'data' => $reserve,
            'status' => [
                'message' => 'Reservation created successfully',
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

        $reserve = Reserve::where('id', $id)->first();
        $reference = Reference::find($reserve->reference)->update($request->toArray());

        $reference = Reference::with('user')->where('id', $reserve->reference)->first();
        $reserve['items'] = Item::with('product')->where('reference', $reference->id)->latest()->get();
        $reserve['reference'] = $reference->id;
        $reserve['total'] = $reference->total;
        $reserve['status'] = $reference->status;
        $reserve['user'] = @json_decode(json_encode($reference), true)['user'];

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
                'name' => $reserve['user']['username'],
                'type' => 1
            ]
        );

        Mail::to($reserve['user']['email'])->send($mail);

        return response()->json([
            'data' => $reserve,
            'status' => [
                'message' => 'Reservation updated successfully',
                'type' => 'success',
            ],
        ]);
    }

    public function destroy($id)
    {
        $reserve = Reserve::where('id', $id)->first();
        Reference::destroy($reserve->reference);

        return response()->json([
            'data' => [],
            'status' => [
                'message' => 'Reservation deleted successfully',
                'type' => 'success',
            ],
        ]);
    }
}
