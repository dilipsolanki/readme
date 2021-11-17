<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentStructuringSuggestion extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'document_structuring_suggestions';

    /**
     * The attributes that should be mass-assignable
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'document_structuring_id',
        'type',
        'index'
    ];
}
