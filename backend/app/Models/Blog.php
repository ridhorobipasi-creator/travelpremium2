<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $guarded = [];

    protected $casts = [
        'content' => 'array',
        'tags'    => 'array',
        'related' => 'array',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
