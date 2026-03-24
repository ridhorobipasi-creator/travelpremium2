<?php

namespace App\Filament\Resources\Cars\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class CarForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Armada')
                    ->columns(['lg' => 2])
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', \Illuminate\Support\Str::slug($state))),
                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),
                        TextInput::make('unit')
                            ->required()
                            ->placeholder('Contoh: Toyota Avanza'),
                        TextInput::make('transmission')
                            ->required()
                            ->placeholder('Manual / Automatic'),
                        TextInput::make('fuel_type')
                            ->required()
                            ->placeholder('Pertamax / Solar'),
                    ]),

                Section::make('Spesifikasi & Fasilitas')
                    ->columns(['lg' => 3])
                    ->schema([
                        TextInput::make('seats')
                            ->required()
                            ->numeric()
                            ->suffix('Seats'),
                        TextInput::make('luggage')
                            ->required()
                            ->numeric()
                            ->default(0)
                            ->suffix('Koper'),
                        Toggle::make('ac')
                            ->label('Air Conditioning (AC)')
                            ->required()
                            ->default(true)
                            ->inline(false),
                    ]),

                Section::make('Harga Sewa')
                    ->columns(['lg' => 2])
                    ->schema([
                        TextInput::make('price_per_day')
                            ->required()
                            ->placeholder('Contoh: Rp 500rb/hari'),
                        TextInput::make('price_per_day_num')
                            ->required()
                            ->numeric()
                            ->prefix('Rp'),
                    ]),

                Section::make('Konten & Gallery')
                    ->schema([
                        Textarea::make('desc')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),
                        Grid::make(['lg' => 2])
                            ->schema([
                                Textarea::make('features')
                                    ->rows(5),
                                Textarea::make('best_for')
                                    ->rows(5),
                            ]),
                        FileUpload::make('img')
                            ->label('Foto Utama')
                            ->image()
                            ->directory('cars'),
                        Textarea::make('gallery')
                            ->helperText('Tautan gambar galeri (pisahkan dengan baris baru)')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
