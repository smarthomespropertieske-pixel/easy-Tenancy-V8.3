# Easy Tenancy V8.3

The operating system for modern rental management in Kenya. Track properties, tenants, leases, payments and maintenance — built for M-Pesa rent collection.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** SQLite via Prisma ORM
- **Auth:** JWT (cookie-based)
- **Language:** TypeScript

## Features

- **Landing Page** — Premium SaaS-positioned homepage targeting Kenyan landlords and property managers
- **Authentication** — Register / login with email and password
- **Dashboard** — Key metrics at a glance (properties, tenants, leases, revenue, maintenance)
- **Properties** — Full CRUD for managing your property portfolio (residential, commercial, mixed use)
- **Tenants** — Track tenant details, ID numbers, phone, unit assignments, move-in dates
- **Leases** — Create and manage lease agreements with rent amounts, deposits, and status tracking
- **Payments** — Record rent payments with M-Pesa support, bank transfer, cash, and cheque methods
- **Maintenance** — Log requests with priority levels, assign to properties/tenants, track resolution status

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your DATABASE_URL (default: file:./dev.db)

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env` file with:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-change-in-production"
```

## Database

The app uses SQLite by default (zero configuration). To use PostgreSQL or MySQL, update the `datasource` in `prisma/schema.prisma` and the `DATABASE_URL` in `.env`.

### Migrations

```bash
npx prisma migrate dev          # Apply migrations (development)
npx prisma migrate deploy       # Apply migrations (production)
npx prisma studio               # Visual database browser
```

## Project Structure

```
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Migration files
├── src/
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── dashboard/          # Dashboard & CRUD pages
│   │   │   ├── properties/
│   │   │   ├── tenants/
│   │   │   ├── leases/
│   │   │   ├── payments/
│   │   │   └── maintenance/
│   │   └── api/                # API routes
│   ├── components/             # Reusable UI components
│   ├── lib/                    # Utilities (db, auth, formatting)
│   └── middleware.ts           # Auth middleware
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Building for Production

```bash
npm run build
npm start
```

## License

MIT

---

&copy; Smarthomes Consulting Group Ltd
