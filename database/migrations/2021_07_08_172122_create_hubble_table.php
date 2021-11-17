<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHubbleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hubble', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();

            $table->string('fetch_id')->nullable();
            $table->text('content')->nullable();
            $table->text('entered_content')->nullable();
            $table->text('entered_file_path')->nullable();
            $table->text('entered_file_name')->nullable();
            $table->json('data')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hubble');
    }
}
