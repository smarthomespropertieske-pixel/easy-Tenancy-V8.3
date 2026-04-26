<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tenant::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'phone' => '555-1234',
            'date_of_birth' => '1985-05-15',
            'address' => '789 Elm St, Anytown, CA 12345',
            'emergency_contact_name' => 'Jane Doe',
            'emergency_contact_phone' => '555-5678',
        ]);

        Tenant::create([
            'first_name' => 'Alice',
            'last_name' => 'Smith',
            'email' => 'alice.smith@example.com',
            'phone' => '555-9876',
            'date_of_birth' => '1990-08-22',
            'address' => '321 Pine St, Anytown, CA 12345',
            'emergency_contact_name' => 'Bob Smith',
            'emergency_contact_phone' => '555-4321',
        ]);
    }
}
