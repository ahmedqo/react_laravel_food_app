<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserve extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference', 'date', 'time', 'count'
    ];

    public function reference()
    {
        return $this->belongsTo(Reference::class, 'reference', 'id');
    }
}
