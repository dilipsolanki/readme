<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageCheckerModel extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'img_checker';

    /**
     * The attributes that should be mass-assignable
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'file_name',
        's3_file_path',
         'width',
         'height',
        'extension',
        'status',
        'data',
    ];

}
