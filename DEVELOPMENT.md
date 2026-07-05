# Muhammad Usman Al Haq — Portfolio

Personal portfolio website built with **Next.js 14 (App Router)** and pure CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── layout.tsx        ← Root layout (Devicons CDN + metadata)
├── page.tsx          ← Assembles all sections
└── globals.css       ← Design tokens + all component styles

components/
├── Navbar.tsx        ← Sticky glass navbar with scroll-spy
├── Hero.tsx          ← Aurora background, typewriter, stats
├── About.tsx         ← Bio + profile photo (next/image)
├── Skills.tsx        ← 8 skill groups with icon chips
├── Projects.tsx      ← 6 featured cards + filter bar
├── Experience.tsx    ← Timeline layout
├── Education.tsx     ← Education cards
├── Achievements.tsx  ← Achievements grid
├── Contact.tsx       ← Link-hub contact cards
├── Footer.tsx        ← Footer
└── ScrollTop.tsx     ← Fixed scroll-to-top button

public/
├── me.jpeg                            ← Profile photo
└── Muhammad_Usman_AlHaq_Resume.pdf    ← Resume (replace with real PDF)
```

## Deploy to Vercel

Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). No additional configuration needed — Next.js 14 is supported out of the box.

## Customization

- **LinkedIn / GitHub**: Already set in `components/Contact.tsx` and `components/Footer.tsx`
- **Resume**: Replace `public/Muhammad_Usman_AlHaq_Resume.pdf` with your actual PDF
- **Photo**: Replace `public/me.jpeg` with an updated photo (keep the same filename)
- **Colors**: All design tokens are in `app/globals.css` under `:root`
