<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tools extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'short_desc',
        'route_name',
        'logo',
        'owner',
        'is_enabled',
        'sort_number',
        'primary_api_endpoint',
        'is_locked',
    ];
}
