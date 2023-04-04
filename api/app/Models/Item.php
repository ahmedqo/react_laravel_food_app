<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'order', 'product', 'quantity'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order', 'id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product', 'id');
    }
}
