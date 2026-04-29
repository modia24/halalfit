# HalalFit — Deployment Guide
## Get your app live on the internet in 15 minutes. Free.

---

## What you need
- A computer (Windows, Mac, or Linux)
- A free GitHub account → github.com
- A free Vercel account → vercel.com

---

## Step 1 — Install the tools (5 min)

### Install Node.js
Go to **nodejs.org** and download the LTS version. Install it.

Check it worked — open Terminal (Mac) or Command Prompt (Windows) and type:
```
node --version
```
You should see something like `v20.0.0`

### Install Git
Go to **git-scm.com** and download Git. Install it.

---

## Step 2 — Set up the project (3 min)

Download the **halalfit** folder I built for you.

Open Terminal / Command Prompt and navigate to the folder:
```bash
cd halalfit
```

Install the dependencies:
```bash
npm install
```

Test it runs locally:
```bash
npm start
```
Your browser should open at **http://localhost:3000** and you'll see HalalFit running on your computer.

Press `Ctrl+C` to stop it.

---

## Step 3 — Put it on GitHub (3 min)

Go to **github.com** → click **New Repository**
- Name it: `halalfit`
- Set to **Public**
- Click **Create Repository**

Then in your Terminal run these commands one by one:
```bash
git init
git add .
git commit -m "Initial HalalFit launch"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/halalfit.git
git push -u origin main
```

Replace `YOURUSERNAME` with your actual GitHub username.

---

## Step 4 — Deploy on Vercel (2 min)

1. Go to **vercel.com** and sign up with your GitHub account
2. Click **"Add New Project"**
3. Find your `halalfit` repo and click **Import**
4. Leave all settings as default — Vercel detects it automatically
5. Click **Deploy**

Wait ~60 seconds. Vercel builds your app.

**Your app is now live!** Vercel gives you a URL like:
```
https://halalfit.vercel.app
```

---

## Step 5 — Get a custom domain (optional, €10/year)

Instead of `halalfit.vercel.app` you can have `halalfit.de`

1. Buy the domain at **namecheap.com** or **united-domains.de** (search `halalfit.de`)
2. In Vercel → your project → **Settings → Domains**
3. Add your domain and follow the instructions

**Recommended domain names:**
- halalfit.de
- halalfit-app.de
- halalsupplements.de

---

## Step 6 — Update the app in the future

Whenever you want to update the app (add products, fix something), just:

```bash
git add .
git commit -m "Updated products"
git push
```

Vercel automatically rebuilds and updates your live site within 60 seconds.

---

## Important — Add your Anthropic API Key

The AI features (ingredient checker, quiz advisor) need an API key to work in production.

1. Go to **console.anthropic.com** → API Keys → Create Key
2. In Vercel → your project → **Settings → Environment Variables**
3. Add: `REACT_APP_ANTHROPIC_KEY` = your key

Then update the fetch calls in App.jsx to use:
```javascript
headers: {
  "Content-Type": "application/json",
  "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY,
  "anthropic-version": "2023-06-01"
}
```

---

## Your Launch Checklist

- [ ] App running locally (`npm start`)
- [ ] Code pushed to GitHub
- [ ] Deployed on Vercel — live URL working
- [ ] Tested on your phone browser
- [ ] Custom domain connected (optional)
- [ ] API key added for AI features
- [ ] Link in TikTok/Instagram bio updated
- [ ] First TikTok posted with link

---

## If something goes wrong

**"npm install" fails:**
Delete the `node_modules` folder and run `npm install` again.

**Vercel build fails:**
Check the build log in Vercel — it tells you exactly what went wrong.

**White screen on phone:**
Hard refresh the page (hold reload button on mobile).

**Need help:**
The Vercel docs at vercel.com/docs are excellent.

---

*HalalFit Deutschland — Dein Glaube. Deine Fitness. Kein Kompromiss.*
