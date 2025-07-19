# BeautyTON

**BeautyTON** is a Telegram-native beauty service platform built on Web3 rails — helping beauty masters and clients connect, book, and pay seamlessly, while integrating the TON blockchain for decentralized features and Telegram Mini Apps for intuitive UI.

This monorepo contains all parts of the platform: frontend (Telegram Mini App), backend (REST APIs), and blockchain (smart contracts on TON).

## Concept

BeautyTON aims to reinvent beauty service platforms by combining:

- **Telegram Mini Apps** — frictionless interface right inside the chat app
- **TON Blockchain** — escrow smart contracts, NFT gift certificates, wallet binding
- **Telegram Stars** — for tipping and early monetization
- **Web2 comfort + Web3 logic** — all flows feel native to mobile users, with the power of decentralization under the hood

We provide value for:

- **Clients** — easy search, booking, and payments via Telegram
- **Beauty Masters** — personal mini-app storefront, schedule & portfolio management, and crypto-native monetization tools

## Repository Structure

```

├── frontend/    # React + Tailwind Telegram Mini App (FSD architecture)
├── backend/     # API server and bot integration (Node.js/Express or Nest)
├── blockchain/  # Smart contracts in Tact for TON (escrow, NFT)

```

Each folder contains its own README with setup and details.

## Getting Started

To run the full platform locally, refer to the READMEs below:

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Blockchain README](./blockchain/README.md)

Minimum requirements:

- Node.js >= 18
- pnpm / npm / yarn
- Docker (optional for backend)
- Telegram dev account to test the Mini App

## Telegram Integration

BeautyTON is fully integrated with Telegram's modern developer stack:

### Telegram Mini Apps

- The frontend runs as a Telegram Mini App via [@BeautyTonBot](https://t.me/BeautyTonBot?startapp)
- Auth is handled through Telegram's secure user context
- UI is mobile-first, adapting to Telegram's theming (dark/light)

### Telegram Stars

- Planned support for Telegram’s new tipping and in-app monetization system
- Useful for paid boosts or tips to masters directly in chat

### TON Blockchain

- **Escrow Contracts** for safe booking (WIP)
- **TON Wallet Integration** for direct payments and balance display
- **NFT Gift Cards** (future): tokenized certificates that can be redeemed with any master

## Status

This is an active **hackathon MVP**. Most flows are working with mocked data or placeholders.  
Integration with TON and real backend APIs is in progress.

## License

MIT — open for contribution.

## Team

BeautyTON is developed by a small team of fullstack and blockchain developers participating in hackathons and public Web3 initiatives.
