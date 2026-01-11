# Finance Hub - Deployment Guide

## 🚀 Deployment Options

Finance Hub is ready to deploy to any platform that supports Next.js applications. Here are the recommended deployment options:

---

## Option 1: Vercel (Recommended - Easiest)

**Free tier includes:**
- Automatic SSL
- Global CDN
- Instant rollbacks
- Preview deployments for PRs

### Steps:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via GitHub** (Recommended):
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Vercel auto-detects Next.js configuration
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   vercel
   ```

4. **Environment Variables** (Optional):
   - Go to Project Settings → Environment Variables
   - Add any API keys from `.env.example`
   - Note: News feed works without API keys!

---

## Option 2: Netlify

**Features:**
- Free SSL
- Continuous deployment
- Build plugins
- Forms handling

### Steps:

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

4. **Or connect GitHub**:
   - Go to [netlify.com](https://netlify.com)
   - Connect your repository
   - Build command: `npm run build`
   - Publish directory: `.next`

---

## Option 3: Self-Hosted (VPS/Docker)

### Using Node.js:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **With PM2** (recommended for production):
   ```bash
   npm install -g pm2
   pm2 start npm --name "finance-hub" -- start
   pm2 save
   pm2 startup
   ```

### Using Docker:

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t finance-hub .
docker run -p 3000:3000 finance-hub
```

---

## Option 4: Static Export (GitHub Pages, S3, etc.)

Finance Hub can be exported as static HTML for hosting on any static server.

### Steps:

1. **Update `next.config.js`** (already configured):
   ```javascript
   module.exports = {
     output: 'export',  // Add this line
     trailingSlash: true,
     images: { unoptimized: true }
   }
   ```

2. **Build static export**:
   ```bash
   npm run build
   ```

3. **Deploy the `out/` directory** to:
   - GitHub Pages
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Cloudflare Pages
   - Any static hosting service

---

## 🔧 Pre-Deployment Checklist

### Required:
- [x] Production build completes successfully
- [x] All images load correctly
- [x] News feed works (no API keys needed)
- [x] Mobile responsive design tested
- [x] Dark mode works properly
- [x] 404 page created
- [x] SEO meta tags configured

### Optional (for enhanced features):
- [ ] Add Google Analytics ID to `.env.local`
- [ ] Configure financial data API keys (Alpha Vantage, etc.)
- [ ] Set up custom domain
- [ ] Configure CDN caching rules
- [ ] Add monitoring (Sentry, LogRocket, etc.)

---

## 🌍 Environment Variables

### Required for Full Functionality:
None! The news feed works out of the box using RSS feeds.

### Optional API Keys:
```bash
# Google Analytics (recommended)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Financial Data APIs (optional - adds live stock data)
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_key_here
NEXT_PUBLIC_IEX_CLOUD_API_KEY=your_key_here
NEXT_PUBLIC_FINNHUB_API_KEY=your_key_here

# Additional News Sources (optional)
NEXT_PUBLIC_NEWS_API_KEY=your_key_here

# Currency Exchange (optional)
NEXT_PUBLIC_FIXER_API_KEY=your_key_here
```

**Important:** Only add to production environment variables, not in code!

---

## 📊 Performance Optimization

Already configured:
- ✅ Static generation for all pages
- ✅ Image optimization enabled
- ✅ Automatic code splitting
- ✅ Font optimization
- ✅ CSS minification
- ✅ API response caching

### Additional Recommendations:

1. **Enable Compression** (Vercel/Netlify do this automatically)

2. **Add `robots.txt`** (already included in `/app/robots.ts`)

3. **Configure Caching Headers**:
   ```javascript
   // In next.config.js
   async headers() {
     return [
       {
         source: '/:all*(svg|jpg|png|webp)',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=31536000, immutable',
           },
         ],
       },
     ]
   }
   ```

---

## 🔒 Security Checklist

- [x] No API keys in client-side code
- [x] Environment variables properly configured
- [x] HTTPS enforced (platform handles this)
- [x] CSP headers (configure in next.config.js if needed)
- [x] No sensitive data in public directory

---

## 🚦 Testing Your Deployment

After deployment, verify:

1. **Homepage loads** with live news feed
2. **Calculators work** (mortgage, investment, loan)
3. **Blog posts** are accessible
4. **Navigation** works on all pages
5. **Images load** from Unsplash CDN
6. **Dark mode** toggle functions
7. **Mobile view** is responsive
8. **404 page** displays for invalid URLs

---

## 📈 Post-Deployment Monitoring

### Vercel Analytics (Free):
- Automatically enabled on Vercel
- Shows Web Vitals, traffic, performance

### Google Analytics (Recommended):
1. Get GA4 Measurement ID from [analytics.google.com](https://analytics.google.com)
2. Add to environment variables: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. Already integrated in the codebase!

### Custom Monitoring:
- Consider adding Sentry for error tracking
- Use Vercel/Netlify logs for debugging
- Monitor API rate limits if using paid tiers

---

## 🔄 Continuous Deployment

### GitHub Actions Example:

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test # if you add tests
```

---

## 🆘 Troubleshooting

### Build Fails:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading:
- Check `next.config.js` has `unoptimized: true`
- Verify Unsplash URLs are not blocked by firewall
- Check CORS settings if using custom domain

### API Errors:
- RSS feeds work without authentication
- Verify environment variables are set correctly
- Check API rate limits if using paid services

---

## 📞 Support

For deployment issues:
1. Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
2. Review platform-specific documentation
3. Check GitHub issues for similar problems

---

## ✅ Ready to Deploy!

Your Finance Hub is production-ready. Choose your preferred platform and deploy with confidence!

```bash
# Quick verification
npm run build && npm start
```

Then open http://localhost:3000 to test before deploying.
