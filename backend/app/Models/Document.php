<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'user_id',
        'original_name',
        'file_name',
        'file_path',
        'imagekit_file_id',
        'mime_type',
        'file_size',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
