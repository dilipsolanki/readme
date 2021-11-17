<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterIsLockedColumnAdddInToolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tools', function (Blueprint $table) {
            $table->boolean('is_locked')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {   
        if (Schema::hasColumn('tools', 'is_locked')) {
                 Schema::table('tools', function (Blueprint $table) {
                 $table->dropColumn('is_locked');
            });
        }
    }
}
