# Smart Study Notes Manager - Deployment Guide

## 🚀 Deploy to Production

This guide covers deploying both backend and frontend to production.

---

## ☁️ Backend Deployment on Render

### Step 1: Setup Git Repository
```bash
git init
git add .
git commit -m "Smart Study Notes Manager - Initial commit"
```

### Step 2: Push to GitHub
1. Create GitHub repo (smartnotes)
2. Add remote: `git remote add origin https://github.com/YOUR-USERNAME/smartnotes.git`
3. Push: `git push -u origin main`

### Step 3: Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select your GitHub repo
5. Fill in details:
   - **Name**: smartnotes-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 4: Configure Environment Variables
In Render dashboard, add:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartnotes?retryWrites=true&w=majority
JWT_SECRET=your-very-secure-secret-key-min-32-chars
CLIENT_ORIGIN=https://your-frontend-domain.com
PORT=5000
```

### Step 5: Deploy
- Click "Create Web Service"
- Render will auto-deploy from GitHub
- Takes 2-5 minutes
- Get your backend URL: `https://smartnotes-api.onrender.com`

### Step 6: Update Frontend API URL
After deployment, update `public/js/auth.js`:
```javascript
const API = 'https://smartnotes-api.onrender.com/api';
```

---

## 🌍 Frontend Deployment

### Option A: Vercel (Recommended)

#### Setup
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project" → Import your GitHub repo
4. Configure:
   - **Framework**: Other
   - **Build Command**: `npm install`
   - **Output Directory**: `public`

#### Add Environment Variables
```
VITE_API_URL=https://smartnotes-api.onrender.com/api
```

#### Deploy
- Click "Deploy"
- Vercel generates URL: `https://smartnotes.vercel.app`

---

### Option B: Netlify

#### Setup
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub repo
4. Configure:
   - **Build Command**: `npm install`
   - **Publish Directory**: `public`

#### Environment Variables
```
VITE_API_URL=https://smartnotes-api.onrender.com/api
```

#### Deploy
- Click "Deploy site"
- URL: `https://smartnotes.netlify.app`

---

### Option C: GitHub Pages (Free)

1. Update `public/index.html` API URL:
```javascript
const API = 'https://smartnotes-api.onrender.com/api';
```

2. Go to repo Settings → Pages
3. Select Source: `Deploy from a branch`
4. Branch: `main`, Folder: `/public`
5. Click "Save"
6. URL: `https://username.github.io/smartnotes`

---

### Option D: Firebase Hosting

#### Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
firebase init
```

#### Configure firebase.json
```json
{
  "hosting": {
    "public": "public",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

#### Deploy
```bash
firebase deploy
```

---

## 🔐 Production Security Checklist

### Backend Security
- [ ] Change `JWT_SECRET` to long random string (32+ chars)
- [ ] Use HTTPS only (automatic on Render)
- [ ] Set `NODE_ENV=production`
- [ ] Restrict CORS to production domain
- [ ] Enable MongoDB IP whitelist (not 0.0.0.0)
- [ ] Use strong database password
- [ ] Enable MongoDB authentication
- [ ] Set up error monitoring (Sentry)

### Frontend Security
- [ ] Use HTTPS (automatic on Vercel/Netlify)
- [ ] Update API URL to production backend
- [ ] Remove console.logs in production
- [ ] Set proper CSP headers
- [ ] Test authentication flows
- [ ] Verify JWT validation works

### General
- [ ] Add SSL/TLS certificates
- [ ] Setup monitoring and logging
- [ ] Create backup strategy
- [ ] Test disaster recovery
- [ ] Setup CI/CD pipeline
- [ ] Document production setup

---

## 📊 Monitoring & Debugging

### Backend Logs
**Render**: Dashboard → Logs tab
**Heroku**: `heroku logs --tail`
**Railway**: Dashboard → Logs

### Frontend Errors
- Check browser console (F12)
- Use Sentry for error tracking
- Setup Cloudflare for analytics

### Database Monitoring
- MongoDB Atlas → Metrics tab
- Monitor query performance
- Set up alerts for high usage

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
      - run: git push heroku main
```

---

## 💰 Cost Estimation

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Render | Yes | 750 hrs/month backend |
| Vercel | Yes | 100GB bandwidth/month |
| Netlify | Yes | 100GB bandwidth/month |
| Firebase | Yes | 1GB storage, 10GB/month |
| MongoDB Atlas | Yes | 512MB storage |
| GitHub | Free | Public repos |

**Total Cost**: $0-50/month with paid tiers

---

## 🚨 Troubleshooting Deployment

### Backend Won't Deploy
```
Error: Cannot find module
Solution: Check package.json, reinstall dependencies

Error: MongoDB connection failed
Solution: Verify MONGO_URI, whitelist IP 0.0.0.0 for initial setup

Error: Port already in use
Solution: Use PORT 5000, Render auto-assigns if needed
```

### Frontend Won't Deploy
```
Error: Build failed
Solution: Check build command, verify all imports

Error: Blank page
Solution: Check API URL in code, verify CORS headers

Error: API 404 errors
Solution: Update API URL to production backend
```

### Performance Issues
```
Slow backend: Check MongoDB indexes, optimize queries
Slow frontend: Minify CSS/JS, optimize images
Network latency: Use CDN (Cloudflare), caching headers
```

---

## 📈 Post-Deployment

### Monitor
- ✅ Backend response times
- ✅ Error rates
- ✅ Database performance
- ✅ Frontend load times

### Scale
- Add caching (Redis)
- Implement pagination
- Add API rate limiting
- Setup auto-scaling

### Maintain
- Monthly security updates
- Database backups
- Log rotation
- Dependency updates

---

## 🎓 Deployment Checklist

### Pre-Deployment
- [ ] Code tested locally
- [ ] Environment variables configured
- [ ] README updated
- [ ] Git repo clean
- [ ] No secrets in code
- [ ] API endpoints verified

### Deployment
- [ ] Backend deployed successfully
- [ ] Frontend API URL updated
- [ ] Environment variables set
- [ ] SSL certificates active
- [ ] CORS properly configured
- [ ] Database accessible

### Post-Deployment
- [ ] Frontend loads correctly
- [ ] Authentication works
- [ ] Can create/read/update notes
- [ ] Search/filter functional
- [ ] Theme toggle works
- [ ] Responsive on mobile

### Testing
- [ ] User registration works
- [ ] Login/logout works
- [ ] Notes CRUD operations work
- [ ] Search works
- [ ] Filter works
- [ ] No console errors
- [ ] Performance acceptable

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com
- **MDN Web Docs**: https://developer.mozilla.org

---

## 🎉 Deployment Complete!

Your Smart Study Notes Manager is now live in production! 🚀

**Accessibility**:
- Backend: `https://smartnotes-api.onrender.com`
- Frontend: `https://smartnotes.vercel.app`

**Next Steps**:
1. Share with users
2. Monitor performance
3. Gather feedback
4. Plan enhancements

---

**Questions? Check README.md or create an issue on GitHub**
