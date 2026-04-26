# Easy Tenancy (V8.3)

A lightweight property/tenancy management web application — Easy Tenancy V8.3.

This repository contains the application source, configuration and scripts needed to run Easy Tenancy locally and in production.

## Contents

- Overview and purpose
- Requirements
- Quick start (install, configure, run)
- Environment variables
- Database migrations & seeding
- Running tests
- Contributing
- Troubleshooting
- License & maintainers

---

## Overview

Easy Tenancy is designed for small-to-medium property managers to track properties, tenants, leases, payments and maintenance requests. This README provides the steps needed to get the project running locally and guidance for deploying to production.

(If this repo is a fork or a packaged release, consult the project maintainer for version-specific upgrade/migration notes.)

## Requirements

- PHP 8.1+
- Composer
- Node.js 16+
- npm
- MySQL / MariaDB or PostgreSQL (or SQLite for development)

## Quick start — Local development

1. Clone the repository

   git clone https://github.com/smarthomespropertieske-pixel/easy-Tenancy-V8.3.git
   cd easy-Tenancy-V8.3

2. Install dependencies

   composer install
   npm install

3. Copy and configure environment file

   cp .env.example .env
   Open `.env` and set the database credentials and other required keys (see Environment variables below).

4. Generate app key

   php artisan key:generate

5. Run database migrations and seeders

   php artisan migrate --seed

6. Start the development server

   php artisan serve

7. Open the app in your browser at http://localhost:8000 (or as indicated by the server output).

## Environment variables

Add the following keys to your `.env` file (adjust names to match your app):

- APP_NAME=EasyTenancy
- APP_ENV=local
- APP_KEY=
- APP_URL=http://localhost

Database
- DB_CONNECTION=mysql
- DB_HOST=127.0.0.1
- DB_PORT=3306
- DB_DATABASE=easy_tenancy
- DB_USERNAME=root
- DB_PASSWORD=

Mail (optional)
- MAIL_MAILER=smtp
- MAIL_HOST=smtp.mailtrap.io
- MAIL_PORT=2525
- MAIL_USERNAME=
- MAIL_PASSWORD=
- MAIL_ENCRYPTION=null

Other
- SANCTUM_STATEFUL_DOMAINS=localhost
- FRONTEND_URL=http://localhost:3000

> Check your application code for any additional required environment variables and add them here.

## Database migrations & seeding

Run migrations to create the schema and (optionally) seed the database with sample data:

- php artisan migrate
- php artisan db:seed

If you need to reset and re-run migrations:

- php artisan migrate:fresh --seed

(Adjust commands if not using Laravel.)

## Running tests

Run the test suite with PHPUnit:

- ./vendor/bin/phpunit

## Building assets

Build frontend assets with Vite:

- npm run dev (development)
- npm run build (production)

## Deployment notes

- Ensure environment variables are correctly set on the server.
- Use a process manager such as Supervisor, systemd, or PM2 for Node apps.
- Configure HTTPS (Let's Encrypt) and reverse proxy (nginx) in front of the app.
- Run migrations during deploy and keep backups of production databases before migrations.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a topic branch (feature/bugfix)
3. Commit changes with clear messages
4. Open a pull request describing the changes and any migration steps

Please include tests for any new behavior and update documentation when relevant.

## Troubleshooting

- Database connection errors: verify DB_HOST, DB_PORT, DB_USERNAME and DB_PASSWORD in `.env`.
- Missing dependencies: re-run composer install or npm install and check versions.
- Permission errors: ensure storage and bootstrap/cache (Laravel) are writable by the web server user.

## Maintainers & authors

- Repository: smarthomespropertieske-pixel/easy-Tenancy-V8.3
- Contributors: see the project's contributors graph on GitHub: https://github.com/smarthomespropertieske-pixel/easy-Tenancy-V8.3/graphs/contributors

## License

Specify the project license (e.g., MIT). If there's a LICENSE file in the repository, link to it here.

---

If you'd like, I can:
- Tailor this README to the exact stack (Laravel/Node/etc.) used in the repo if you point me to the project language/framework files.
- Add badge images (build, license, coverage) and example configuration files.
