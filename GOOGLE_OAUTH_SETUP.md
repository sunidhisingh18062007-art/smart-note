# Google OAuth Setup Guide

## Overview
The Smart Study Notes Manager now supports **two authentication methods**:
1. **Email/Password Login** - Works out of the box
2. **Google Sign-In** - Optional, requires Google OAuth configuration

## 1. Email/Password Authentication (Already Enabled)

### How It Works
- Users can register with any email and password
- Passwords are hashed with bcrypt (10 salt rounds)
- Both login and register use the same form
- Supports unlimited email addresses

### Testing Email Login
1. Start the backend: `npm start`
2. Open the app in browser
3. Click "Login" button
4. Enter any email and password
5. First-time: Creates new account
6. Subsequent: Logs into existing account

**Demo Credentials:**
- Email: `user@example.com`
- Password: `password123`

---

## 2. Google Sign-In Setup (Optional)

### Step 1: Get Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web Application**
6. Add authorized redirect URIs:
   - `http://localhost:3000` (development)
   - `http://localhost:5000` (backend)
   - `https://yourdomain.com` (production)
7. Copy your **Client ID**

### Step 2: Update Frontend Configuration

Edit `/workspace/public/js/auth.js` (search for line with client_id):

```javascript
google.accounts.id.initialize({
  client_id: 'YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com',
  callback: handleGoogleSignIn
});
```

Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID.

### Step 3: Optional - Setup Backend Verification

For production security, verify Google tokens on the backend:

```bash
npm install google-auth-library
```

Update `/workspace/src/controllers/authController.js`:

```javascript
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const ticket = await client.verifyIdToken({ idToken: token });
const payload = ticket.getPayload();
const email = payload.email;
```

### Step 4: Update .env File

```
GOOGLE_CLIENT_ID=your-client-id-here
```

---

## Current Implementation

### Frontend Flow (`/workspace/public/js/auth.js`)
1. User clicks "Sign in with Google" button
2. JavaScript initializes Google Sign-In library
3. User authenticates with Google
4. Frontend receives JWT token from Google
5. Token sent to backend at `/api/auth/google`
6. Backend verifies and creates/finds user
7. Backend returns JWT token
8. Frontend stores token and updates UI

### Backend Flow (`/workspace/src/controllers/authController.js`)

**Endpoint:** `POST /api/auth/google`

**Request:**
```json
{
  "token": "Google JWT Token",
  "email": "user@gmail.com"
}
```

**Response:**
```json
{
  "token": "JWT token for app",
  "user": {
    "id": "MongoDB User ID",
    "email": "user@gmail.com"
  }
}
```

**What happens:**
- Receives Google token
- Extracts email from token
- Checks if user exists
- If YES: Returns JWT token
- If NO: Creates new user, returns JWT token

---

## Testing Without Google Setup

### Demo Mode
If you don't configure Google Client ID, the app provides a **demo fallback**:
1. Click "Sign in with Google"
2. Enter any email when prompted
3. System automatically creates/logs in user
4. Works exactly like email login

This lets you test the entire auth flow without Google setup!

---

## Database Impact

When users sign in with Google:
- Email stored in `User.email`
- Password auto-generated (not from Google)
- No sensitive Google data stored
- Same user model for email & Google auth

---

## Security Notes

1. **Passwords**: Users who sign up via Google cannot use the email/password login by default (password is auto-generated)
2. **Email Verification**: Currently not implemented (can be added)
3. **Token Security**: JWTs expire after 7 days
4. **CORS**: Configure `CLIENT_ORIGIN` in `.env` to restrict API access

---

## Troubleshooting

### "Google is not defined"
- Check if Google script loaded: `https://accounts.google.com/gsi/client`
- Check browser console for errors
- May need to wait for page load

### "Client ID not configured"
- App falls back to demo mode
- Add Client ID to unlock full Google OAuth

### User can't login
- Check MongoDB connection
- Check JWT_SECRET in `.env`
- Check browser console for errors

### Email/Password still works without Google
- ✅ This is expected! Both methods are independent
- Users can use either method
- Same email can be used for both

---

## Production Deployment

### Before Deploying:
1. ✅ Test Google login locally
2. ✅ Update Google Console with production URLs
3. ✅ Use environment variables for Client ID
4. ✅ Enable HTTPS (required for Google OAuth)
5. ✅ Set `JWT_SECRET` to random string
6. ✅ Use production MongoDB URI

### Update Production URLs:
```
GOOGLE_CLIENT_ID=prod-client-id
CLIENT_ORIGIN=https://yourdomain.com
```

---

## API Endpoints Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/auth/register` | None | Create account with email |
| POST | `/api/auth/login` | None | Login with email |
| POST | `/api/auth/google` | None | Authenticate with Google |
| GET | `/api/auth/me` | JWT | Get current user |

---

## Next Steps

1. **Immediate**: Test email login (already works)
2. **Optional**: Setup Google to add OAuth option
3. **Production**: Deploy with both auth methods

Questions? Check browser console and backend logs for details!
