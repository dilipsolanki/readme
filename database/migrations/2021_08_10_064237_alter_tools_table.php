<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterToolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tools', function ($table) {
            $table->string('primary_api_endpoint')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('tools', 'primary_api_endpoint')) {
            Schema::table('tools', function (Blueprint $table) {
                $table->dropColumn('primary_api_endpoint');
            });
        }
    }
}
