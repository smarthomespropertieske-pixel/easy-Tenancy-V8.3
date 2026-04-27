# Easy Tenancy (V8.3)

Easy Tenancy is a hybrid repository combining:

- a modern Next.js marketing and demo frontend
- a nested Laravel backend app in `easyTenancy/`

The root project delivers the SaaS landing page, preview experience, and dashboard demo. The nested Laravel app contains the property management backend for leases, tenants, payments, and maintenance requests.

## Features

- Next.js App Router with TypeScript and Tailwind CSS
- Landing page, app preview, and dashboard views
- Nested Laravel backend for tenancy management
- Demo data structures for properties, tenants, leases, payments and maintenance requests
- Full-stack starter layout for property management SaaS

## Requirements

- Node.js 18+
- npm 10+
- PHP 8.3+
- Composer
- Optional: MySQL / MariaDB / PostgreSQL / SQLite for the Laravel backend

## Quick start — Local development

1. Clone the repository

   git clone https://github.com/smarthomespropertieske-pixel/easy-Tenancy-V8.3.git
   cd easy-Tenancy-V8.3

2. Install root dependencies

   npm install

3. Start the Next.js app

   npm run dev

4. Open the frontend

   http://localhost:3000

## Running the nested Laravel app

To run the backend app in `easyTenancy/`:

```bash
cd easyTenancy
cp .env.example .env
composer install
npm install
php artisan key:generate
```

Update `easyTenancy/.env` with your database credentials, then:

```bash
php artisan migrate
php artisan db:seed
```

Start Laravel:

```bash
php artisan serve
```

Default URL: `http://127.0.0.1:8000`

> Note: The nested Laravel app requires PHP 8.3 or newer.

## Available root pages

- `/` — Marketing landing page
- `/preview` — App preview experience
- `/dashboard` — Demo dashboard with metrics and portfolio cards

## Build and production

- `npm run build` — Build the Next.js app
- `npm start` — Start the production server

## Project structure

- `app/` — Next.js routes and pages
- `components/` — Reusable UI components
- `easyTenancy/` — Nested Laravel backend app
- `lib/` — Demo data and content helpers
- `public/` — Static assets

## Testing

- Next.js: add frontend test tooling as needed
- Laravel: `cd easyTenancy && ./vendor/bin/phpunit`

## Notes

This repository currently provides the frontend SaaS experience and a Laravel scaffold for backend workflows. Extend it by adding authentication, API integration, and tenant persistence.

## License

Released under the MIT License.
