<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHubbleExtendedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hubble_extended', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('hubble_id')->constrained('hubble')->onDelete('cascade');;

            $table->string('dataKey')->nullable();
            $table->text('original_word')->nullable();
            $table->text('changed_word')->nullable();
            $table->string('category')->nullable();
            $table->string('category_broad')->nullable();
            $table->text('explanation')->nullable();
            $table->boolean('checked')->default(false);
            $table->string('type')->nullable();

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
        Schema::dropIfExists('hubble_extended');
    }
}
