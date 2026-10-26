<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use  HasFactory;
    protected $fillable = [
        "name",
        "code",
        "from_country",
        "descrioption",
        "location",
        "construction_type",
        "image",
        "status",
    ];
}
