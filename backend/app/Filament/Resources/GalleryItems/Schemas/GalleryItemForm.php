<?php

namespace App\Filament\Resources\GalleryItems\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class GalleryItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('label')
                    ->required(),
                TextInput::make('url')
                    ->required(),
                TextInput::make('order')
                    ->numeric()
                    ->default(0),
                TextInput::make('category')
                    ->default('Umum'),
            ]);
    }
}
