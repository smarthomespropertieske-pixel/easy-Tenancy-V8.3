<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'lease_id',
        'amount',
        'payment_date',
        'status',
        'payment_method',
        'transaction_id',
        'notes',
    ];

    protected $casts = [
        'payment_date' => 'date',
    ];

    public function lease(): BelongsTo
    {
        return $this->belongsTo(Lease::class);
    }
}
