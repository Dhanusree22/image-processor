# Handwritten Text Segmentation - Deployment Guide

## Complete Setup for Local Development (Localhost)

This guide will help you set up and run the handwritten text segmentation application on your local machine using VS Code.

---

## Prerequisites

Before starting, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Git** (optional but recommended)
   - Download: https://git-scm.com/

3. **VS Code** (Visual Studio Code)
   - Download: https://code.visualstudio.com/

4. **OpenAI API Key** (for AI text simplification)
   - Get one: https://platform.openai.com/api-keys
   - Free trial credits available

---

## Step 1: Clone or Download the Project

### Option A: Using Git
\`\`\`bash
git clone <your-repo-url>
cd handwritten-text-segmentation
\`\`\`

### Option B: Using v0 Download
1. In v0, click the three dots menu
2. Select "Download ZIP"
3. Extract the ZIP file
4. Open terminal/command prompt in the extracted folder

---

## Step 2: Open Project in VS Code

\`\`\`bash
# Navigate to your project directory
cd handwritten-text-segmentation

# Open in VS Code
code .
\`\`\`

Or manually open VS Code → File → Open Folder → Select the project folder

---

## Step 3: Install Dependencies

Open a terminal in VS Code (Terminal → New Terminal or Ctrl+`)

\`\`\`bash
npm install
\`\`\`

This installs all required packages including:
- Next.js
- React
- Tailwind CSS
- AI SDK

**Installation time**: 2-3 minutes

---

## Step 4: Set Up Environment Variables

### Create `.env.local` file:

1. In VS Code's Explorer, right-click on the root folder
2. Select "New File"
3. Name it `.env.local`
4. Add the following:

\`\`\`env
# OpenAI API Key (required for AI text simplification)
OPENAI_API_KEY=your_api_key_here

# Optional: For development/testing
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

### Get Your OpenAI API Key:

1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key and paste into `.env.local`

**⚠️ Important**: Never share your API key publicly. The `.env.local` file is already in `.gitignore`.

---

## Step 5: Run Development Server

In VS Code terminal, run:

\`\`\`bash
npm run dev
\`\`\`

Expected output:
\`\`\`
> next dev
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local
\`\`\`

---

## Step 6: Access the Application

1. Open your web browser
2. Go to: **http://localhost:3000**
3. The app should load with:
   - Header showing "TextSegment"
   - Image upload section on the left
   - Results display on the right

---

## Step 7: Test the Application

### Upload a Handwritten Text Image:

1. Click on the upload area or drag-and-drop an image
2. Supported formats: JPG, PNG, WebP
3. The app will:
   - Extract text from the handwritten image
   - Simplify and clean up the text
   - Display both versions side-by-side

### Example Test Flow:

\`\`\`
1. Find a handwritten note image (or create one)
2. Upload to the application
3. Wait for processing (usually 2-5 seconds)
4. View extracted text and simplified version
\`\`\`

---

## Terminal Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (localhost:3000) |
| `npm run build` | Build for production |
| `npm run start` | Run production build |
| `npm run lint` | Check code quality |
| `npm test` | Run tests (if configured) |
| `Ctrl+C` | Stop the development server |

---

## Project Structure

\`\`\`
handwritten-text-segmentation/
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # App layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── process/
│           └── route.ts      # Image processing API
├── components/
│   ├── header.tsx            # Header component
│   ├── image-uploader.tsx    # Upload component
│   └── results-display.tsx   # Results component
├── .env.local                # Environment variables (CREATE THIS)
├── package.json              # Dependencies
├── next.config.mjs           # Next.js config
└── README.md                 # Documentation
\`\`\`

---

## Troubleshooting

### Issue: "Port 3000 already in use"

**Solution:**
\`\`\`bash
# Option 1: Use different port
npm run dev -- -p 3001

# Option 2: Kill process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
\`\`\`

### Issue: "API Key not found" error

**Solution:**
1. Check `.env.local` file exists in root directory
2. Verify `OPENAI_API_KEY` is set correctly
3. No spaces around the `=` sign
4. Restart dev server: Press Ctrl+C, then `npm run dev`

### Issue: "Module not found" error

**Solution:**
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
\`\`\`

### Issue: Image upload fails

**Solution:**
1. Check browser console (F12 → Console tab)
2. Ensure image size is under 20MB
3. Verify OpenAI API key is valid
4. Check internet connection

---

## Development Tips

### Enable Dark Mode:
- The app automatically supports dark mode based on system settings
- Toggle in browser dev tools (F12 → Settings → Theme)

### Hot Reload:
- Changes to files automatically reload the app
- No need to restart the server

### Debug Mode:
Open browser DevTools (F12) to:
- Check console for errors
- Inspect network requests
- View component props in React DevTools

---

## VS Code Extensions (Recommended)

1. **ES7+ React/Redux/React-Native snippets**
   - Provides code snippets for React development

2. **Tailwind CSS IntelliSense**
   - Auto-complete for Tailwind classes

3. **Thunder Client** (for API testing)
   - Test API endpoints directly from VS Code

4. **REST Client**
   - Alternative for testing API routes

---

## Next Steps

### Local Development:
- Modify components in `components/` folder
- Update styles in `app/globals.css`
- Add new routes in `app/` folder

### Deployment:

#### Option 1: Deploy to Vercel (Recommended)
\`\`\`bash
npm install -g vercel
vercel
\`\`\`
Follow prompts to connect your GitHub account and deploy.

#### Option 2: Deploy to Other Platforms
- **Netlify**: `netlify deploy`
- **Railway**: `railway link` then `railway deploy`
- **Docker**: Create Dockerfile for containerized deployment

---

## Performance Optimization

### Current Optimizations:
- ✅ Next.js image optimization
- ✅ CSS-in-JS with Tailwind
- ✅ Code splitting
- ✅ API route handling

### For Production:
\`\`\`bash
npm run build
npm run start
\`\`\`

---

## Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **AI SDK**: https://sdk.vercel.ai
- **OpenAI API**: https://platform.openai.com/docs

---

## Support & Issues

If you encounter issues:

1. Check this troubleshooting section
2. Review error messages in terminal and browser console
3. Visit v0.app for design/code support
4. Check GitHub Issues (if applicable)

---

## Quick Reference Card

\`\`\`bash
# Full setup from scratch
git clone <repo>
cd handwritten-text-segmentation
npm install
# Create .env.local with OPENAI_API_KEY
npm run dev

# Then open: http://localhost:3000
\`\`\`

---

Last Updated: 2025-01-04
