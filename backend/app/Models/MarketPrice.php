<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MarketPrice extends Model
{
    protected $fillable = [
        'crop_id',
        'mandi_name',
        'state',
        'price_per_quintal',
        'unit',
        'price_date',
    ];

    protected function casts(): array
    {
        return [
            'price_date' => 'date',
            'price_per_quintal' => 'decimal:2',
        ];
    }

    public function crop(): BelongsTo
    {
        return $this->belongsTo(Crop::class);
    }
}
