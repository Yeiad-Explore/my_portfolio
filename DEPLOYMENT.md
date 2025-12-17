# Vercel Deployment Guide

## Prerequisites
- ✅ Next.js project configured
- ✅ Build script in package.json
- ✅ No environment variables required
- ✅ All dependencies listed in package.json

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Import your repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Done!** Your site will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (first time will ask questions)
vercel

# Deploy to production
vercel --prod
```

## Post-Deployment

- Your site will auto-deploy on every push to main branch
- Preview deployments are created for pull requests
- Check build logs in Vercel dashboard if issues occur

## Troubleshooting

- **Build fails**: Check build logs in Vercel dashboard
- **Missing dependencies**: Ensure all dependencies are in `package.json`
- **Type errors**: Run `npm run build` locally first to catch issues

## Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

