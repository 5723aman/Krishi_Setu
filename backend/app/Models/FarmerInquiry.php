<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FarmerInquiry extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'district',
        'topic',
        'message',
    ];
}
