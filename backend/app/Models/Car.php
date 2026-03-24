<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $guarded = [];

    protected $casts = [
        'features'  => 'array',
        'best_for'  => 'array',
        'gallery'   => 'array',
        'ac'        => 'boolean',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
