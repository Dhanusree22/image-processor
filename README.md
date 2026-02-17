# TextSegment - Handwritten Text Extraction & Simplification

AI-powered web application for extracting and simplifying handwritten text from images using advanced OCR and GPT technology.

## Features

- **Image Upload**: Drag-and-drop or click to upload handwritten text images
- **Text Extraction**: Uses OpenAI's vision capabilities to extract handwritten text
- **AI Simplification**: GPT-powered text cleaning and simplification
- **Copy to Clipboard**: Easily copy extracted and simplified text
- **Dark Mode Support**: Built-in dark/light theme support
- **Responsive Design**: Works seamlessly on desktop and mobile

## Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- GOOGLE  API Key ([Get Free Credits](https://platform.openai.com/api-keys))
- VS Code (optional, recommended)

### Installation

#### Windows Users
\`\`\`bash
# Clone or download the project
cd handwritten-text-segmentation

# Run the automated setup script
setup.bat
\`\`\`

#### Mac/Linux Users
\`\`\`bash
# Clone or download the project
cd handwritten-text-segmentation

# Make script executable and run
chmod +x setup.sh
./setup.sh
\`\`\`

#### Manual Setup (All Platforms)
\`\`\`bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local and add your OpenAI API Key
# Then start development server
npm run dev
\`\`\`

### Access Application
Open your browser and go to: **http://localhost:3000**

## Usage

1. **Upload Image**: Click the upload area or drag an image with handwritten text
2. **Wait for Processing**: The app extracts text and simplifies it (2-5 seconds)
3. **View Results**: See extracted and simplified text side-by-side
4. **Copy Text**: Click "Copy" button to copy text to clipboard

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: GOOGLE API KEY
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React

## Project Structure

\`\`\`
handwritten-text-segmentation/
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/process/
│       └── route.ts          # Image processing API
├── components/
│   ├── header.tsx            # Header
│   ├── image-uploader.tsx    # Upload component
│   └── results-display.tsx   # Results component
├── .env.local                # Environment variables (create this)
├── .env.example              # Example environment file
├── package.json              # Dependencies
├── next.config.mjs           # Next.js configuration
├── DEPLOYMENT_GUIDE.md       # Detailed setup guide
├── README.md                 # This file
└── setup.sh/setup.bat        # Automated setup scripts
\`\`\`

## Commands

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Check code quality
\`\`\`

## Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
OPENAI_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

**Getting OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy and paste into `.env.local`

## Troubleshooting

### Port 3000 Already in Use
\`\`\`bash
# Use different port
npm run dev -- -p 3001
\`\`\`

### API Key Not Working
- Verify key is in `.env.local` (not `.env`)
- No spaces around `=` sign
- Restart dev server (Ctrl+C, then `npm run dev`)

### Image Upload Fails
- Check browser console (F12) for errors
- Ensure image size < 20MB
- Verify internet connection
- Verify OpenAI API key is valid

### Dependencies Installation Issues
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
npm run dev
\`\`\`

## Deployment

### Deploy to Vercel (Recommended)
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Deploy to Other Platforms
- **Netlify**: Follow Netlify's Next.js deployment guide
- **Railway**: `railway deploy`
- **Docker**: See `Dockerfile` in repository

## Configuration

### Tailwind CSS
Customizations in `app/globals.css` using design tokens:
- Primary color: Blue (--primary)
- Secondary color: Cyan (--secondary)
- Accent color: Cyan (--accent)

### Next.js
Configuration in `next.config.mjs`:
- React Compiler enabled
- Image optimization enabled

## Performance

- Optimized images with Next.js Image component
- CSS-in-JS with Tailwind for smaller bundle sizes
- Code splitting for faster initial load
- API route caching optimizations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## API Reference

### POST /api/process

Processes an image to extract and simplify handwritten text.

**Request:**
\`\`\`bash
curl -X POST http://localhost:3000/api/process \
  -F "image=@image.jpg"
\`\`\`

**Response:**
\`\`\`json
{
  "raw_text": "Extracted handwritten text...",
  "simplified_text": "Cleaned and simplified text..."
}
\`\`\`

## Contributing

Feel free to fork and submit pull requests for any improvements.

## License

MIT License - feel free to use this project for personal or commercial use.

## Support

For issues and questions:
1. Check the DEPLOYMENT_GUIDE.md
2. Review error messages in browser console (F12)
3. Visit v0.app for design support

## Roadmap

- [ ] Batch image processing
- [ ] Save results to file
- [ ] Multiple language support
- [ ] Custom OCR models
- [ ] Web API for third-party integration

---

**Created with v0.app** - AI-powered development tool by Vercel
