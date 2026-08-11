# 🚀 AlgoVerse — AI-Powered Placement Readiness Platform

> A full-stack placement-readiness platform: AI resume analysis, ATS scoring, career roadmaps, job-match scoring, mock interviews, a resume builder, a portfolio builder, DSA progress tracking (LeetCode/Codeforces), company-specific interview prep, an internship/application tracker, and a community wall — for **any professional domain**, not just software.

🔗 **Live Demo:** [algo-verse-ten.vercel.app](https://algo-verse-ten.vercel.app)
🔗 **Backend API:** [ai-resume-analyser-backend-rllt.onrender.com](https://ai-resume-analyser-backend-rllt.onrender.com)
🔗 **GitHub:** [github.com/Vikky-Verma/AlgoVerse](https://github.com/Vikky-Verma/AlgoVerse)

---

## 🖥️ Live Preview

**[👉 Try AlgoVerse live](https://algo-verse-ten.vercel.app)** — no install needed, just register and upload a resume.

<!--
  Drop real screenshots/GIFs in a `docs/screenshots/` folder and reference them below,
  e.g.:
  <p align="center">
    <img src="docs/screenshots/landing.png" width="800" alt="AlgoVerse landing page" />
  </p>
  <p align="center">
    <img src="docs/screenshots/dashboard.png" width="49%" alt="Dashboard" />
    <img src="docs/screenshots/interview-room.png" width="49%" alt="Mock interview room" />
  </p>
-->

| Page | What it shows |
|---|---|
| Landing / Home | Animated marketing shell — cosmic background, feature highlights, pricing |
| Dashboard | Uploaded resumes, scores at a glance, quick links into every tool |
| Resume Detail | AI score breakdown, ATS score, skills/missing-skills, suggestions |
| Mock Interview Room | Live HR/Technical/DSA round with AI-scored answers |
| Company Prep | Company list ranked by interview-question volume + per-company checklist |
| Resume Builder / Portfolio Builder | Template-driven builder with live preview pane |
| Internship Tracker | Kanban board of applications by stage |

---

## 📸 Features

### Core resume intelligence
- 🔐 **Authentication** — JWT-based register/login, password strength enforced via Zod, **email OTP verification on signup** (6-digit code, hashed at rest, expires, rate-limited, resend cooldown), all auth routes IP rate-limited against brute force
- 📄 **Resume Upload & Parsing** — PDF/DOCX, stored on Cloudinary, text + embedded-link extraction
- 🧠 **AI Resume Analysis** — 6-dimension scoring (Impact, Domain Depth, Structure, Completeness, Keywords, Career Narrative) via Cloudflare Workers AI (Llama 3.1 70B), with domain and experience-level detection
- 🎯 **ATS Score** — Compatibility score with itemized deductions
- 💼 **Job Description Matching** — Match a resume against any JD, see gaps
- 🗺️ **Career Roadmap Generator** — Domain-specific, timeframe-based learning path
- 🧩 **Project Intelligence** — Analyzes listed projects, suggests improvements
- 📥 **PDF Report Export** — Download a full analysis report (PDFKit)

### Interview prep
- 🎤 **Mock Interviews** — HR / Technical / DSA round simulation with AI-scored answers, per-round feedback, an overall verdict, and a shareable report
- 🏢 **Company-Specific Prep** — Companies ranked by real interview-question volume (sourced from a community-aggregated dataset), with per-user solved-question tracking per company
- 📈 **DSA & Progress Tracking** — Pulls live public stats from **LeetCode** and **Codeforces** by handle, plus an overall progress summary dashboard

### Career tooling
- 🧱 **Resume Builder** — Build a resume from structured input with multiple visual templates and company-specific presets (content/formatting hints tuned per employer); can also import a starting draft from an already-parsed resume
- 🌐 **Portfolio Builder** — Build and publish a public portfolio (bio, skills, projects, social links) at a shareable slug URL; can import projects from an existing resume analysis
- 📋 **Internship/Application Tracker** — Kanban-style board (applied → OA → interview → offer/rejected) with drag-and-drop position, notes, deadlines, and a status-change history log

### Community & site
- 💬 **Community Wall** — Post, like, and comment, scoped to logged-in users
- ✉️ **Contact Form** — Rate-limited, forwarded to a configurable inbox via Brevo
- 📊 **Public Site Stats** — Lightweight visit counter surfaced on the public site
- 💳 **Pricing Page**, marketing **Landing/Home/About** pages, and a polished UI shell (cosmic animated background, cursor glow, tilt cards, magnetic buttons)

---

## 🔒 Security & Engineering Practices

- **Access control** — Every resource-by-id endpoint (analysis, ATS, career, PDF report, projects, roadmap, resume parsing, interviews, portfolio, applications, company prep) verifies the resource belongs to the authenticated user before returning data, centralized into a shared `getOwnedResume()` helper for resumes rather than repeating the check per controller.
- **Input validation** — Zod schemas on auth (registration, login, OTP verify/resend) and the contact form, applied through a single generic `validate(schema)` middleware instead of trusting raw request bodies.
- **Rate limiting** — Separate `express-rate-limit` limiters for `/register` + `/login` (10/15min), OTP verify/resend (8/15min), and the contact form (5/15min) to blunt credential stuffing, OTP brute-forcing, and spam.
- **OTP hygiene** — Verification codes are hashed (never stored in plaintext), expire, cap incorrect attempts, and enforce a resend cooldown; the pending signup record (name/email/hashed password) only becomes a real `User` after successful verification.
- **Secrets & data hygiene** — Resume files live in Cloudinary, not on the server filesystem; environment variables are the only place secrets are configured (see `.env.example`).
- **Centralized error handling** — All errors flow through one `AppError` + `errorHandler` middleware; operational errors return clean messages, unexpected errors are logged server-side without leaking stack traces to clients.
- **CORS allowlist** — Only the deployed frontend origin(s) and localhost are permitted, with credentials and explicit method/header allowlists.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | Frontend framework |
| Tailwind CSS | Styling |
| React Router v7 | Navigation |
| Framer Motion | Animations & page/UI transitions |
| Axios | API calls |
| Recharts | Progress/analytics charts |
| Lucide React + React Icons | Icons |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | Backend server |
| Prisma ORM | Database ORM |
| PostgreSQL (Neon) | Database |
| JWT + bcryptjs | Authentication |
| Zod | Request validation |
| express-rate-limit | Auth / OTP / contact-form rate limiting |
| Multer + Cloudinary | File upload & storage |
| pdf-parse + pdfjs-dist | PDF text & link extraction |
| Mammoth | DOCX text extraction |
| PDFKit | PDF report generation |
| Axios | Outbound calls to Brevo, LeetCode proxy, Codeforces, GitHub |

### AI & external data services
| Service | Purpose |
|---|---|
| Cloudflare Workers AI (Llama 3.1 70B) | Resume analysis, scoring, suggestions, roadmap generation, mock-interview question generation & feedback |
| Brevo (transactional email API) | Signup OTP emails and contact-form forwarding |
| LeetCode public stats (via proxy API) + Codeforces public API | DSA progress tracking by handle |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| Neon | PostgreSQL database |
| Cloudinary | File storage |

---

## 📁 Project Structure

```
AlgoVerse/
├── frontend/
│   └── src/
│       ├── api/axios.js
│       ├── components/
│       │   ├── Navbar.jsx, PublicNavbar.jsx, Footer.jsx, Layout.jsx
│       │   ├── ProtectedRoute.jsx, ScoreCard.jsx, SkillBadge.jsx
│       │   ├── CircularGauge.jsx, StreakCalendar.jsx
│       │   ├── effects/          # CosmicBackground, CursorGlow, GradientBorder,
│       │   │                     # MagneticButton, TiltCard
│       │   ├── animations/
│       │   ├── portfolioBuilder/ # PortfolioPreview
│       │   ├── resumeBuilder/    # ResumePreview
│       │   └── shared/           # CompletionSummary, StepperRail
│       ├── context/AuthContext.jsx
│       ├── data/                 # companyPresets.js, resumeTemplates.js
│       └── pages/                # Landing, Login, Register, VerifyOtp, Home,
│                                  # Dashboard, ResumeDetail, ATSChecker,
│                                  # AiRoadmap, ProjectIntelligence,
│                                  # MockInterviewSetup, InterviewRoom, InterviewReport,
│                                  # DsaInsights, CompanyPrep, CompanyPrepDetail,
│                                  # InternshipTracker, ResumeBuilder, PortfolioBuilder,
│                                  # PortfolioPublic, Progress, Community, Pricing,
│                                  # About, Contact, ComingSoon
│
├── backend/
│   ├── controllers/    # 16 controllers — resume, analysis, ats, career, roadmap,
│   │                   # project, interview, dsa, application, portfolio,
│   │                   # builderResume, companyPrep, progress, pdf, community,
│   │                   # contact, stats
│   ├── routes/         # one route file per controller
│   ├── services/       # aiAnalysisService, atsAnalysisService, careerService,
│   │                   # roadmapService, projectAnalysisService, interviewService,
│   │                   # dsaService (LeetCode/Codeforces), applicationService,
│   │                   # portfolioService, builderResumeService, companyPrepService,
│   │                   # progressService, pdfService, communityService,
│   │                   # profileInsightsService
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js     # global error handler
│   │   ├── rateLimiter.js      # auth / OTP / contact rate limiting
│   │   ├── uploadMiddleware.js # Cloudinary storage config
│   │   └── validate.js         # generic Zod validation middleware
│   ├── validators/      # authValidator.js, contactValidator.js
│   ├── utils/
│   │   ├── AppError.js, asyncHandler.js
│   │   ├── getOwnedResume.js   # centralized ownership check
│   │   ├── pdfParser.js, docxParser.js
│   │   ├── otp.js               # OTP generation/hashing/expiry
│   │   ├── mailer.js            # Brevo email sending
│   │   ├── geminiClient.js      # Cloudflare Workers AI client
│   │   └── prisma.js
│   ├── data/companyPrep.json    # company interview-question dataset
│   ├── prisma/schema.prisma
│   ├── app.js            # Express app (testable, no .listen())
│   ├── index.js          # entry point — connects DB, starts server
│   └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Vikky-Verma/AlgoVerse.git
cd AlgoVerse
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in your actual values
```

Run migrations and start:

```bash
npx prisma migrate dev
npx prisma generate
npm run dev
```

Backend runs at `http://localhost:8000`.

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## 🔑 Environment Variables (`backend/.env`)

| Variable | Used for |
|---|---|
| `DATABASE_URL` | Neon/Postgres connection string |
| `JWT_SECRET` | Signing auth tokens |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Resume file storage |
| `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_API_TOKEN` | Cloudflare Workers AI (Llama 3.1 70B) analysis calls |
| `GITHUB_TOKEN` | Optional — raises the GitHub API rate limit for profile-insight lookups |
| `BREVO_API_KEY` / `SMTP_FROM_EMAIL` / `SMTP_FROM_NAME` | Sending OTP verification emails and contact-form mail via Brevo |
| `CONTACT_TO_EMAIL` | Inbox that contact-form submissions are forwarded to (defaults to `SMTP_FROM_EMAIL`) |
| `PORT` | Server port (default `8000`) |
| `NODE_ENV` | `development` / `production` |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Start registration — validates input, emails a 6-digit OTP |
| POST | `/api/auth/register/verify-otp` | Verify OTP, create the account |
| POST | `/api/auth/register/resend-otp` | Resend OTP (cooldown-limited) |
| POST | `/api/auth/login` | Login (rate-limited) |
| GET | `/api/auth/me` | Current user profile |

### Resume, Analysis, ATS, Career, Roadmap, Projects
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/resume/upload` | Upload resume (PDF/DOCX) |
| GET | `/api/resume/my-resumes` | List your resumes |
| POST | `/api/resume/parse/:resumeId` | Extract text (ownership-checked) |
| DELETE | `/api/resume/:id` | Delete resume (ownership-checked) |
| POST | `/api/analysis/:resumeId` | AI resume analysis |
| POST | `/api/ats/:resumeId` | ATS compatibility score |
| GET | `/api/career/:resumeId` | Career advice |
| POST | `/api/career/match/:resumeId` | Match against a job description |
| POST | `/api/roadmap/:resumeId` | Generate a learning roadmap |
| POST | `/api/projects/:resumeId` | Project intelligence report |
| GET | `/api/report/:resumeId` | Download PDF report |

### Interview prep
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/interview/start` | Start a mock interview (HR/Technical/DSA) |
| GET | `/api/interview/my-interviews` | List your interviews |
| GET | `/api/interview/:interviewId` | Get one interview |
| POST | `/api/interview/:interviewId/answer` | Submit an answer for scoring |
| POST | `/api/interview/:interviewId/complete` | Finalize verdict & feedback |
| GET | `/api/company-prep/companies` | List companies ranked by interview-question volume |
| GET | `/api/company-prep/companies/:slug` | Company detail + question list |
| POST | `/api/company-prep/companies/:slug/progress` | Mark questions solved |
| GET | `/api/dsa/leetcode/:username` | Live LeetCode stats |
| GET | `/api/dsa/codeforces/:handle` | Live Codeforces stats |
| GET | `/api/progress/summary` | Overall progress summary |

### Career tooling
| Method | Endpoint | Description |
|---|---|---|
| GET/POST/PUT/DELETE | `/api/resume-builder` | CRUD for builder resumes |
| POST | `/api/resume-builder/import` | Seed a builder resume from a parsed upload |
| GET | `/api/portfolio/me` | Your portfolio |
| PUT | `/api/portfolio/me` | Update your portfolio |
| PATCH | `/api/portfolio/me/publish` | Publish/unpublish |
| POST | `/api/portfolio/import` | Import projects from a resume |
| GET | `/api/portfolio/public/:slug` | Public portfolio page (no auth) |
| GET/POST/PATCH/DELETE | `/api/applications` | Application/internship tracker CRUD + drag-move |

### Community & site
| Method | Endpoint | Description |
|---|---|---|
| GET/POST | `/api/community/posts` | List / create posts |
| DELETE | `/api/community/posts/:id` | Delete a post |
| POST | `/api/community/posts/:id/like` | Like/unlike a post |
| GET/POST | `/api/community/posts/:id/comments` | List / add comments |
| DELETE | `/api/community/comments/:commentId` | Delete a comment |
| POST | `/api/contact` | Submit the contact form (rate-limited) |
| GET | `/api/stats/public` | Public site stats |
| POST | `/api/stats/visit` | Record a visit |

All resume-, portfolio-, application-, and interview-scoped endpoints verify the resource belongs to the authenticated user before returning data.

---

## 🧠 AI Analysis — How It Works

```
Resume Upload (PDF/DOCX) → Cloudinary
         ↓
   Text Extraction (pdf-parse / mammoth)
         ↓
   Domain & Experience-Level Detection
         ↓
   Cloudflare Workers AI (Llama 3.1 70B)
         ↓
   ATS Score · Resume Score · Skills · Missing Skills
   Suggestions · Career Roadmap · Job Match Score · Mock-Interview Feedback
```

Supports Software, Electronics, Mechanical/Civil, Medical, Finance, Management, Marketing, Data Science, Legal, Education, and other professional domains.

---

## 🗄️ Database Schema (Prisma models)

| Model | Purpose |
|---|---|
| `User` | Account; relates to everything below |
| `OtpVerification` | Pending signup awaiting email verification (hashed OTP, expiry, attempt count) |
| `Resume` / `Analysis` | Uploaded resume + its AI analysis result |
| `MockInterview` | A mock interview session — rounds, per-question scoring, overall verdict |
| `CompanyPrepProgress` | Per-user, per-company set of solved interview questions |
| `Application` | A tracked job/internship application, with status history and Kanban position |
| `Portfolio` | A user's public portfolio (bio, skills, projects, social links, publish state) |
| `BuilderResume` | A resume built in the Resume Builder (template, company preset, structured sections) |
| `CommunityPost` / `CommunityComment` | Community wall posts, likes, and comments |
| `ContactMessage` | Submitted contact-form messages |
| `SiteStats` | Global visit counter |

See `backend/prisma/schema.prisma` for full field-level detail on every model.

---

## 🌐 Deployment

**Frontend (Vercel):** root directory `frontend`, env var `VITE_API_URL=<backend-url>`

**Backend (Render):** root directory `backend`, build `npm install`, start `npx prisma migrate deploy && npx prisma generate && node index.js`, all env vars from `.env.example` configured

---

## 🔑 Getting API Keys

| Service | Get Key | Free Tier |
|---|---|---|
| Neon DB | [neon.tech](https://neon.tech) | Yes |
| Cloudinary | [cloudinary.com](https://cloudinary.com) | 25GB |
| Cloudflare Workers AI | [dash.cloudflare.com](https://dash.cloudflare.com) | Yes |
| Brevo (transactional email) | [brevo.com](https://www.brevo.com) | Yes (300 emails/day) |
| GitHub Personal Access Token (optional) | [github.com/settings/tokens](https://github.com/settings/tokens) | Yes |

---

## 👨‍💻 Author

**Vikky Verma**
GitHub: [@Vikky-Verma](https://github.com/Vikky-Verma)

---

## 📄 License

MIT License — see [LICENSE](LICENSE).