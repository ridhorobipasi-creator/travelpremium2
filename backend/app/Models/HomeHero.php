<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeHero extends Model
{
    protected $guarded = [];

    protected $casts = [
        'headline' => 'array',
    ];
}
