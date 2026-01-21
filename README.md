# Real-Time Two-Person Chat Application

A modern, real-time chat application built with React and Firebase. Features a WhatsApp-style interface with dark mode, instant message sync, and no backend coding required.

## 🚀 Features

- **Real-time messaging** - Messages sync instantly across all users
- **Modern UI** - Dark mode with gradient accents and smooth animations
- **Responsive design** - Works seamlessly on desktop and mobile
- **Simple authentication** - Username-only login (no passwords)
- **WhatsApp-style chat bubbles** - Sender messages on right, receiver on left
- **Auto-scroll** - Automatically scrolls to latest message
- **Timestamps** - Each message displays time sent
- **Loading states** - Smooth loading indicators and empty states

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Backend**: Firebase Realtime Database (BaaS)
- **Styling**: Pure CSS with dark mode
- **State Management**: React Hooks (useState, useEffect)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account (free tier works perfectly)

## ⚙️ Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "realtime-chat-app")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Realtime Database

1. In Firebase Console, click "Realtime Database" in the left menu
2. Click "Create Database"
3. Select a location closest to you
4. Start in **test mode** (for development)
   - This allows read/write access without authentication
   - **Note**: For production, implement proper security rules
5. Click "Enable"

### 3. Get Firebase Configuration

1. Click the gear icon (Project Settings)
2. Scroll down to "Your apps"
3. Click the web icon (</>) to add a web app
4. Register app with a nickname (e.g., "Chat App Web")
5. Copy the `firebaseConfig` object values

## 🔧 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Replace the values with your Firebase configuration from step 3 above.

**Example:**
```bash
VITE_FIREBASE_API_KEY=AIzaSyB1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=my-chat-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-chat-app
VITE_FIREBASE_STORAGE_BUCKET=my-chat-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🎮 Usage

### Testing Real-Time Chat

1. Open the app in your browser
2. Enter a username (e.g., "Alice") and click "Join Chat"
3. Open another browser/incognito window at the same URL
4. Enter a different username (e.g., "Bob")
5. Send messages from either window
6. Watch messages appear instantly in both windows! 🎉

### Testing on Mobile

1. Find your local IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` or `ip addr`
2. Ensure your mobile device is on the same WiFi network
3. Open `http://YOUR_IP:5173` on your mobile browser
4. Enter a username and start chatting!

## 📁 Project Structure

```
realtime-chat-app/
├── src/
│   ├── components/
│   │   ├── Login.jsx           # Username entry component
│   │   ├── ChatRoom.jsx        # Main chat interface
│   │   ├── MessageBubble.jsx   # Individual message display
│   │   └── InputBox.jsx        # Message input area
│   ├── styles/
│   │   ├── Login.css           # Login page styles
│   │   ├── ChatRoom.css        # Chat room styles
│   │   ├── MessageBubble.css   # Message bubble styles
│   │   └── InputBox.css        # Input area styles
│   ├── firebase.js             # Firebase configuration
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global styles
│   └── main.jsx                # App entry point
├── .env                        # Environment variables (create this)
├── .env.example                # Environment template
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🎨 Component Details

### App.jsx
- Main component managing authentication state
- Routes between Login and ChatRoom
- Persists username in localStorage

### Login.jsx
- Simple username entry form
- Input validation (2-20 characters)
- Clean, animated UI

### ChatRoom.jsx
- Real-time message listener using Firebase
- Auto-scroll to latest message
- Loading and empty states
- Header with username and logout button

### MessageBubble.jsx
- Individual message display
- Different styling for own vs. other messages
- Username and timestamp display

### InputBox.jsx
- Message input with send button
- Enter key support
- Disabled state for empty messages

## 🔒 Firebase Security Rules (Production)

For production deployment, update your Firebase Realtime Database rules:

```json
{
  "rules": {
    "messages": {
      ".read": true,
      ".write": true,
      "$messageId": {
        ".validate": "newData.hasChildren(['text', 'username', 'timestamp'])"
      }
    }
  }
}
```

For enhanced security, implement Firebase Authentication and user-based rules.

## 🚀 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 📱 Deployment Options

### Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Vercel
```bash
npm run build
vercel --prod
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🎯 Features Roadmap

- [ ] Typing indicators
- [ ] Read receipts
- [ ] Message deletion
- [ ] Image/file sharing
- [ ] User avatars
- [ ] Multiple chat rooms
- [ ] Private messaging
- [ ] Message reactions

## 🐛 Troubleshooting

### Messages not syncing
- Check Firebase Realtime Database is enabled
- Verify `.env` file has correct credentials
- Check browser console for errors
- Ensure database rules allow read/write access

### Build errors
- Delete `node_modules` and run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`
- Ensure Node.js version is 18 or higher

### Connection issues
- Check Firebase project is active
- Verify internet connection
- Check browser console for CORS errors

## 📄 License

MIT License - feel free to use this project for learning, portfolio, or commercial purposes.

## 🙌 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

Built with ❤️ using React and Firebase

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
