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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_type');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('item_name');
            $table->date('date_start');
            $table->date('date_end')->nullable();
            $table->integer('quantity');
            $table->string('consumer_name');
            $table->string('consumer_whatsapp');
            $table->integer('total_price');
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
