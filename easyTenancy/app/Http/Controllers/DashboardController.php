<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Tenant;
use App\Models\Lease;
use App\Models\Payment;
use App\Models\MaintenanceRequest;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'properties_count' => Property::count(),
            'tenants_count' => Tenant::count(),
            'leases_count' => Lease::count(),
            'payments_count' => Payment::count(),
            'maintenance_requests_count' => MaintenanceRequest::count(),
            'recent_payments' => Payment::with('lease.tenant')->latest()->take(5)->get(),
            'pending_maintenance' => MaintenanceRequest::where('status', 'pending')->with('property', 'tenant')->get(),
        ];

        return view('dashboard', $data);
    }
}
