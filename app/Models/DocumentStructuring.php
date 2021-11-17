<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentStructuring extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'document_structuring';

    /**
     * The attributes that should be mass-assignable
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'file_name',
        's3_file_path',
        'status',
        'data',
    ];
}
