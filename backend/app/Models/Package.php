<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $guarded = [];

    protected $casts = [
        'highlights' => 'array',
        'itinerary'  => 'array',
        'included'   => 'array',
        'excluded'   => 'array',
        'gallery'    => 'array',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
