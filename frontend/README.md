# BeautyTON Frontend

**BeautyTON** is a decentralized beauty service platform, tightly integrated with Telegram and the TON blockchain.  
It supports both clients and beauty masters, offering convenient booking, scheduling, and profile management — all inside a Telegram Mini App.

> Demo: [@BeautyTonBot](https://t.me/BeautyTonBot?startapp)

## Features Implemented (Hackathon Stage)

### Client-Side

- **Mobile-first design** tailored for Telegram WebApp
- **Main Catalog Page** (`views/Catalog`)
  - Search entry (leads to separate search page)
  - Horizontal “My Masters” list (with placeholders)
  - Promoted and top-rated masters
  - Native banners: TON wallet setup, “Become a Master”
- **Search Page**
  - Filter by category, city, price, rating
  - “Looking for Models” filter and SVG badge with tooltip
  - Infinite scroll of filtered masters
  - Filter state stored in query params
- **Master Detail Page**
  - Booking form (with mocked scheduling)
  - Full description and portfolio
  - Tag: “Looking for Models” if applicable

### Master-Side

- **Master Dashboard** (entry point for professionals)
  - Access to mini app creation and configuration
  - Link to public profile
  - Profile editing mode (drag-and-drop for sections)
  - Scheduling workspace (mocked for now)

### Under the Hood

- React + Vite + TailwindCSS + Hero UI
- Fully modular [FSD 2.1](https://feature-sliced.design/) architecture (customized)
- Dark/light theme support
- Mocked API for all user data
- Telegram WebApp integration prepared
- TON wallet integration layout (under development)

---

## File Structure (Simplified)

```bash
src/
  views/
    Catalog/            # Client-side catalog & search
    MasterDashboard/    # Dashboard for professionals
    MasterProfile/      # Public profile shown to clients
  features/
    booking/
    filters/
    favorites/
  shared/
    ui/
    lib/
    config/
```

---

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Vanv1k/BeautyTON
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

## Deployment

- Deployed via **GitHub Actions** on push to `main` and `develop`
- Production build is uploaded to the remote server via SSH
- Served using **Nginx** under a subdomain
- Staging available at [@BeautyTonBot](https://t.me/BeautyTonBot?startapp)

## Roadmap

- Telegram Mini App user session auth
- TON Wallet binding for masters
- Full booking flow with escrow support
- Admin dashboard for moderation and analytics
- Integration with real backend APIs

## License

This project is developed as a **hackathon prototype** and is currently under active development.
Licensed under the MIT License.

---

## Contact

Feel free to open issues or contribute.
Made with ❤️ by the BeautyTON team.
