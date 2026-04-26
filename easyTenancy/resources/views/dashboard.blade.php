<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Easy Tenancy - Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">Easy Tenancy V8.3</a>
        </div>
    </nav>

    <div class="container mt-4">
        <h1>Dashboard</h1>

        <div class="row mt-4">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Properties</h5>
                        <h2>{{ $properties_count }}</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Tenants</h5>
                        <h2>{{ $tenants_count }}</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Leases</h5>
                        <h2>{{ $leases_count }}</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Payments</h5>
                        <h2>{{ $payments_count }}</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-6">
                <h3>Recent Payments</h3>
                <ul class="list-group">
                    @forelse($recent_payments as $payment)
                        <li class="list-group-item">
                            ${{ $payment->amount }} - {{ $payment->lease->tenant->first_name }} {{ $payment->lease->tenant->last_name }}
                            <small class="text-muted">{{ $payment->payment_date->format('M d, Y') }}</small>
                        </li>
                    @empty
                        <li class="list-group-item">No recent payments</li>
                    @endforelse
                </ul>
            </div>
            <div class="col-md-6">
                <h3>Pending Maintenance Requests</h3>
                <ul class="list-group">
                    @forelse($pending_maintenance as $request)
                        <li class="list-group-item">
                            <strong>{{ $request->title }}</strong><br>
                            {{ $request->property->name }} - {{ $request->tenant->first_name }} {{ $request->tenant->last_name }}
                            <span class="badge bg-warning">{{ $request->priority }}</span>
                        </li>
                    @empty
                        <li class="list-group-item">No pending maintenance requests</li>
                    @endforelse
                </ul>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>