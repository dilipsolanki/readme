<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateToolNavigation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tool_navigation', function (Blueprint $table) {
        
            $table->id();
            $table->text('nav_name')->nullable();
            //$table->createdBy('user_id')->constrained();
            $table->foreignId('tool_id')->constrained('tools');
            $table->json('content')->nullable();
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
        Schema::dropIfExists('tool_navigation');
    }
}
