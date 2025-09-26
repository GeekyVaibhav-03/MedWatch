# MedWatch - Healthcare Dashboard

A modern, responsive healthcare dashboard for infection control and patient monitoring.

## Features

- **Real-time Dashboard** - Key metrics, alerts, and hospital map
- **Patient Tracing** - Contact tracing and movement tracking
- **Alert Management** - Critical alerts and notifications
- **Reports & Analytics** - Data visualization and reporting
- **User Management** - Role-based access control

## Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Animations:** GSAP
- **Routing:** React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/medwatch-dashboard.git
cd medwatch-dashboard
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Dashboard/          # Dashboard components
│   ├── Layout/            # Layout components (Sidebar, Header)
│   ├── PatientTracing/    # Patient tracing features
│   ├── Alerts/           # Alert management
│   ├── Reports/          # Reports and analytics
│   └── UserManagement/   # User management
├── App.jsx              # Main app component
├── main.jsx            # App entry point
└── index.css          # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project is configured for deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments.

## License

MIT License - see LICENSE file for details.
