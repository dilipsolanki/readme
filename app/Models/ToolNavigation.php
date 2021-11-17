<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToolNavigation extends Model
{
    use HasFactory;

    protected $table = 'tool_navigation';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nav_name',
        'tool_id',
        'content',
    ];
}
