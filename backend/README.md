# BeautyTON Backend

BeautyTON is a backend service for a Telegram Mini App that enables beauty masters to manage schedules, services, bookings and for clients to find their masters. System is integrated with the TON ecosystem.

## Tech Stack
- **Language**: Go (v1.20+)
- **Database**: PostgreSQL
- **ORM**: GORM
- **Router**: Gorilla Mux
- **Authentication**: Telegram Mini App `initData` validation
- **Dependencies**: Managed with Go Modules
- **Environment**: Configured via `.env` file

## Prerequisites
- Go (v1.20 or higher)
- PostgreSQL (v13 or higher)
- Telegram Bot Token (obtain from [BotFather](https://t.me/BotFather))
- `.env` file with configuration (see `.env.example`)

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd beautyton
   ```

2. **Install Dependencies**
   ```bash
   go mod download
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/beautyton?sslmode=disable
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   PORT=8080
   ```

4. **Set Up the Database**
    - Ensure PostgreSQL is running.
    - Create a database:
      ```bash
      createdb beautyton
      ```
    - Apply migrations (assuming you have a migration tool like `golang-migrate`):
      ```bash
      migrate -path migrations -database "$DATABASE_URL" up
      ```
    - Alternatively, use the provided schema in `migrations/` to set up tables (`users`, `master_profiles`, `schedule_slots`, `services`, etc.).

5. **Run the Application**
   ```bash
   go run cmd/main.go
   ```
   The server will start on `http://localhost:8080` (or the port specified in `.env`).

## Available Endpoints
- There is swagger docs to see all available endpoints `http://localhost:8080/swagger/` after running the application

## Authentication
- The backend uses Telegram Mini App authentication via `initData`, validated by `TelegramAuthMiddleware`.
- Only users with the `master` role can access restricted endpoints (enforced by `RoleMiddleware`).
