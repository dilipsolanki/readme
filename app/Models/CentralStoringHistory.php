<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CentralStoringHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'user_id',
        'tool_id',
        'tool_name',
        'request_payload',
        'response_payload',
        'is_file_content',
        'update_id',
        'created_at',
        'updated_at'
    ];
    protected $table = 'central_storing_history';
    
}
