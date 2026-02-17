# Quick Start Guide - 5 Minutes to Deploy

## Step 1: Download & Extract (1 min)
Download the ZIP from v0.app and extract to a folder.

## Step 2: Open in VS Code (1 min)
\`\`\`bash
code .
\`\`\`

## Step 3: Run Setup Script (2 min)

**Windows:**
\`\`\`bash
setup.bat
\`\`\`

**Mac/Linux:**
\`\`\`bash
chmod +x setup.sh
./setup.sh
\`\`\`

## Step 4: Add API Key (1 min)
1. Get free API key: https://platform.openai.com/api-keys
2. Edit `.env.local` file
3. Paste your API key

## Step 5: Launch App (0 min)
Terminal shows:
\`\`\`
Local:        http://localhost:3000
\`\`\`
Copy-paste into browser → Done!

---

## Troubleshooting

### "Node.js not found"
Install from: https://nodejs.org/

### "Port 3000 in use"
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### "API key error"
- Restart VS Code
- Check `.env.local` exists
- Restart dev server

### "Image won't upload"
- Check internet connection
- Verify API key is valid
- Try different image (under 20MB)

---

## Next: Read DEPLOYMENT_GUIDE.md for complete documentation
