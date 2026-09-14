# Environment Setup Guide

## Local Development

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. The `.env.local` file already contains:
```
FAKESTORE_API=https://fakestoreapi.com
```

3. Run development server:
```bash
npm run dev
```

## Vercel Deployment

1. Go to your Vercel project: https://vercel.com/dashboard

2. Click on your project **"lago"**

3. Go to **Settings** → **Environment Variables**

4. Click **"Add New"** and enter:
   - **Name:** `FAKESTORE_API`
   - **Value:** `https://fakestoreapi.com`
   - **Environments:** Select all (Production, Preview, Development)

5. Click **"Save"**

6. Redeploy your project:
   - Go to **Deployments** tab
   - Click **"Redeploy"** on the latest deployment
   - Or push a new commit to trigger automatic deployment

7. Wait for deployment to complete

## Verification

After deployment, your site should:
- ✅ Load the products page without errors
- ✅ Allow clicking on product cards
- ✅ Show product details page
- ✅ No "Error 4271503796" or server errors

If you still see errors:
1. Check Vercel logs: **Deployments** → Click deployment → **Logs**
2. Verify environment variable is set correctly
3. Try hard refresh (Ctrl+Shift+R)
