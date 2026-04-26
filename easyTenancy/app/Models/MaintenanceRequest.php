<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MaintenanceRequest extends Model
{
    protected $fillable = [
        'property_id',
        'tenant_id',
        'title',
        'description',
        'priority',
        'status',
        'requested_date',
        'completed_date',
        'resolution_notes',
    ];

    protected $casts = [
        'requested_date' => 'date',
        'completed_date' => 'date',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }
}
