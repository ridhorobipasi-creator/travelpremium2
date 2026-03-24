<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use App\Filament\Resources\Bookings\BookingResource;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestBookings extends BaseWidget
{
    protected static ?int $sort = 2;
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Booking::query()->latest()->limit(10)
            )
            ->columns([
                TextColumn::make('created_at')
                    ->label('Waktu')
                    ->dateTime('d M H:i')
                    ->sortable(),
                TextColumn::make('booking_type')
                    ->label('Jenis')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'package' => 'success',
                        'car' => 'info',
                        default => 'gray',
                    }),
                TextColumn::make('consumer_name')
                    ->label('Nama')
                    ->searchable(),
                TextColumn::make('item_name')
                    ->label('Unit/Paket')
                    ->searchable(),
                TextColumn::make('total_price')
                    ->label('Harga')
                    ->money('IDR', locale: 'id_ID'),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'completed' => 'success',
                        'canceled' => 'danger',
                        default => 'gray',
                    }),
            ])
            ->actions([
                EditAction::make()
                    ->url(fn (Booking $record): string => BookingResource::getUrl('edit', ['record' => $record]))
                    ->label('Lihat')
                    ->icon('heroicon-m-eye'),
            ]);
    }
}
