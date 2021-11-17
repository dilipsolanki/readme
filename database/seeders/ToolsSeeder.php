<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ToolsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $toolsArray = [
            [
                'name' => 'Spell Check',
                'short_desc' => 'A collection of APIs to check for spelling errors; with each error, a list of suggestions is presented for you to select the perfect fit.',
                'route_name' => 'dashboard.spell-check',
                'owner' => 'CACTUS Labs',
                'is_enabled' => 1,
                'sort_number' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Hubble',
                'short_desc' => 'End-to-end AI based solution to identify and correct English language errors along several grammatical, lexical, and morphological categories.',
                'route_name' => 'dashboard.hubble',
                'owner' => 'CACTUS Labs',
                'is_enabled' => 1,
                'sort_number' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Document Structuring',
                'short_desc' => 'Custom tool built by Cactus Labs that helps in identifying the structure of an academic manuscript.',
                'route_name' => 'dashboard.document-structuring',
                'owner' => 'CACTUS Labs',
                'is_enabled' => 1,
                'sort_number' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Image Checker',
                'short_desc' => 'By using face and image recognition techniques and identifying defects in scientific images, Cactus Labs is flagging potential violation of privacy law which is difficult to catch using traditional software.',
                'route_name' => 'dashboard.image-checker',
                'owner' => 'CACTUS Labs',
                'is_enabled' => 1,
                'sort_number' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Subject Area Detector',
                'short_desc' => 'Subject Area Detector',
                'route_name' => 'dashboard.subject-area-detector',
                'owner' => 'CACTUS Labs',
                'is_enabled' => 1,
                'sort_number' => 5,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Error Marking',
                'short_desc' => 'Comparative analysis between two documents to spot out differences between them.',
                'route_name' => 'dashboard.error-marking',
                'owner' => 'CACTUS Labs',
                'is_enabled' => 1,
                'sort_number' => 6,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Hubble Edit Validation',
                'short_desc' => 'Hubble Edit Validation',
                'route_name' => 'dashboard.hubble-edit-validation',
                'owner' => 'CACTUS Labs',
                'is_enabled' => 1,
                'sort_number' => 7,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'PDF Extraction',
                'short_desc' => 'PDF Extraction',
                'route_name' => 'dashboard.pdf-extraction',
                'owner' => 'CACTUS Labs',
                'is_enabled' => 1,
                'sort_number' => 8,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Lumière',
                'short_desc' => 'A search engine that finds matches for a word or phrase, gives the comparative counts for two phrases, and displays contextualized examples of search text from a large database of published articles.',
                'route_name' => 'dashboard.lumiere',
                'owner' => 'CACTUS Labs',
                'is_enabled' => 1,
                'sort_number' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ];
        Schema::disableForeignKeyConstraints();
        DB::table('tools')->truncate();
        Schema::enableForeignKeyConstraints();
        DB::table('tools')->insert($toolsArray);
    }
}
