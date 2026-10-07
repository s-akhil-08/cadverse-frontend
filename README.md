# 🌐 CADverse — Engineering Portfolio & Project Tracking Platform

A modern, high-performance web application for showcasing CAD engineering projects, submitting design requests, and tracking project lifecycles in real time. Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**, backed by a scalable **Dual-Backend Architecture** (Django REST Framework + Dedicated OTP / SMTP Service) with secure token-based authentication.

---

## ✨ Features

### 🔐 Dual-Backend & Secure Authentication
- **Dual-Backend Architecture**: Seamlessly routes general API traffic (projects, status, feedback) and dedicated OTP/SMTP mail traffic (signup OTP, reset passwords, notifications) to distinct microservices.
- **Email & OTP Verification**: 6-digit email OTP verification for secure account creation and forgot-password flows.
- **Token-Based Protected Routes**: Secure JWT/Token session persistence and authenticated dashboard routes.

### 📐 CAD Portfolio & Interactive Showcase
- **Engineering Projects Showcase**: Multi-category display (Automotive, Aerospace, Industrial Design, Mechanical Systems).
- **Before / After Comparison**: Visual comparison tools for model optimizations and design iterations.
- **Detailed Project View**: High-resolution gallery, design specifications, and interactive breakdown.

### ⚡ Real-Time Project Tracking (SSE)
- **Live Status Stream**: Real-time project lifecycle monitoring (**Submitted** ➔ **In Review** ➔ **In Progress** ➔ **Completed**) using Server-Sent Events (SSE).
- **Client Project Dashboard**: Centralized dashboard to view ongoing projects, submit new CAD models, and manage design assets.

### 💬 Feedback & Review System
- **Rating & Emoji Feedback**: Interactive 5-star rating system with emoji sentiment indicators.
- **Approval Workflow**: Moderated feedback pipeline with dynamic notification popups upon approval.
- **Testimonial Wall**: Filterable reviews and client feedback detail pages.

### 📬 Messaging & Contact Center
- **Direct Messaging**: Contact and inquiry dispatch with automated SMTP notifications.
- **Dark / Light Theme Toggle**: Dynamic theme switching with smooth transitions and persistent user preference.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide React Icons](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client**: [Axios](https://axios-http.com/) + Native Fetch
- **Authentication**: Django REST Token Auth + Dedicated OTP Email Service

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/s-akhil-08/cadverse-frontend.git
cd cadverse-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory (you can copy `.env.example`):

```bash
cp .env.example .env
```

Set the following variables:

```env
# 1. Main Backend API URL (for login, projects, feedback, uploads, SSE stream)
VITE_BACKEND_URL=https://backend-ak.vercel.app/api/

# 2. OTP Backend API URL (for signup OTP, verify OTP, forgot password, reset OTP, SMTP messages)
VITE_OTP_BACKEND_URL=https://backend-ak.vercel.app/api/
```

> **Note**: For local backend development, replace URLs with `http://127.0.0.1:8000/api/`.

---

## 🏃 Run Development Server

```bash
npm run dev
```

The application will start locally at:
```
http://localhost:5173
```

---

## 🏗️ Production Build

To type-check and generate an optimized production bundle:

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌍 Environment Variables Reference

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_BACKEND_URL` | Base URL for general backend services (Auth login, projects, feedback, SSE) | `https://backend-ak.vercel.app/api/` |
| `VITE_OTP_BACKEND_URL` | Base URL for OTP and SMTP email services (Signup OTP, Verify OTP, Password Reset, Messages) | `https://backend-ak.vercel.app/api/` |

---

## 📁 Project Structure

```
├── public/                 # Static assets, project diagrams, renders
├── src/
│   ├── components/         # Reusable UI components (Hero, Showcase, Contact, etc.)
│   │   ├── auth/           # Login, SignUp (OTP), Forgot Password pages
│   │   └── dashboard/      # User dashboard, project tracker, message center
│   ├── contexts/           # AuthContext (state management, dual backend routing)
│   ├── data/               # Static showcase and feedback seed data
│   ├── hooks/              # Custom hooks (notifications, feedback popups)
│   ├── lib/                # API configuration (api.ts) & Supabase client
│   ├── pages/              # Routed pages (ProjectsListPage, Reviews, FeedbackDetail)
│   ├── App.tsx             # Root application and route configuration
│   └── main.tsx            # React DOM entrypoint
├── .env.example            # Environment variables template
├── .gitignore              # Production git ignore configuration
├── package.json            # Scripts & project dependencies
├── tailwind.config.js      # Tailwind CSS design system config
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel SPA client rewrite routing
└── vite.config.ts          # Vite build configuration
```

---

## 📄 License

This project is open source and available under the [MIT License](https://github.com/s-akhil-08/cadverse-frontend/blob/main/LICENSE).
