# Environment Variables Documentation

## Overview

This document describes all environment variables used in EaseSplit and how to configure them.

## Configuration Files

- `.env.local` - Local development (not committed to git)
- `.env.example` - Template for environment variables
- `.env.production` - Production environment (set in hosting platform)

## Required Variables

### SMTP Configuration

#### SMTP_HOST
- **Description**: SMTP server hostname
- **Required**: Yes (for email features)
- **Examples**:
  - Gmail: `smtp.gmail.com`
  - Outlook: `smtp.office365.com`
  - SendGrid: `smtp.sendgrid.net`
  - Custom: `smtp.yourdomain.com`
- **Default**: `smtp.gmail.com`

```env
SMTP_HOST=smtp.gmail.com
```

#### SMTP_PORT
- **Description**: SMTP server port
- **Required**: Yes
- **Common Values**:
  - `587` - TLS (Recommended)
  - `465` - SSL
  - `25` - Unencrypted (Not recommended)
- **Default**: `587`

```env
SMTP_PORT=587
```

#### SMTP_USER
- **Description**: SMTP authentication username (usually your email)
- **Required**: Yes
- **Format**: email address
- **Example**: `easesplit.tool@gmail.com`

```env
SMTP_USER=your-email@gmail.com
```

#### SMTP_PASSWORD
- **Description**: SMTP authentication password
- **Required**: Yes
- **For Gmail**: Use App Password (not regular password)
- **Format**: String (spaces allowed in App Passwords)
- **Example**: `abcd efgh ijkl mnop`

```env
SMTP_PASSWORD=your-app-password-here
```

**How to create Gmail App Password**:
1. Enable 2-Step Verification
2. Go to [Google Account > Security > App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Copy the 16-character password

#### SMTP_FROM
- **Description**: Sender name and email displayed in sent emails
- **Required**: No (defaults to SMTP_USER)
- **Format**: `Display Name <email@domain.com>`
- **Example**: `EaseSplit <noreply@easesplit.com>`

```env
SMTP_FROM=EaseSplit <noreply@easesplit.com>
```

#### SMTP_SECURE
- **Description**: Use SSL/TLS for secure connection
- **Required**: No
- **Values**: `true` or `false`
- **Default**: `false` (uses STARTTLS)
- **Use `true` for**: Port 465
- **Use `false` for**: Port 587

```env
SMTP_SECURE=false
```

## Admin Configuration

#### ADMIN_EMAIL
- **Description**: Email address for receiving contact form submissions
- **Required**: Yes (for contact form)
- **Format**: email address
- **Example**: `admin@easesplit.com`

```env
ADMIN_EMAIL=your-email@gmail.com
```

## Application URLs

#### NEXT_PUBLIC_APP_URL
- **Description**: Public URL of your application
- **Required**: Yes (for email links and metadata)
- **Format**: URL without trailing slash
- **Examples**:
  - Development: `http://localhost:3000`
  - Production: `https://easesplit.vercel.app`

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### NEXT_PUBLIC_EASESPLIT_URL
- **Description**: URL used in email footers (client-accessible)
- **Required**: No (falls back to APP_URL)
- **Format**: URL without trailing slash

```env
NEXT_PUBLIC_EASESPLIT_URL=https://easesplit.vercel.app
```

#### EASESPLIT_WEBSITE_URL
- **Description**: Server-side only website URL
- **Required**: No
- **Format**: URL without trailing slash

```env
EASESPLIT_WEBSITE_URL=https://easesplit.vercel.app
```

#### NEXT_PUBLIC_BASE_URL
- **Description**: Alternative base URL (client-accessible)
- **Required**: No
- **Format**: URL without trailing slash

```env
NEXT_PUBLIC_BASE_URL=https://easesplit.vercel.app
```

#### BASE_URL
- **Description**: Alternative base URL (server-only)
- **Required**: No
- **Format**: URL without trailing slash

```env
BASE_URL=https://easesplit.vercel.app
```

## Optional Configuration

#### NODE_ENV
- **Description**: Node.js environment
- **Required**: No (auto-set by Next.js)
- **Values**: `development`, `production`, `test`

```env
NODE_ENV=production
```

## URL Resolution Priority

The application checks URLs in this order:
1. `NEXT_PUBLIC_EASESPLIT_URL`
2. `EASESPLIT_WEBSITE_URL`
3. `NEXT_PUBLIC_BASE_URL`
4. `BASE_URL`
5. Fallback: `https://easesplit.vercel.app`

## Setup Instructions

### Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your values:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=EaseSplit <noreply@easesplit.com>
   ADMIN_EMAIL=your-email@gmail.com
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. Start development server:
   ```bash
   pnpm dev
   ```

### Vercel Deployment

1. Go to Project Settings → Environment Variables

2. Add each variable:
   - Name: `SMTP_HOST`
   - Value: `smtp.gmail.com`
   - Environment: Production, Preview, Development

3. Important variables for production:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=easesplit.tool@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=EaseSplit <noreply@easesplit.com>
   ADMIN_EMAIL=admin@easesplit.com
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. Redeploy after adding variables

### Other Platforms

#### Netlify
Settings → Environment Variables → Add each variable

#### Railway
Variables tab → Add each variable

#### Docker
Use `--env-file` flag:
```bash
docker run --env-file .env.local easesplit
```

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use App Passwords** for Gmail (not your main password)
3. **Rotate passwords** regularly
4. **Use different credentials** for development and production
5. **Limit SMTP permissions** to only what's needed
6. **Enable 2FA** on email accounts
7. **Monitor email usage** for suspicious activity

## Troubleshooting

### Email Not Sending

1. **Check SMTP credentials**:
   - Verify SMTP_USER and SMTP_PASSWORD are correct
   - For Gmail, ensure you're using an App Password

2. **Check SMTP settings**:
   - Verify SMTP_HOST and SMTP_PORT
   - Try port 587 with SMTP_SECURE=false
   - Try port 465 with SMTP_SECURE=true

3. **Check email provider**:
   - Enable "Less secure app access" (if required)
   - Check for blocked/suspicious activity alerts
   - Verify account is not locked

4. **Check logs**:
   - View server logs in hosting platform
   - Check browser console for errors
   - Look for specific error messages

### Environment Variables Not Loading

1. **Restart development server** after changing `.env.local`
2. **Verify file name** is exactly `.env.local`
3. **Check variable names** match exactly (case-sensitive)
4. **For public variables**, must start with `NEXT_PUBLIC_`
5. **Clear `.next` cache**: `rm -rf .next`

### Production Issues

1. **Verify all variables** are set in hosting platform
2. **Check variable values** have no extra spaces
3. **Redeploy** after changing environment variables
4. **Test email** in production environment
5. **Check logs** in hosting platform dashboard

## Example Configurations

### Gmail Configuration
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop
SMTP_FROM=EaseSplit <noreply@easesplit.com>
```

### Outlook/Office365 Configuration
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
SMTP_FROM=EaseSplit <noreply@easesplit.com>
```

### SendGrid Configuration
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_FROM=EaseSplit <noreply@yourdomain.com>
```

## Testing

Test email configuration:
```bash
# Send test email through contact form
# Or use the app's email features
```

Verify environment variables are loaded:
```javascript
console.log(process.env.SMTP_HOST) // Server-side only
console.log(process.env.NEXT_PUBLIC_APP_URL) // Works client-side
```
