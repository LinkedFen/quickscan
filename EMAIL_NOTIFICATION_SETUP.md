# Email Notification Setup Guide

This guide explains how to configure email notifications for the Quick Scan application. When someone completes the quick scan, you will receive an email with their contact details and a PDF of their results.

## Overview

The application already includes code to send notifications to `/api/quickscan-notify` endpoint. You need to set up a backend serverless function to handle these requests and send emails.

## Option 1: Deploy to Netlify (Recommended)

Netlify offers free serverless functions and is easy to set up.

### Steps:

1. **Create a Netlify account** at https://netlify.com

2. **Connect your repository:**
   - Click "Add new site" → "Import an existing project"
   - Connect to your GitHub repository
   - Netlify will auto-detect the build settings from `netlify.toml`

3. **Get a SendGrid API Key:**
   - Sign up at https://sendgrid.com (free tier: 100 emails/day)
   - Navigate to Settings → API Keys
   - Create a new API key with "Mail Send" permissions
   - Copy the API key (you won't see it again!)

4. **Configure Environment Variables in Netlify:**
   - Go to Site settings → Environment variables
   - Add the following variables:
     - `NOTIFICATION_EMAIL`: `f.zwaans@supplyvalue.nl` (your email)
     - `SENDGRID_API_KEY`: Your SendGrid API key
     - `FROM_EMAIL`: A verified sender email (e.g., `noreply@yourdomain.com`)

5. **Verify Sender Email in SendGrid:**
   - In SendGrid, go to Settings → Sender Authentication
   - Verify a single sender email address (this will be used as FROM_EMAIL)

6. **Install Dependencies:**
   - In your repository, install the SendGrid package:
     ```bash
     npm install @sendgrid/mail
     ```
   - Commit and push the changes

7. **Deploy:**
   - Netlify will automatically build and deploy your site
   - The serverless function will be available at `/.netlify/functions/quickscan-notify`
   - The rewrite rule in `netlify.toml` makes it accessible at `/api/quickscan-notify`

8. **Test:**
   - Visit your Netlify site URL
   - Fill out the quick scan form
   - You should receive an email with the results!

### Troubleshooting Netlify:
- Check the Function logs in Netlify dashboard under "Functions" tab
- Ensure all environment variables are set correctly
- Verify your SendGrid sender email is authenticated

---

## Option 2: Deploy to Vercel

Vercel is another excellent platform with free serverless functions.

### Steps:

1. **Create a Vercel account** at https://vercel.com

2. **Connect your repository:**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Get a SendGrid API Key:**
   - Same as Netlify instructions above

4. **Configure Environment Variables in Vercel:**
   - During deployment or in Project Settings → Environment Variables
   - Add:
     - `NOTIFICATION_EMAIL`: `f.zwaans@supplyvalue.nl`
     - `SENDGRID_API_KEY`: Your SendGrid API key
     - `FROM_EMAIL`: Verified sender email

5. **Install Dependencies:**
   ```bash
   npm install @sendgrid/mail
   ```

6. **Deploy:**
   - Vercel will automatically deploy
   - The serverless function will be available at `/api/quickscan-notify`

7. **Test:**
   - Visit your Vercel site URL
   - Fill out and submit the quick scan
   - Check your email!

### Troubleshooting Vercel:
- Check Function logs in Vercel dashboard under "Functions" tab
- Ensure environment variables are set for Production environment
- Redeploy after adding environment variables

---

## Option 3: Use Alternative Email Services

Instead of SendGrid, you can use other email services. Here are some alternatives:

### Mailgun
```javascript
const mailgun = require('mailgun-js');
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
```

### AWS SES
```javascript
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });
```

### Postmark
```javascript
const postmark = require('postmark');
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
```

### Resend (Modern, Simple)
```javascript
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
```

To use a different service:
1. Modify `/netlify/functions/quickscan-notify.js` or `/api/quickscan-notify.js`
2. Replace the SendGrid code with your preferred service
3. Update environment variables accordingly
4. Install the appropriate npm package

---

## Option 4: GitHub Pages + External Backend

Since GitHub Pages doesn't support serverless functions, you have two options:

### A. Use a Third-Party Form Service (Easiest)
Services like FormSubmit, Formspree, or Web3Forms can handle form submissions:

1. Sign up for a service (e.g., https://formsubmit.co)
2. Get your form endpoint
3. Modify `src/main.js` to send data to that endpoint instead

### B. Host Backend Separately
1. Deploy just the serverless function to Netlify or Vercel
2. Update the fetch URL in `src/main.js` to point to your backend URL:
   ```javascript
   const res = await fetch("https://your-backend.netlify.app/.netlify/functions/quickscan-notify", {
     // ... rest of the code
   });
   ```

---

## Testing Locally

To test the notification function locally:

### Netlify Dev:
```bash
npm install netlify-cli -g
netlify dev
```

### Vercel Dev:
```bash
npm install vercel -g
vercel dev
```

Both will run your site locally with serverless functions working.

---

## Email Content

The notification email includes:
- Subject: "Nieuwe Quick Scan resultaten van [Name]"
- Contact details: Name, Email, Date
- Attached PDF with complete results and maturity profile

---

## Security Notes

1. **Never commit API keys** to your repository
2. **Use environment variables** for all sensitive data
3. **Validate sender domain** in SendGrid to prevent spoofing
4. **Rate limiting**: Consider adding rate limiting to prevent abuse
5. **CORS**: The functions are configured to accept requests from your domain only

---

## Cost Considerations

- **Netlify Free Tier**: 125k function invocations/month
- **Vercel Free Tier**: 100k function invocations/month  
- **SendGrid Free Tier**: 100 emails/day
- **Other services**: Most offer generous free tiers

For typical usage (a few scans per day), you'll stay well within free limits.

---

## Support

If you encounter issues:
1. Check the function logs in your hosting platform
2. Verify environment variables are set correctly
3. Test with a simple console.log to see if the function is being called
4. Check SendGrid activity logs to see if emails are being sent
5. Verify your sender email is authenticated in SendGrid

For questions specific to this application, contact: f.zwaans@supplyvalue.nl
