# Quick Scan Logistieke Ketenvolwassenheid

**🚀 [Try the Live Application](https://fen-z.github.io/quickscan/)**

A static web application for assessing supply chain maturity across five key dimensions: Warehouse & Inventory Management, Transport & Distribution, Planning, IT & Data-Driven Operations, and Chain Governance & Collaboration.

## Features

- Interactive questionnaire with 2 questions per dimension
- Radar chart visualization of maturity levels (1-5 scale)
- Personalized advice for improving to the next maturity level
- PDF export functionality with results and recommendations
- Responsive design for desktop and mobile devices
- Legacy browser support

## Prerequisites

- Node.js 18.x or higher
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/zwennaf/quickscan.git
cd quickscan
```

2. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Building for Production

Build the application:
```bash
npm run build
```

The build output will be generated in the `dist/` directory.

Preview the production build locally:
```bash
npm run preview
```

## Testing

Run the test suite:
```bash
npm test
```

## Project Structure

```
quickscan/
├── src/                    # Source files
│   ├── index.html         # Main HTML file
│   ├── main.js           # Application entry point
│   ├── style.css         # Global styles
│   ├── appTemplate.js    # HTML template
│   ├── charting.js       # Radar chart functionality
│   └── pdfExport.js      # PDF export functionality
├── __tests__/            # Test files
├── dist/                 # Production build output (generated)
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Deployment

### GitHub Pages

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

The deployment workflow:
1. Installs dependencies
2. Builds the application
3. Deploys the `dist/` directory to GitHub Pages

To enable GitHub Pages:
1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Build and deployment", select "GitHub Actions" as the source
4. The site will be available at `https://[username].github.io/quickscan/`

### Manual Deployment

You can deploy the `dist/` directory to any static hosting service:

1. Build the application: `npm run build`
2. Upload the contents of the `dist/` directory to your hosting provider

Compatible hosting services include:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

## Configuration

### Base URL

The application is configured with `base: "/quickscan/"` in `vite.config.js` for GitHub Pages deployment at `https://zwennaf.github.io/quickscan/`. If deploying to a different location, update the `base` option:

```javascript
export default defineConfig({
  base: "/your-subdirectory/",  // For subdirectory hosting
  // or
  base: "/",  // For root domain hosting
  // ...
});
```

### Logo

To add a logo to the PDF export, set the `SUPPLY_VALUE_LOGO` variable in `src/main.js` with a base64-encoded PNG:

```javascript
const SUPPLY_VALUE_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANS...";
```

## Technologies Used

- **Vite** - Build tool and dev server
- **Chart.js** - Radar chart visualization
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas rendering for PDF
- **Jest** - Testing framework

## Browser Support

The application supports:
- Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- Legacy browsers through Vite's legacy plugin

## License

Private project for Supply Value.

## Contact

For questions or support, contact: f.zwaans@supplyvalue.nl
