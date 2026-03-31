# 🎙️ EchoNotes
> A production-grade, AI-powered voice note-taking application designed for elite efficiency. Capture raw audio and leverage Gemini AI to synthesize structured, actionable intelligence.

[![Expo SDK 54](https://img.shields.io/badge/Expo-54.0-000020.svg?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native 0.81](https://img.shields.io/badge/React%20Native-0.81-61dafb.svg?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev/)
[![Tamagui](https://img.shields.io/badge/UI-Tamagui-FF6154.svg?style=flat-square&logo=tamagui&logoColor=white)](https://tamagui.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 📌 Overview

**EchoNotes** bridges the gap between spoken ideas and structured documentation. In a fast-paced world, typing is a bottleneck. EchoNotes allows users to record their voice and automatically receive high-quality transcripts, key point summaries, and Action items.

**Key Value Proposition:** 
- **Efficiency**: Zero-effort structured notes from voice.
- **Organization**: Clean, folder-based management with smart categorization.
- **Intelligence**: Context-aware AI synthesis using Gemini.

---

## 📸 Application Flow

A comprehensive look into the EchoNotes user experience:

### Authentication & Onboarding
| Splash | Login | Signup |
| :---: | :---: | :---: |
| <img src="./assets/screenshots/splash.jpeg" width="220" /> | <img src="./assets/screenshots/login.jpeg" width="220" /> | <img src="./assets/screenshots/signup.jpeg" width="220" /> |

### Core Functionality
| Home Dashboard | Voice Recorder | Note Details |
| :---: | :---: | :---: |
| <img src="./assets/screenshots/home.jpeg" width="220" /> | <img src="./assets/screenshots/recorder.jpeg" width="220" /> | <img src="./assets/screenshots/details.jpeg" width="220" /> |

### Organization & Discovery
| Note Library | Create Folder | Delete Folder |
| :---: | :---: | :---: |
| <img src="./assets/screenshots/library.jpeg" width="220" /> | <img src="./assets/screenshots/create%20folder.jpeg" width="220" /> | <img src="./assets/screenshots/delete%20%20folder.jpeg" width="220" /> |

### Settings & Management
| Smart Search | User Profile | Settings & Security |
| :---: | :---: | :---: |
| <img src="./assets/screenshots/search.jpeg" width="220" /> | <img src="./assets/screenshots/profile.jpeg" width="220" /> | <img src="./assets/screenshots/settings.jpeg" width="105" /><img src="./assets/screenshots/security.jpeg" width="105" /> |

---

## ✨ Features

- **🎙️ High-Fidelity Recording**: Seamless audio capture with pre-processing for AI clarity.
- **🤖 Gemini AI Synthesis**: Automatic generation of transcripts, action items, and key points.
- **📁 Advanced Organization**: Custom folders, note pinning, and favorite management.
- **🔍 Global Search**: Fast, optimized search across all note metadata and content.
- **🔒 Security**: Persistent session management with `expo-secure-store`.
- **🌐 Offline Resilience**: Robust background sync and offline-first data handling.
- **🎨 Premium UI**: Performance-tuned design system built with **Tamagui**.

---

## 🏗️ Architecture

EchoNotes follows a **feature-driven modular architecture** to ensure scalability and developer efficiency:

- **Routing**: File-based navigation via `Expo Router`.
- **State Layer**: Hybrid strategy using `TanStack Query` (Server state) and `Redux Toolkit` (Client state).
- **Service Layer**: Centralized API clients using `Axios` with tailored interceptors.
- **Media Pipeline**: Local audio caching and multipart uploads for large file stability.

---

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo SDK 54, TypeScript
- **State Management**: Redux Toolkit, TanStack Query v5
- **UI/UX**: Tamagui, Lucide Icons, Reanimated
- **Networking**: Axios, Expo File System
- **Storage**: Expo Secure Store, AsyncStorage
- **AI**: Gemini AI (via custom backend integration)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: LTS version (18.x or 20.x recommended)
- **Expo Go**: Available on iOS and Android App Stores
- **Backend API**: A running instance of the EchoNotes API

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/okaadyx/echo-notes.git
   cd echo-notes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add:
   ```env
   EXPO_PUBLIC_API_URL=https://api.echonotes.com/v1
   ```

4. **Launch Application:**
   ```bash
   npx expo start
   ```

---

## 📡 API Documentation

Centralized API access via the `api` service singleton.

### Key Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/auth/login` | `POST` | Authenticate user and persist JWT. |
| `/notes/` | `GET` | List notes with folder filtering. |
| `/ai/generate-notes` | `POST` | Process multipart audio into structured notes. |

#### Example: Generate AI Notes
```typescript
const response = await api.ai.generateNotes(audioUri);
// Returns structured object with { transcript, key_points, action_items }
```

---

## 🧪 Testing

Execute the test suite and linting tools:

```bash
# Run linting
npm run lint

# Run type checks
tsc --noEmit
```

---

## 📦 Deployment

Optimized for **EAS (Expo Application Services)**:

- **Android Production**: `eas build --platform android --profile production`
- **iOS Production**: `eas build --platform ios --profile production`

Refer to `eas.json` for build profiles and secret management.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Troubleshooting

| Issue | Potential Fix |
| :--- | :--- |
| **API 401 Unauthorized** | Ensure you are logged in and the token is in `SecureStore`. |
| **Audio Upload Failure** | Check `EXPO_PUBLIC_API_URL` and internet connectivity. |
| **Tamagui Build Errors** | Clear cache: `npx expo start --clear`. |

---
## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Support / Contact

*Maintained by [Okaadyx](https://github.com/okaadyx)*
- **Issue Tracker**: GitHub Issues or contact support@okaadyx.com

---
*Built with ❤️ for better productivity.*
