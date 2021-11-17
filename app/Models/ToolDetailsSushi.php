<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToolDetailsSushi extends Model
{
    use \Sushi\Sushi;

    protected $rows = [
        ['abbr' => 'SC', 'tool_id' => 1, 'tool_name' => 'Spell Check'],
        ['abbr' => 'HB', 'tool_id' => 2, 'tool_name' => 'Hubble'],
        ['abbr' => 'DC', 'tool_id' => 3, 'tool_name' => 'Document Structuring'],
        ['abbr' => 'IC', 'tool_id' => 4, 'tool_name' => 'Image Checker'],
        ['abbr' => 'SCH', 'tool_id' => 5, 'tool_name' => 'Scholarcy'],
        ['abbr' => 'PE', 'tool_id' => 6, 'tool_name' => 'PDF Extraction'],
    ];
}
