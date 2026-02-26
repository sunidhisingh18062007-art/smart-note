# Smart Study Notes Manager

A production-ready web application for creating, managing, and organizing study notes with a modern UI, full-stack architecture, and rich text editing capabilities.

## Features

- **Authentication System**
  - User registration with email and password
  - Secure login with JWT tokens
  - Password hashing using bcrypt
  - Protected routes and middleware
  - Logout functionality

- **Notes Management (CRUD)**
  - Create, read, update, and delete notes
  - Rich text editing with Quill.js
  - Categorize notes (DSA, AI, Cybersecurity, Mathematics, etc.)
  - Search notes by title
  - Filter notes by category
  - Store formatted HTML content

- **Dashboard**
  - Display total notes count
  - Show recently added notes
  - Card-based layout for easy navigation
  - Statistics per category

- **Modern UI**
  - Professional startup-level design
  - Responsive layout (mobile + desktop)
  - Dark/Light theme toggle
  - Sidebar navigation
  - Smooth animations
  - Glassmorphism effects

- **Rich Text Editor**
  - Quill.js integration
  - Bold, Italic, Underline formatting
  - Bullet and numbered lists
  - Font size and color selection
  - Highlight text
  - Link embedding

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** for database
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variables
- **CORS** for cross-origin requests

### Frontend
- **HTML5**, **CSS3**, **JavaScript (ES6+)**
- **Quill.js** for rich text editing
- **Responsive CSS Grid** for layout
- **Fetch API** for backend communication

## Project Structure

```
smart-study-notes/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noteController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── config/
│   │   └── db.js
│   └── server.js
├── public/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── app.js
│       ├── auth.js
│       ├── notes.js
│       └── editor.js
├── package.json
├── .env.example
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account
- Git (optional)

### Step 1: Clone or Download

```bash
git clone <repo-url>
cd smart-study-notes
```

Or download and extract the ZIP file.

### Step 2: Install Backend Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Update the `.env` file with your MongoDB Atlas URI and JWT secret:

```env
PORT=5000
MONGO_URI=mongodb+srv://your-username:your-password@cluster-name.mongodb.net/smartnotes?retryWrites=true&w=majority
JWT_SECRET=your-secure-random-key-here-make-it-long-and-secure
CLIENT_ORIGIN=http://localhost:3000
```

**How to get MongoDB Atlas URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a cluster (free tier available)
4. Create a database user (Database Access)
5. Get connection string and replace `<username>` and `<password>`
6. Append `/smartnotes?retryWrites=true&w=majority` to the URI

### Step 4: Start the Backend Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Step 5: Open Frontend

**Option 1: Direct Browser**
```bash
# Open in browser:
file:///path/to/smart-study-notes/public/index.html
```

**Option 2: Local Web Server**

Using Python 3:
```bash
cd public
python -m http.server 3000
```

Using Node.js:
```bash
# Install globally (one time)
npm install -g http-server

# Run
cd public
http-server -p 3000
```

Using VS Code Live Server:
- Install Live Server extension
- Right-click `public/index.html`
- Select "Open with Live Server"

Frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Notes
- `POST /api/notes` - Create note (protected)
- `GET /api/notes` - Get all user notes (protected)
- `GET /api/notes/stats` - Get notes statistics (protected)
- `GET /api/notes/:id` - Get note by ID (protected)
- `PATCH /api/notes/:id` - Update note (protected)
- `DELETE /api/notes/:id` - Delete note (protected)

## Usage Guide

### Register & Login
1. Click "Login" or "Register" button in top right
2. Switch between tabs if needed
3. Enter email and password
4. Click "Submit"
5. Token is saved in browser localStorage

### Create a Note
1. Click "New Note" in sidebar
2. Enter note title
3. Select category (DSA, AI, Cybersecurity, Mathematics)
4. Use rich text editor to write content with formatting
5. Click "Save"

### Search & Filter
1. Use search bar to find notes by title (real-time)
2. Select category filter dropdown
3. Click "Search" button
4. Results update instantly

### Edit a Note
1. Go to "Notes" view in sidebar
2. Find your note in the list
3. Click "Edit" button on the card
4. Modify content
5. Click "Save"

### Delete a Note
1. Go to "Notes" view in sidebar
2. Click "Delete" button on any note card
3. Note is removed immediately

### Toggle Theme
1. Click "🌙 Toggle" button in sidebar
2. Light/Dark mode will switch
3. Theme persists across sessions

### View Dashboard
1. Click "Dashboard" in sidebar
2. See total notes count
3. See recently added notes
4. Quick access to edit/delete

## Deployment

### Deploy Backend to Render

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Smart Study Notes - Initial commit"
git push -u origin main
```

2. Go to [Render.com](https://render.com)
3. Create new **Web Service**
4. Connect your GitHub repo
5. Set environment variables:
   - `MONGO_URI` = [Your MongoDB Atlas URI]
   - `JWT_SECRET` = [Your secret key]
   - `PORT` = `5000`
6. Set Start Command: `npm start`
7. Click "Create Web Service"

Your backend will be available at `https://your-app.onrender.com`

### Deploy Frontend to Vercel

1. Prepare frontend directory structure
2. Go to [Vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Set environment variables:
   - `VITE_API_URL` = `https://your-render-backend.onrender.com/api`
5. Deploy

Or use Netlify (similar process).

### Deploy Frontend to GitHub Pages

1. Update API URL in `public/js/auth.js`:
```javascript
const API = 'https://your-render-backend.onrender.com/api';
```

2. Create `.nojekyll` in public folder (empty file)
3. Push to GitHub
4. Enable GitHub Pages in repo settings
5. Select `public` folder as source

## Features Implemented ✅

- [x] User authentication with JWT
- [x] Password hashing with bcrypt
- [x] Note CRUD operations
- [x] Search notes by title
- [x] Filter notes by category
- [x] Rich text editor (Quill.js)
- [x] Dashboard with statistics
- [x] Dark/Light theme
- [x] Responsive design (mobile + desktop)
- [x] Protected routes with auth middleware
- [x] Error handling and validation
- [x] Clean folder structure
- [x] Environment variables
- [x] Smooth animations
- [x] Sidebar navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Protected API routes with auth middleware
- ✅ CORS configuration
- ✅ Input validation
- ✅ Secure error handling
- ✅ Http-only cookie support (can be added)

## Troubleshooting

### MongoDB Connection Error
**Problem:** "MongoDB connection error"
**Solution:**
- Check `.env` file has correct `MONGO_URI`
- Verify IP address is whitelisted in MongoDB Atlas (Network Access)
- Ensure username/password are correct (URL encoded if special chars)
- Check internet connection

### CORS Error
**Problem:** "Access to XMLHttpRequest blocked by CORS"
**Solution:**
- Update `CLIENT_ORIGIN` in `.env` to match frontend URL
- Restart backend server after changing `.env`

### Notes Not Loading
**Problem:** "No notes displayed, blank page"
**Solution:**
- Check you're logged in (see token in console)
- Open Developer Tools (F12) → Console
- Check for error messages
- Verify API URL is correct
- Try creating a new note

### Quill Editor Not Showing
**Problem:** "Editor area is blank, no toolbar"
**Solution:**
- Ensure Quill.js CDN is loaded (check Network tab)
- Check browser console (F12) for errors
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page (F5)

### Backend Won't Start
**Problem:** "Port 5000 already in use"
**Solution:**
```bash
# Change PORT in .env to 5001 or:
# Kill process on Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## Performance Tips

- Use HTTPS in production
- Enable gzip compression on backend
- Minify CSS/JS files
- Use CDN for Quill.js library
- Optimize MongoDB indexes
- Cache API responses

## Future Enhancements

- [ ] Note sharing and collaboration (real-time)
- [ ] Export notes to PDF/Word
- [ ] Note versioning and history
- [ ] Tagging system for better organization
- [ ] User profile customization
- [ ] Email notifications
- [ ] Advanced search with filters
- [ ] Note templates
- [ ] Analytics dashboard
- [ ] Mobile app (React Native/Flutter)
- [ ] Voice-to-text notes
- [ ] Note synchronization across devices

## License

MIT License - feel free to use this for commercial or personal projects.

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review API documentation
3. Inspect browser console (F12) for errors
4. Check backend terminal logs

## Contributing

Contributions welcome! 
1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Submit pull request

---

## Quick Command Reference

```bash
# Install dependencies
npm install

# Start backend (production)
npm start

# Start backend (development with auto-reload)
npm run dev

# Generate admin user
node scripts/createAdmin.js

# Start frontend on port 3000
cd public && http-server -p 3000
```

---

**Built for BCA Final Year Project & Portfolio**

Created with ❤️ for modern web development standards

Latest update: February 2026
