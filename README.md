# Efarm Connect

Digital platform concept for **agricultural productivity** and **rural development**: a React (Vite) frontend and a Laravel JSON API.

## Features

- **Crop catalogue** — categories, seasons, regional hints, imagery
- **Mandi prices** — indicative reference quotes (seed data; swap for live APMC feeds)
- **Extension advisories** — short agronomy and rural practice notes
- **Government schemes** — summaries with eligibility hints
- **Farmer enquiries** — `POST /api/inquiries` stores requests in SQLite **and emails you** (see below)

## Prerequisites

- PHP 8.2+ and Composer (XAMPP or standalone PHP is fine)
- Node.js 18+

## Backend (Laravel)

```powershell
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

API base URL: `http://127.0.0.1:8000/api`

### Enquiry emails

Each successful `POST /api/inquiries` sends a notification to the address in **`INQUIRY_NOTIFY_EMAIL`** (see `backend/config/inquiry.php`; default is `pandeynitish591@gmail.com` if the env var is unset).

Add to `backend/.env`:

```env
INQUIRY_NOTIFY_EMAIL=pandeynitish591@gmail.com
```

To receive real messages in your inbox (not only in `storage/logs/laravel.log`), set **`MAIL_MAILER=smtp`** and your provider’s host, port, username, and password. For Gmail you typically use an [App Password](https://support.google.com/accounts/answer/185833) and set `MAIL_FROM_ADDRESS` to the same Gmail account you authenticate with.

While developing, `MAIL_MAILER=log` keeps copies in the Laravel log so you can verify the template without SMTP.

Key routes:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/stats` | Dashboard counters |
| GET | `/api/crops` | List crops (`?category=cereals`) |
| GET | `/api/crops/{id}` | Crop detail + prices |
| GET | `/api/market-prices` | Price rows (`?crop_id=`) |
| GET | `/api/advisories` | Advisories (`?category=`) |
| GET | `/api/schemes` | Scheme cards |
| POST | `/api/inquiries` | Create enquiry (JSON body) |

## Frontend (React + Vite)

Development uses a **proxy** so the browser calls `/api/...` on the Vite dev server and Vite forwards to Laravel.

```powershell
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Keep `php artisan serve` running on port 8000.

### Production API URL

Build with an explicit API base if the app is not served behind the same origin:

```powershell
# example
$env:VITE_API_URL="https://your-api.example.com/api"; npm run build
```

## Project layout

- `backend/` — Laravel 12 application
- `frontend/` — React SPA

## Licence

MIT — use freely for coursework, demos, or as a starter for a real deployment.
