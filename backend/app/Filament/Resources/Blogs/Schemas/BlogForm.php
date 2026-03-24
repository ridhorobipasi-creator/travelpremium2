<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BlogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required(),
                TextInput::make('label')
                    ->required(),
                TextInput::make('title')
                    ->required(),
                Textarea::make('desc')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('img'),
                TextInput::make('date')
                    ->required(),
                TextInput::make('author')
                    ->required(),
                TextInput::make('read_time')
                    ->required(),
                Textarea::make('content')
                    ->columnSpanFull(),
                Textarea::make('tags')
                    ->columnSpanFull(),
                Textarea::make('related')
                    ->columnSpanFull(),
            ]);
    }
}
