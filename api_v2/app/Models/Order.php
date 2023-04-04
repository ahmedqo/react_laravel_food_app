<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference', 'shipping'
    ];

    public function reference()
    {
        return $this->belongsTo(Reference::class, 'reference', 'id');
    }
}
