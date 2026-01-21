# Quick Setup Guide

## Step 1: Firebase Setup (5 minutes)

### Create Firebase Project
1. Visit https://console.firebase.google.com/
2. Click "Add project"
3. Name it "realtime-chat-app"
4. Disable Google Analytics (optional)
5. Click "Create project"

### Enable Realtime Database
1. In left sidebar, click "Realtime Database"
2. Click "Create Database"
3. Choose your region
4. Select "Start in test mode" (allows read/write without auth)
5. Click "Enable"

### Get Firebase Config
1. Click the gear icon → "Project settings"
2. Scroll to "Your apps" section
3. Click web icon (</>)
4. Register app with nickname "Chat Web App"
5. Copy the config values shown

## Step 2: Configure Environment Variables

Create a `.env` file in the project root:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Paste the values you copied from Firebase.

## Step 3: Run the App

```bash
npm run dev
```

Open http://localhost:5173 in your browser!

## Step 4: Test Real-Time Chat

1. Open the app in your browser
2. Enter username "Alice" → Join Chat
3. Open an incognito/private window
4. Go to the same URL
5. Enter username "Bob" → Join Chat
6. Send messages from either window
7. Watch them appear instantly! ✨

## Common Issues

**Error: Firebase config missing**
- Make sure you created the `.env` file
- Check that all variables start with `VITE_`
- Restart dev server after creating `.env`

**Messages not syncing**
- Verify Realtime Database is enabled in Firebase Console
- Check Database Rules are set to test mode
- Check browser console for errors

**Port 5173 already in use**
- Stop other Vite dev servers
- Or change port: `npm run dev -- --port 3000`

## Next Steps

- Deploy to Netlify, Vercel, or Firebase Hosting
- Add typing indicators
- Implement user avatars
- Add multiple chat rooms

Need help? Check the main README.md for detailed documentation.
