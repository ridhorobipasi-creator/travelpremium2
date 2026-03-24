<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Setting::updateOrCreate(
            ['site_name' => 'Obaja Tour'],
            [
                'whatsapp_number' => '81234567890',
                'email' => 'info@obajatour.com',
                'address' => 'Jl. Wisata No. 123, Bali, Indonesia',
                'instagram_url' => 'https://instagram.com/obajatour',
                'facebook_url' => 'https://facebook.com/obajatour',
                'footer_text' => '© 2026 Obaja Tour & Travel. All rights reserved.',
            ]
        );
    }
}
