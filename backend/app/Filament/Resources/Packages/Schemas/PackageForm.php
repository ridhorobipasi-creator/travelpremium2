<?php

namespace App\Filament\Resources\Packages\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class PackageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Utama')
                    ->description('Data dasar paket wisata.')
                    ->columns(['lg' => 2])
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', \Illuminate\Support\Str::slug($state))),
                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),
                        TextInput::make('region')
                            ->required(),
                        TextInput::make('category')
                            ->required(),
                    ]),

                Section::make('Harga & Kapasitas')
                    ->columns(['lg' => 3])
                    ->schema([
                        TextInput::make('price')
                            ->required()
                            ->placeholder('Contoh: Rp 2,4jt'),
                        TextInput::make('price_num')
                            ->required()
                            ->numeric()
                            ->prefix('Rp'),
                        TextInput::make('duration')
                            ->required()
                            ->placeholder('Contoh: 3 Hari 2 Malam'),
                        TextInput::make('min_pax')
                            ->required()
                            ->numeric()
                            ->default(1),
                        TextInput::make('max_pax')
                            ->required()
                            ->numeric()
                            ->default(10),
                        TextInput::make('rating')
                            ->numeric()
                            ->default(5.0)
                            ->step(0.1),
                    ]),

                Section::make('Konten & Deskripsi')
                    ->schema([
                        Textarea::make('desc')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),
                        Grid::make(['lg' => 2])
                            ->schema([
                                Textarea::make('highlights')
                                    ->rows(5),
                                Textarea::make('itinerary')
                                    ->rows(5),
                            ]),
                        Grid::make(['lg' => 2])
                            ->schema([
                                Textarea::make('included')
                                    ->rows(5),
                                Textarea::make('excluded')
                                    ->rows(5),
                            ]),
                    ]),

                Section::make('Media & Galeri')
                    ->schema([
                        FileUpload::make('image')
                            ->image()
                            ->directory('packages')
                            ->columnSpanFull(),
                        Textarea::make('gallery')
                            ->helperText('Tautan gambar galeri (pisahkan dengan baris baru)')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
