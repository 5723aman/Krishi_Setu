<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scheme extends Model
{
    protected $fillable = [
        'title',
        'department',
        'summary',
        'eligibility',
        'benefits',
        'more_info_url',
    ];
}
