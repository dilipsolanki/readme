<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hubble extends Model
{
    use HasFactory;

    protected $table = 'hubble';

    /**
     * The attributes that should be mass-assignable
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'fetch_id',
        'content',
        'entered_content',
        'entered_file_name',
        'entered_file_path',
        'data',
        'file_status'
    ];

    /**
     * Get the extended data for the hubble record.
     */
    public function extended()
    {
        return $this->hasMany(HubbleExtended::class);
    }

    /**
     * Get the user details of hubble.
     */
    public function getHubbleAuthor(){
        return $this->hasOne('App\Models\User','id','user_id')->select('id','name');
    }
}
