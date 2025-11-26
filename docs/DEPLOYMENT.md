# Deployment Guide

## Overview

This guide covers deploying EaseSplit to various hosting platforms.

## Vercel (Recommended)

Vercel is the recommended platform for deploying EaseSplit as it's built with Next.js.

### Prerequisites

- GitHub/GitLab/Bitbucket account
- Vercel account

### Steps

1. **Push to Git Repository**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following variables:

     ```bash
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_USER=your-email@gmail.com
     SMTP_PASSWORD=your-app-password
     SMTP_FROM=EaseSplit <noreply@easesplit.com>
     ADMIN_EMAIL=admin@easesplit.com
     NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a production URL

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` environment variable

## Netlify

### Step

1. **Build Configuration**
   Create `netlify.toml`:

   ```toml
   [build]
     command = "pnpm build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy**
   - Connect your Git repository
   - Configure build settings
   - Add environment variables
   - Deploy

## Self-Hosting

### Using Docker

1. **Create Dockerfile** (if not exists):

   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   FROM node:18-alpine
   WORKDIR /app
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package.json ./package.json
   COPY --from=builder /app/public ./public

   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**:

   ```bash
   docker build -t easesplit .
   docker run -p 3000:3000 --env-file .env.local easesplit
   ```

### Using PM2

1. **Install PM2**:

   ```bash
   npm install -g pm2
   ```

2. **Build Application**:

   ```bash
   pnpm build
   ```

3. **Start with PM2**:

   ```bash
   pm2 start npm --name "easesplit" -- start
   pm2 save
   pm2 startup
   ```

## Environment Configuration

Ensure all required environment variables are set:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`
- `ADMIN_EMAIL`
- `NEXT_PUBLIC_APP_URL`

See [ENVIRONMENT.md](./ENVIRONMENT.md) for detailed configuration.

## Post-Deployment Checklist

- [ ] Test all features (add expense, create group, export, etc.)
- [ ] Verify email notifications work
- [ ] Check responsive design on mobile devices
- [ ] Test offline functionality
- [ ] Verify analytics tracking (if enabled)
- [ ] Test export features (PDF, CSV, JSON)
- [ ] Check SSL certificate is valid
- [ ] Test settlement calculations
- [ ] Verify local storage persistence

## Monitoring

### Vercel Analytics

Enable Vercel Analytics for performance monitoring:

1. Go to Project Settings → Analytics
2. Enable Analytics
3. View metrics in the Analytics dashboard

### Error Tracking

Consider integrating Sentry for error tracking:

```bash
pnpm add @sentry/nextjs
```

## Backup Strategy

Since EaseSplit stores data locally:

1. Encourage users to regularly export their data
2. Provide clear export instructions in the UI
3. Consider implementing automatic backup reminders

## Scaling Considerations

EaseSplit is designed as a lightweight, client-side application:

- Minimal server resources required
- Edge functions handle email notifications
- Static assets can be cached aggressively
- No database to manage

## Troubleshooting

### Build Failures

- Check Node.js version (18.x or later)
- Clear `.next` directory and rebuild
- Verify all dependencies are installed

### Email Not Sending

- Verify SMTP credentials
- Check Gmail App Password settings
- Review API route logs

### Production Errors

- Check browser console for client-side errors
- Review server logs on hosting platform
- Verify environment variables are set correctly
