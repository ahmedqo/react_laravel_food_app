<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference', 'product', 'quantity'
    ];

    public function reference()
    {
        return $this->belongsTo(Reference::class, 'reference', 'id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product', 'id');
    }
}
