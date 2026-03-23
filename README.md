# EchoNotes Frontend 👋

AI-powered voice note-taking application built with React Native (Expo) and Tamagui.

## Architecture

The project uses a production-grade, feature-based directory structure:

- `app/`: Expo Router tabs and screens.
- `components/features/`: Complex components grouped by feature (notes, ai).
- `components/layout/`: Global UI elements like headers and logos.
- `components/ui/`: Reusable primitive components.
- `hooks/`: Domain-specific custom hooks (useNotes, etc.).
- `services/`: API client and external integrations.
- `store/`: Redux Toolkit for global state management.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file with `EXPO_PUBLIC_API_URL`.

3. Start the app:
   ```bash
   npx expo start
   ```

## Key Technologies
- **React Native (Expo)**: Framework for cross-platform development.
- **Tamagui**: Design system and UI kit.
- **TanStack Query (v5)**: Data fetching and caching.
- **Redux Toolkit**: Client-side state management.
- **Lucide Icons**: Icon library.
