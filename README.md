# Resume & CV Craft 🚀

> An AI-powered ATS Resume Builder, ATS Score Checker, Cover Letter Tailor, and Job Application Tracker built with **React**, **TypeScript**, **Tailwind CSS**, and **Firebase** (Authentication, Cloud Firestore, and Hosting).

🌐 **Live Application**: [https://resume-cv-craft.web.app](https://resume-cv-craft.web.app)

---

## 🌟 Key Features

1. **Interactive Real-Time Resume Builder (`/builder`)**
   - Live split-screen preview with A4 standard sheet rendering and zoom controls.
   - 5 ATS-compliant templates: *Modern Clean*, *Tech Minimal*, *Executive Serif*, *Professional Slate*, *Compact Sidebar*.
   - Custom styling controls (Outfit, Inter, Merriweather Serif, JetBrains Mono), accent color palette, font sizing, and spacing.
   - Built-in **AI Bullet Enhancer** with **Google X-Y-Z formula** (*"Accomplished [X] as measured by [Y], by doing [Z]"*).
   - High-fidelity **1-click Vector PDF export** (clean selectable text for Workday, Taleo, Greenhouse, and Lever).
   - JSON Backup & Restore and sample profile presets (Senior AI Engineer, Fresh CS Grad, Product Manager).

2. **Real-Time ATS Resume Score Checker (`/ats-checker`)**
   - 0–100 ATS compatibility score.
   - Real-time keyword density comparison against any target Job Description.
   - Category breakdowns: Keywords, Measurable metrics, Action verbs density, Formatting readability, and Contact info.
   - Actionable step-by-step optimization roadmap with 1-click missing keyword addition.

3. **AI Cover Letter Generator (`/cover-letters`)**
   - Automatically tailors professional cover letters from your active resume achievements, target role, and company name.
   - 1-click PDF download & copy to clipboard.

4. **Job Application Tracker Kanban (`/applications`)**
   - Visual Kanban pipeline: *Wishlist → Applied → Interviewing → Offer Received → Archived*.
   - Track salary targets, interview dates, application links, and notes.

5. **Career Boosters**
   - **AI 10-Q Interview Practice (`/interview-prep`)**: Role-specific mock interview questions with STAR method guidance.
   - **LinkedIn Headline & Bio Optimizer (`/linkedin-optimizer`)**: Generate SEO-friendly headlines and recruiter-converting About sections.
   - **Template Gallery (`/templates`)**: Explore all 5 ATS layouts.

6. **Firebase Integration**
   - **Firebase Authentication**: Google Sign-In, Email/Password sign up, or 1-click Guest mode (zero sign-up barrier).
   - **Cloud Firestore**: Seamless auto-syncing of resumes, cover letters, and job applications across devices with offline LocalStorage fallback.
   - **Custom Firebase Config Modal**: Easily connect your own Firebase project credentials at runtime.
   - **Firebase Hosting**: Ready configuration with `firebase.json` and single-page routing rewrites.

---

## 🛠️ Tech Stack

- **Frontend**: React 18/19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **PDF Generation**: Native Vector `@media print` + `html2canvas` & `jspdf`
- **Backend & Cloud**: Firebase SDK (Auth, Firestore, Hosting)
- **State Management**: React Context with LocalStorage offline caching and Firestore sync

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy to Firebase Hosting
```bash
# 1. Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Initialize / select your project
firebase init hosting

# 4. Deploy
firebase deploy
```

---

## 🔒 Security Rules

The repository includes `firestore.rules` which ensures user-isolated security:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

© Resume & CV Craft. 100% Free & Open Career Platform.
