<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class BookingStatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Pesanan', Booking::count())
                ->description('Total seluruh pesanan')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('primary'),
            Stat::make('Total Pendapatan', 'Rp ' . number_format(Booking::sum('total_price'), 0, ',', '.'))
                ->description('Estimasi nilai transaksi')
                ->descriptionIcon('heroicon-m-banknotes')
                ->chart([15, 4, 10, 2, 12, 4, 18])
                ->color('success'),
            Stat::make('Paket Wisata', \App\Models\Package::count())
                ->description('Paket wisata aktif')
                ->descriptionIcon('heroicon-m-map')
                ->color('info'),
            Stat::make('Armada Mobil', \App\Models\Car::count())
                ->description('Unit kendaraan tersedia')
                ->descriptionIcon('heroicon-m-truck')
                ->color('warning'),
        ];
    }
}
