<?php

namespace Database\Seeders;

use App\Models\Property;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Property::create([
            'name' => 'Sunset Apartments',
            'address' => '123 Main St',
            'city' => 'Anytown',
            'state' => 'CA',
            'zip_code' => '12345',
            'property_type' => 'apartment',
            'units' => 10,
            'rent_amount' => 1500.00,
            'description' => 'Beautiful apartment complex with pool and gym.',
        ]);

        Property::create([
            'name' => 'Oakwood House',
            'address' => '456 Oak Ave',
            'city' => 'Anytown',
            'state' => 'CA',
            'zip_code' => '12346',
            'property_type' => 'house',
            'units' => 1,
            'rent_amount' => 2000.00,
            'description' => 'Spacious single-family home with garden.',
        ]);
    }
}
