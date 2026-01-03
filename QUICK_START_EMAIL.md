# Quick Start: Email Notifications

This is a quick reference guide. For detailed instructions, see [EMAIL_NOTIFICATION_SETUP.md](./EMAIL_NOTIFICATION_SETUP.md).

## What You Need

1. A hosting platform that supports serverless functions (Netlify or Vercel)
2. A SendGrid account (free tier available)
3. 15 minutes to set up

## Fastest Setup: Netlify

1. **Sign up**: Create account at https://netlify.com
2. **Deploy**: Connect your GitHub repo to Netlify
3. **SendGrid**: 
   - Sign up at https://sendgrid.com
   - Create API key with "Mail Send" permission
   - Verify a sender email address
4. **Configure Environment Variables** in Netlify:
   ```
   NOTIFICATION_EMAIL=f.zwaans@supplyvalue.nl
   SENDGRID_API_KEY=<your-api-key>
   FROM_EMAIL=<verified-sender-email>
   ```
5. **Install dependency**:
   ```bash
   npm install @sendgrid/mail
   git add package*.json
   git commit -m "Add SendGrid for email notifications"
   git push
   ```
6. **Test**: Fill out the form on your deployed site!

## Alternative: Vercel

Same steps as Netlify, but:
1. Sign up at https://vercel.com
2. Import your GitHub repository
3. Add same environment variables
4. Deploy!

## Already on GitHub Pages?

You have two options:
1. Keep GitHub Pages for the frontend, deploy just the backend to Netlify/Vercel
2. Move entirely to Netlify/Vercel (they also serve static sites)

See [EMAIL_NOTIFICATION_SETUP.md](./EMAIL_NOTIFICATION_SETUP.md) for details.

## Files Added

- `/netlify/functions/quickscan-notify.js` - Netlify serverless function
- `/api/quickscan-notify.js` - Vercel serverless function  
- `netlify.toml` - Netlify configuration
- `vercel.json` - Vercel configuration
- `.env.example` - Environment variables template

## Need Help?

Contact: f.zwaans@supplyvalue.nl
