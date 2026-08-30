# Smart ResumeCraft (smartresumecraft.netlify.app) - Master Improvement Prompt & Technical Guide

> **Purpose**: This master prompt is a production-grade blueprint designed to instruct AI coding assistants or software engineers on how to extend, optimize, test, deploy, and market **Smart ResumeCraft** (https://smartresumecraft.netlify.app/).

---

## 1. Executive Product Overview & Vision
Smart ResumeCraft is an all-in-one, privacy-first, free AI Resume Builder and Career Success Platform. It allows job seekers to:
- Build 100% ATS-friendly resumes in real-time with modern customizable templates.
- Run interactive live ATS compatibility scans with instant diagnostic feedback (0-100 score).
- Utilize role-specific AI bullet point enhancers, action verb generators, and tone customizers.
- Generate customized, recruiter-approved cover letters with multi-tone formulas and instant PDF/TXT export.
- Track job applications and interviews in an interactive Kanban board and pipeline manager.

---

## 2. Technical Stack & Architecture Guidelines

### Frontend Framework & Styling
- **Core Library**: React 19 + Vite 8 SPA.
- **Routing**: `react-router-dom` v7.
- **Icons**: `lucide-react`.
- **Drag & Drop**: `@dnd-kit/core`, `@dnd-kit/sortable`.
- **PDF Generation**: `html2pdf.js` client-side rendering.
- **Styling Paradigm**: Vanilla CSS (`src/index.css`) with HSL design variables, glassmorphism cards, responsive media queries, and micro-animations. Avoid ad-hoc utility clutter.

### Backend & Database (Hybrid Architecture)
- **Node.js Express Backend**: `server/index.js` running on port `5000`.
- **Database & ORM**: PostgreSQL with Prisma ORM (`prisma/schema.prisma`).
- **Offline / Zero-Config Resilience**: Automatic in-memory storage fallback (`memoryStore`) when local PostgreSQL is offline, ensuring zero friction for developers and guest visitors.

---

## 3. SEO & Indexing Mastery (Google & Bing)

To ensure maximum organic search visibility on Google and Bing:
1. **Dynamic Head Manager**: Use `SeoHead.jsx` to dynamically inject:
   - Route-specific `<title>` and `<meta name="description">`.
   - `<link rel="canonical" href="...">` matching exact route URLs.
   - OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter Card tags.
   - JSON-LD structured schemas (`WebApplication`, `WebPage`, `FAQPage`, `BreadcrumbList`).
2. **Sitemap Indexing**: Ensure `public/sitemap.xml` contains all landing page paths:
   - `/`
   - `/ats-resume-checker`
   - `/resume-templates`
   - `/how-to-write-a-resume`
   - `/resume-summary-examples`
   - `/ai-engineer-resume-example`
   - `/student-resume-example`
   - `/examples`
   - `/ats-tips`
   - `/cover-letters`
   - `/applications`
3. **Netlify Redirects**: Maintain `public/_redirects` with `/* /index.html 200` to support SPA client-side routing on Netlify deployments.

---

## 4. Master Prompt for AI Agents / Developers

```markdown
Role & Context:
You are an expert Principal Full-Stack Engineer and UX Specialist working on Smart ResumeCraft (https://smartresumecraft.netlify.app/).

Core Objectives:
1. Maintain 100% client-side performance, fast page loads, and zero lag during live resume rendering.
2. Ensure all resumes export cleanly to single-page or multi-page A4/Letter PDF format without cutting off bullet text or header margins.
3. Keep ATS optimization front and center: check contact details, summary word count, action verb density, and quantifiable metric percentages.
4. Maintain SEO compliance: ensure all new public landing pages have canonical tags, OpenGraph images, and structured JSON-LD schemas.

Code Quality Standards:
- Do not remove existing fallback logic or offline memory stores in server/index.js.
- Ensure all forms use controlled state and provide clear user feedback upon action completion.
- Keep buttons, inputs, and badges keyboard-accessible with visible focus states.
```

---

## 5. Deployment & Build Commands

```bash
# Install dependencies
npm install

# Run backend & frontend concurrently in development mode
npm run dev

# Execute database migrations (when PostgreSQL is active)
npm run db:push

# Build production bundle for Netlify deployment
npm run build
```
