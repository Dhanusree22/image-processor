# Free AI Setup Guide - Google Generative AI

## Why Google Generative AI?

- **Completely Free** - No credit card required
- **Unlimited requests** (Fair usage policy applies)
- **Fast and reliable** - Powers millions of applications
- **Easy to use** - Get API key in 2 minutes

## Step 1: Get Your Free API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Select "Create API key in new project" or use existing project
4. Copy the API key (starts with `AIza...`)

## Step 2: Add API Key to .env.local

1. Open your project folder in VS Code
2. Create or edit `.env.local` file in the root directory
3. Add this line:
   \`\`\`
   GOOGLE_API_KEY=AIza_your_key_here
   \`\`\`
4. Save the file

## Step 3: Install and Run

\`\`\`bash
# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force

# Install with legacy peer deps
npm install --legacy-peer-deps

# Start development server
npm run dev
\`\`\`

## Step 4: Test

1. Open http://localhost:3000 in your browser
2. Upload a handwritten text image
3. Wait for processing (first request takes 5-10 seconds)
4. See extracted text and simplified version

## API Rate Limits

- **Free tier:** Up to 15 requests per minute, 1,500 requests per day
- If you need more, upgrade to a paid plan from Google Cloud

## Troubleshooting

**Error: "API key missing"**
- Make sure `.env.local` exists and contains `GOOGLE_API_KEY=AIza_...`
- Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

**Error: "Invalid API key"**
- Check you copied the key correctly from https://aistudio.google.com/app/apikey
- Regenerate a new key if needed

**Slow processing**
- First request takes 5-10 seconds (normal)
- Subsequent requests are faster (2-3 seconds)
- Use smaller/clearer handwritten images for best results

**Rate limit exceeded**
- You've hit the 15 req/min limit
- Wait a minute and try again
- Use paid tier for more requests
