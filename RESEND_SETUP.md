# FREE Alternative to SendGrid: Using Resend

If you cannot create a SendGrid account, **Resend** is an excellent free alternative that's even easier to use!

## Why Resend?

✅ **100 emails/day** and **3,000 emails/month** on free tier  
✅ **No credit card required** for free tier  
✅ **Easier setup** than SendGrid  
✅ **Modern API** with excellent documentation  
✅ **Test email included** (`onboarding@resend.dev`) - no domain verification needed for testing  

---

## Quick Setup with Resend (15 minutes)

### Step 1: Create Resend Account

1. Go to https://resend.com
2. Click "Sign Up" (GitHub or email login)
3. No credit card required!

### Step 2: Get Your API Key

1. After login, go to **API Keys** in the dashboard
2. Click **Create API Key**
3. Give it a name (e.g., "Quickscan Notifications")
4. Select "Sending access" permission
5. Copy the API key (starts with `re_...`)

### Step 3: Choose Your Function File

You need to use the `-resend` version of the serverless function:

**For Netlify:**
- Rename `/netlify/functions/quickscan-notify-resend.js` to `/netlify/functions/quickscan-notify.js`
- OR update your code to use the resend version

**For Vercel:**
- Rename `/api/quickscan-notify-resend.js` to `/api/quickscan-notify.js`
- OR update your code to use the resend version

**Simple approach:**
```bash
# For Netlify
mv netlify/functions/quickscan-notify.js netlify/functions/quickscan-notify-sendgrid.js
mv netlify/functions/quickscan-notify-resend.js netlify/functions/quickscan-notify.js

# For Vercel
mv api/quickscan-notify.js api/quickscan-notify-sendgrid.js
mv api/quickscan-notify-resend.js api/quickscan-notify.js
```

### Step 4: Install Resend Package

```bash
npm install resend
```

Commit and push the changes.

### Step 5: Configure Environment Variables

**In Netlify:**
1. Go to Site settings → Environment variables
2. Add:
   - `NOTIFICATION_EMAIL` = ``
   - `RESEND_API_KEY` = Your Resend API key (re_...)
   - `FROM_EMAIL` = `` (for testing)

**In Vercel:**
1. Go to Project Settings → Environment Variables
2. Add the same three variables above

### Step 6: Test It!

1. Deploy your site (Netlify/Vercel will auto-deploy on push)
2. Fill out the quickscan form
3. Check your email inbox!

**Note:** Initially, use `FROM_EMAIL=` for testing. Emails will come from Resend's test address.

---

## Adding Your Own Domain (Optional)

Once testing works, you can add your own domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `supplyvalue.nl`)
4. Add the DNS records Resend provides to your domain
5. Wait for verification (usually 5-15 minutes)
6. Update `FROM_EMAIL` to `noreply@yourdomain.com`

---

## Comparison: Resend vs SendGrid

| Feature | Resend (Free) | SendGrid (Free) |
|---------|---------------|-----------------|
| Emails/day | 100 | 100 |
| Emails/month | 3,000 | 3,000 |
| Credit card required | No | Yes (in some regions) |
| Test email included | Yes (`onboarding@resend.dev`) | No |
| Setup difficulty | Easier | More complex |
| API simplicity | Very simple | More complex |

---

## Troubleshooting

**"Error: Missing API key"**
- Make sure `RESEND_API_KEY` is set in your hosting platform's environment variables
- Verify the API key starts with `re_`

**"Error: Unauthorized"**
- Check that your API key has "Sending access" permission
- Regenerate the API key if needed

**"Emails not arriving"**
- Check spam/junk folder
- Verify `NOTIFICATION_EMAIL` is set correctly
- Check function logs in Netlify/Vercel dashboard
- Try using `onboarding@resend.dev` as FROM_EMAIL first

**"Domain not verified"**
- For testing, use `FROM_EMAIL=onboarding@resend.dev`
- For production, verify your domain in Resend dashboard first

---

## Code Example

The Resend code is simpler than SendGrid:

```javascript
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'user@example.com',
  subject: 'Hello World',
  html: '<strong>It works!</strong>',
  attachments: [
    {
      filename: 'document.pdf',
      content: base64String,
    }
  ]
});
```

That's it! Much simpler than SendGrid.

---

## Other Free Alternatives

If Resend doesn't work for you either, here are more options:

### 1. **Brevo (formerly Sendinblue)**
- Free tier: 300 emails/day
- No credit card required
- Setup: https://www.brevo.com

### 2. **Mailgun**
- Free tier: 100 emails/day for 3 months, then paid
- Credit card required
- More complex setup

### 3. **Postmark**
- No free tier, but very affordable ($10/month)
- Excellent deliverability

### 4. **FormSubmit** (No backend needed!)
- Completely free
- No programming required
- Just send form data to their endpoint
- Setup: https://formsubmit.co

---

## Support

For Resend-specific questions: https://resend.com/docs  
For this implementation: 
