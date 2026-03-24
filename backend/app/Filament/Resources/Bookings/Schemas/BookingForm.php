<?php

namespace App\Filament\Resources\Bookings\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class BookingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('booking_type')
                    ->required(),
                TextInput::make('user_id')
                    ->numeric(),
                TextInput::make('item_name')
                    ->required(),
                DatePicker::make('date_start')
                    ->required(),
                DatePicker::make('date_end'),
                TextInput::make('quantity')
                    ->required()
                    ->numeric(),
                TextInput::make('consumer_name')
                    ->required(),
                TextInput::make('consumer_whatsapp')
                    ->required(),
                TextInput::make('total_price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                TextInput::make('status')
                    ->required()
                    ->default('pending'),
            ]);
    }
}
