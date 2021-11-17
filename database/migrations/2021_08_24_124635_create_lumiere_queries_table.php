<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLumiereQueriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lumiere_queries', function (Blueprint $table) {
            $table->id();
            $table->string('query');
            $table->integer('type_of_query'); // 1 => compare_words; 2 => find_words_in_context
            $table->text('data')->nullable();
            $table->foreignId('user_id')->constrained();
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
        Schema::dropIfExists('lumiere_queries');
    }
}
