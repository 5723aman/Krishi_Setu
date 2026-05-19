<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Crop extends Model
{
    protected $fillable = [
        'name',
        'category',
        'season',
        'region_hint',
        'description',
        'image_url',
    ];

    public function marketPrices(): HasMany
    {
        return $this->hasMany(MarketPrice::class);
    }
}
