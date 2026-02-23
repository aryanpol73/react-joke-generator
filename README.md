🚀 Dev Humor Hub

A Progressive Web App (PWA) that delivers unique programming jokes with smart caching, navigation history, and persistent favorites.

Built with React + Vite + PWA support.

🌐 Live Demo

👉 https://dev-humor-hub.netlify.app/

✨ Features

🎭 Programming, Dark, Pun, Misc categories
🔁 Reveal / Next joke interaction
⬅️ Previous joke navigation
🧠 Smart duplicate prevention
💾 Save jokes to favorites
🔄 Persistent storage with localStorage
📦 In-memory caching per category
📱 Installable as a PWA
⚡ Fast build using Vite

🛠 Tech Stack

React
Vite
useReducer
Custom Hooks
vite-plugin-pwa
Netlify Deployment

🧠 Architecture

Project structure:

src/
 ├── hooks/
 │    └── useJoke.js
 ├── services/
 │    └── jokeService.js
 ├── App.jsx
State Management

useReducer for scalable async state handling
Per-category cache using useRef
Indexed navigation for previous jokes
Duplicate prevention logic

📲 PWA Support

Installable on mobile
Standalone mode
Custom icons (192x192, 512x512)
HTTPS deployment

🚀 Getting Started

Install dependencies
npm install
Run development server
npm run dev
Build production
npm run build
Preview production build
npm run preview

📦 Deployment

Deployed via Netlify.
Build command:
npm run build
Publish directory:
dist

🎯 Future Improvements
Offline fallback page
Push notifications
Bounded cache control
Unit testing (Vitest)

👨‍💻 Author

Aryan Pol
GitHub: https://github.com/aryanpol73
