<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $json = file_get_contents(__DIR__ . '/data.json');
        $data = json_decode($json, true);

        // Seed Packages
        foreach ($data['DEALS'] as $deal) {
            \App\Models\Package::updateOrCreate(
                ['slug' => $deal['id']],
                [
                    'region' => $deal['region'],
                    'title' => $deal['title'],
                    'price' => $deal['price'],
                    'price_num' => $deal['priceNum'],
                    'image' => $deal['image'] ?? null,
                    'desc' => $deal['desc'],
                    'duration' => $deal['duration'],
                    'rating' => (float) $deal['rating'],
                    'reviews' => $deal['reviews'],
                    'min_pax' => $deal['minPax'],
                    'max_pax' => $deal['maxPax'],
                    'category' => $deal['category'],
                    'highlights' => $deal['highlights'] ?? [],
                    'itinerary' => $deal['itinerary'] ?? [],
                    'included' => $deal['included'] ?? [],
                    'excluded' => $deal['excluded'] ?? [],
                    'gallery' => $deal['gallery'] ?? []
                ]
            );
        }

        // Seed Cars
        foreach ($data['CARS'] as $car) {
            \App\Models\Car::updateOrCreate(
                ['slug' => $car['id']],
                [
                    'title' => $car['title'],
                    'unit' => $car['unit'],
                    'seats' => $car['seats'],
                    'luggage' => $car['luggage'] ?? 0,
                    'transmission' => $car['transmission'],
                    'fuel_type' => $car['fuelType'],
                    'ac' => $car['ac'] ?? true,
                    'price_per_day' => $car['pricePerDay'],
                    'price_per_day_num' => $car['pricePerDayNum'],
                    'img' => $car['img'] ?? null,
                    'img_detail' => $car['imgDetail'] ?? null,
                    'desc' => $car['desc'],
                    'features' => $car['features'] ?? [],
                    'best_for' => $car['bestFor'] ?? [],
                    'gallery' => $car['gallery'] ?? []
                ]
            );
        }

        // Seed Blogs
        if (isset($data['BLOG_POSTS'])) {
            foreach ($data['BLOG_POSTS'] as $blog) {
                \App\Models\Blog::updateOrCreate(
                    ['slug' => $blog['id']],
                    [
                        'label'     => $blog['label'],
                        'title'     => $blog['title'],
                        'desc'      => $blog['desc'],
                        'img'       => $blog['img'] ?? null,
                        'date'      => $blog['date'],
                        'author'    => $blog['author'],
                        'read_time' => $blog['readTime'],
                        'content'   => $blog['content'] ?? [],
                        'tags'      => $blog['tags'] ?? [],
                        'related'   => $blog['related'] ?? []
                    ]
                );
            }
        }

        // Seed HomeHeroes
        if (isset($data['HERO_SLIDES'])) {
            foreach ($data['HERO_SLIDES'] as $index => $hero) {
                \App\Models\HomeHero::updateOrCreate(
                    ['label' => $hero['label']],
                    [
                        'image'    => $hero['image'],
                        'headline' => $hero['headline'],
                        'sub'      => $hero['sub'],
                        'order'    => $index
                    ]
                );
            }
        }

        // Seed Features
        if (isset($data['FEATURES'])) {
            $icons = ['Mountain', 'Waves', 'Coffee', 'Heart'];
            foreach ($data['FEATURES'] as $index => $feature) {
                \App\Models\Feature::updateOrCreate(
                    ['title' => $feature['title']],
                    [
                        'icon'  => $icons[$index] ?? 'Star',
                        'desc'  => $feature['desc'],
                        'order' => $index
                    ]
                );
            }
        }

        // Seed Gallery
        if (isset($data['GALLERY_IMAGES'])) {
            foreach ($data['GALLERY_IMAGES'] as $index => $img) {
                \App\Models\GalleryItem::updateOrCreate(
                    ['src' => $img['src']],
                    [
                        'tag'   => $img['tag'],
                        'cols'  => $img['cols'],
                        'rows'  => $img['rows'],
                        'order' => $index
                    ]
                );
            }
        }
    }
}
