<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterHubbleTableAddCallbackStatusColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('hubble', function ($table) {
            $table->string('file_status')->nullable();
            $table->unique('fetch_id', 'hubble_fetch_id_unique');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('hubble', 'file_status')) {
            Schema::table('hubble', function (Blueprint $table) {
                $table->dropColumn('file_status');
                $table->dropUnique('hubble_fetch_id_unique');
            });
        }

        if (Schema::hasColumn('hubble', 'file_callback_data')) {
            Schema::table('hubble', function (Blueprint $table) {
                $table->dropColumn('file_callback_data');
            });
        }
    }
}
