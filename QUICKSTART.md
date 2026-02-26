# Quick Start Guide - Smart Study Notes Manager

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js 14+ installed
- MongoDB Atlas account (free at mongodb.com/cloud/atlas)

### Step 1: MongoDB Setup (2 min)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up (free tier)
3. Create a cluster
4. Under "Security" → "Database Access", create a user
5. Under "Network Access", add your IP (or 0.0.0.0 for development)
6. Click "Connect" and copy the connection string
7. Replace `<username>:<password>` with your credentials

Example string:
```
mongodb+srv://myuser:mypass@cluster0.abc123.mongodb.net/smartnotes?retryWrites=true&w=majority
```

### Step 2: Configure Environment (1 min)
```bash
cd /workspace
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://your-username:your-password@cluster-name.mongodb.net/smartnotes?retryWrites=true&w=majority
JWT_SECRET=dev-secret-key-123-change-in-production
CLIENT_ORIGIN=http://localhost:3000
```

### Step 3: Install & Run Backend (1 min)
```bash
npm install
npm start
```

Server runs on `http://localhost:5000`

**Terminal should show:**
```
MongoDB connected
Server running on port 5000
```

### Step 4: Run Frontend (1 min)

**Option A: Live Server (Easiest)**
```bash
cd public
python -m http.server 3000
```
Then open: http://localhost:3000

**Option B: Direct Browser**
```
file:///path/to/workspace/public/index.html
```

## ✅ Test It Works

1. Click "Register"
2. Enter: test@example.com / password123
3. Create account
4. Click "New Note"
5. Add: Title: "Test", Category: "DSA", Content: "Hello world"
6. Click "Save"
7. See note in Dashboard

## 📝 API Testing (Optional)

Using curl or Postman:

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Response:**
```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

**Create Note:**
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Note","category":"DSA","content":"<p>Content</p>"}'
```

## 🎨 Features to Try

- **Dashboard**: View total notes and recent notes
- **New Note**: Rich text editor with formatting
- **Search**: Find notes by title in real-time
- **Filter**: Filter by category
- **Edit**: Click "Edit" on any note
- **Delete**: Remove notes with "Delete"
- **Theme**: Toggle Dark/Light in sidebar

## 🌐 Deploy (Optional)

### Backend to Render
1. Push to GitHub
2. Create account on render.com
3. New Web Service → Connect repo
4. Set env variables:
   - MONGO_URI
   - JWT_SECRET
5. Deploy (auto)

### Frontend to GitHub Pages
```bash
git add .
git commit -m "Deploy"
git push origin main
```
Go to repo settings → Pages → Select "public" folder

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB won't connect | Check MONGO_URI, whit list IP in Atlas |
| Auth not working | Clear localStorage, check console (F12) |
| Notes not loading | Verify you're logged in, check API URL |
| Port 5000 in use | Change PORT in .env to 5001 |
| Quill editor blank | Clear cache, hard refresh (Ctrl+F5) |

## 📂 Key Files

```
src/server.js           → Backend entry point
src/routes/            → API routes
src/models/            → Data models
src/controllers/       → Business logic
public/index.html      → Frontend entry
public/js/auth.js      → Authentication
public/js/notes.js     → Note management
public/js/editor.js    → Quill integration
public/css/styles.css  → All styling
```

## 🔒 Security Notes

- Change `JWT_SECRET` in production
- Use HTTPS in production
- MongoDB Atlas should whitelist specific IPs
- Don't commit `.env` file (already in .gitignore)

## 📚 Learn More

See [README.md](README.md) for complete documentation.

---

**Happy coding! 🎉**
