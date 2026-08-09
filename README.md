# 🚀 ResumeCraft - AI-Powered Resume Builder

ResumeCraft is a modern, full-stack web application for creating, tailoring, and managing professional resumes with AI job compatibility matching, multiple template styles, dynamic section editing, and client-side PDF export.

---

## ✨ Features

- 📄 **Multiple Dynamic Templates**: Choose between **Modern**, **Minimal**, **Creative**, **Executive**, and **Tech** layouts.
- 🤖 **AI Job Match Optimizer**: Analyze job descriptions against your resume to compute compatibility scores, identify missing keywords, and get strategic profile suggestions.
- ⚡ **Live Interactive Preview**: Instant real-time rendering as you edit your personal information, experience, education, and skills.
- 🔐 **Authentication**: Support for Email Login/Signup, Guest Mode, and 1-Click Demo Login using JWT & bcrypt encryption.
- 📥 **Export to PDF**: Single-click high-resolution PDF download rendered directly in the browser via `html2pdf.js`.
- 🗄️ **PostgreSQL & Prisma Integration**: Data persistence using PostgreSQL and Prisma ORM with structured JSON resume storage.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8, React Router v7, React Hook Form, Lucide Icons, html2pdf.js, Vanilla CSS Design System.
- **Backend**: Node.js, Express.js 5, JSON Web Token (JWT), bcryptjs, CORS, dotenv.
- **Database**: SQLite (Zero-Config Default) / PostgreSQL, Prisma ORM, Prisma Studio GUI.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **PostgreSQL**: v14.x or higher

### 2. Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ResumeCraft.git
   cd ResumeCraft
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Initialize Database**:
   ```bash
   # Push schema to database
   npm run db:push

   # Seed default demo account & sample resume
   npm run db:seed
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - **Frontend**: `http://localhost:5173`
   - **Backend API**: `http://localhost:5000`

---

## 📜 Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs Express backend and Vite frontend concurrently |
| `npm run server` | Starts Express API backend server only |
| `npm run build` | Builds frontend production bundle |
| `npm run lint` | Runs ESLint code quality checks |
| `npm run db:push` | Pushes Prisma schema to PostgreSQL database |
| `npm run db:seed` | Seeds database with demo user & sample resumes |

---

## 🗄️ Database Management with Prisma Studio

To inspect and manage records visually in browser:
```bash
npx prisma studio --port 5555
```
Access at `http://localhost:5555`.

---

## 📄 License
MIT License. Free for personal and commercial use.
