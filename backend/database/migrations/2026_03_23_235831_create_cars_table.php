<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('unit');
            $table->integer('seats');
            $table->integer('luggage')->default(0);
            $table->string('transmission');
            $table->string('fuel_type');
            $table->boolean('ac')->default(true);
            $table->string('price_per_day');
            $table->integer('price_per_day_num');
            $table->string('img')->nullable();
            $table->string('img_detail')->nullable();
            $table->text('desc');
            $table->json('features')->nullable();
            $table->json('best_for')->nullable();
            $table->json('gallery')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
