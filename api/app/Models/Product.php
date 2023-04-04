<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'cuisine', 'name', 'description', 'price', 'ingridients', 'image'
    ];

    public function cuisine()
    {
        return $this->belongsTo(Cuisine::class, 'cuisine', 'id');
    }
}
