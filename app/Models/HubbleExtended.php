<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HubbleExtended extends Model
{
    use HasFactory;
    protected $table = 'hubble_extended';

    protected $guarded = [];

    /**
     * Get the hubble record that owns the extended.
     */
    public function hubble()
    {
        return $this->belongsTo(Hubble::class);
    }
}
