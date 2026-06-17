# **App Name**: Civitas Link

## Core Features:

- Intelligent Service Hub: Large-grid navigation for citizen services (IPTU, Certificates, Ombudsman) including a tool to generate dynamic QR codes for mobile redirect.
- Managed Media Carousel: Full-screen interactive screensaver that triggers after 30s of inactivity to display institutional news and advertising.
- Physical Accessibility Controls: Dedicated UI modes including High Contrast for visual impairment and Wheelchair Mode which relocates interactive elements to the bottom third of the 70-inch screen.
- Live News Feed: Dynamic aggregation of city news and cultural events pulled from the central administrative database.
- Admin Command Center: Secure dashboard for the Communications Secretary to update news content, manage screensaver media, and monitor terminal status.
- Emergency Alert System: A real-time administrative override that displays a high-priority, flashing warning banner across all terminals for critical city announcements.
- Real-time Content Sync: Utilizes a Firestore database to ensure content updates made in the admin panel reflect instantly on public kiosks.

## Style Guidelines:

- Primary Color: Deep Trust Blue (#1145b3) used for main structural elements and robust headings, ensuring maximum visibility on large displays.
- Background Color: Cool Neutral Gray (#f2f4f7) to reduce glare and provide a comfortable backdrop for high-brightness public terminals.
- Accent Color: Vibrant Sky Blue (#22abca) for interactive states, call-to-actions, and navigation indicators.
- Font Pairing: 'Space Grotesk' for high-impact headlines to ensure technical precision; 'Inter' for body text to maintain exceptional legibility in outdoor lighting.
- Touch-First Ergonomics: Large touch targets (min 80px) and 'Safe Zones' for wheelchair accessibility, utilizing the massive verticality of a 70-inch screen efficiently.
- Bold Line Icons: High-weight, 2pt stroke iconography for clarity across large screen real estate, emphasizing public utility and service types.
- Subtle UI Feedback: 200ms easing transitions on touch interactions and soft fades for the screensaver to prevent 'flash-frame' fatigue in public spaces.