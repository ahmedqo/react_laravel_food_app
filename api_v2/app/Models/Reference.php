<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user', 'total', 'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user', 'id');
    }
}
