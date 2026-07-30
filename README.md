# Disruption Lab — Developer Onboarding

A self-paced, module-based onboarding app that takes a new student with **no software
engineering experience** and gives them the general skills to contribute to a real team
project end-to-end (fullstack, AI, or otherwise). Students read short lessons, pass a
100%-required quiz per module, and earn a printable **certificate** with their name on it.

Designed to be completed in **~10–15 hours over one week**.

---

## What's inside

**8 modules · 25 lessons · a quiz per module**

| # | Module | ~Time |
|---|--------|------|
| 1 | Welcome & Team Expectations (standup, dev night, client calls, PM/TL roles) | 40 min |
| 2 | Dev Environment & the Command Line | 1 hr |
| 3 | Git & GitHub (push/pull/clone/branches/PRs/forking) | 3 hrs |
| 4 | APIs & How the Web Talks | 2 hrs |
| 5 | Cloud & AWS (EC2, S3, and when to use each) | 2.5 hrs |
| 6 | Data, Databases & Secrets | 1.5 hrs |
| 7 | Using AI Tools Effectively | 1.5 hrs |
| 8 | Working in a Team & Shipping | 2 hrs |

The in-app **Dashboard** shows a suggested day-by-day one-week schedule and live progress.

### Curriculum — modules & topics

Every module ends with a quiz that must be passed at **100%**, and each quiz stays **locked
until all of that module's lessons are completed**.

**1. Welcome & Team Expectations** · ~40 min — how a DLab team actually runs, before any code.
- The weekly rhythm: standup, dev night (2 hrs/week), and client calls — what they are and look like
- Attendance & communication expectations (incl. the 3-unexcused-strikes policy)
- Who's who: PMs, TLs, the Engineering Manager & Head of Tech — and how they help you advance

**2. Dev Environment & the Command Line** · ~1 hr
- How software actually gets built (editor, terminal, Git, runtime)
- Terminal survival kit (core commands, reading a command)
- Packages, projects & running code (npm, `package.json`, scripts)

**3. Git & GitHub** · ~3 hrs
- Why Git exists & the core loop (add / commit / push / pull)
- Branches: working without fear
- Pull Requests & code review
- Forks, remotes & fixing mistakes

**4. APIs & How the Web Talks** · ~2 hrs
- What an API actually is (client/server, requests/responses)
- HTTP methods, status codes & JSON
- Calling an API & keeping keys safe

**5. Cloud & AWS** · ~2.5 hrs
- What "the cloud" really is
- EC2 — rented computers (instance types, when to use it)
- S3 & the wider AWS toolbox (EC2 vs S3, Lambda, RDS, IAM…)

**6. Data, Databases & Secrets** · ~1.5 hrs
- Databases: SQL vs NoSQL
- CRUD & thinking in data
- Environment variables & secrets

**7. Using AI Tools Effectively** · ~1.5 hrs
- What AI coding tools are good (and bad) at
- Prompting well
- Responsible & safe AI use

**8. Working in a Team & Shipping** · ~2 hrs
- How teams organize work (Agile basics)
- Communication & collaboration
- Shipping: from laptop to production (environments, deployment, CI/CD)

### Features
- Email/password accounts (JWT auth, bcrypt-hashed passwords).
- Readable, paginated lessons (Markdown) with per-lesson time estimates.
- Module quizzes that **must be retaken until 100%**.
- Progress saved server-side; certificate auto-unlocks when everything is complete.
- Dashboard/**Settings** to edit name, switch **dark/light mode**, change password, delete account.
- **Auto-delete** of accounts after 6 months of inactivity (MongoDB TTL index).
- Optional **email reminders** to students who fall behind (daily cron).
- Printable / save-as-PDF certificate with the student's name, date, and an ID.

---

## Tech stack
- **Frontend:** React + Vite + React Router (`/client`)
- **Backend:** Node/Express + Mongoose (`/server`)
- **Database:** MongoDB

---

## Getting it running (local)

### Prerequisites
- Node.js 18+ and npm
- A MongoDB database — either local (`mongod`) or a free **MongoDB Atlas** cluster.

### 1. Backend
```bash
cd server
cp .env.example .env          # then edit .env
#   - set MONGODB_URI (local: mongodb://127.0.0.1:27017/disruption_lab)
#   - set JWT_SECRET to any long random string
npm install
npm run dev                   # API on http://localhost:4000
```

### 2. Frontend
```bash
cd client
npm install
npm run dev                   # app on http://localhost:5173
```

Open **http://localhost:5173**, register an account, and start Module 1.
(The Vite dev server proxies `/api` to the backend automatically.)

---

## Configuration notes

- **Auto-delete inactivity window** — `INACTIVITY_DAYS` in `server/.env` (default `180` ≈ 6 months).
  Implemented as a MongoDB TTL index on `lastActive`, which is refreshed on every authenticated request.
- **Email reminders** — fill the `SMTP_*` vars in `server/.env` to enable. If they're blank,
  reminders are skipped silently so the app still runs. Students who are inactive for
  `REMINDER_AFTER_DAYS` (default 3) without finishing get a nudge email.
- **Stored per user:** name, email, bcrypt password hash, theme, progress, timestamps. Nothing more.

---

## Deploying (deployment-friendly by design)
- **Frontend:** `cd client && npm run build` → deploy the `dist/` folder to Vercel/Netlify/S3.
- **Backend:** deploy `/server` to Render/Railway/Fly.io or an EC2 instance; set the same env vars.
- **Database:** MongoDB Atlas.
- Point the frontend at the deployed API (set `CLIENT_ORIGIN` on the server for CORS, and
  serve the built client behind the same domain or configure the API base URL).

---

## Extending the curriculum
All lesson + quiz content lives in **`client/src/curriculum/index.js`** as plain data —
add lessons or modules there. If you add/remove a **module** or change a module's lesson
count, mirror it in **`server/src/curriculumMeta.js`** so certificate completion stays correct.

### Ideas for future modules
Testing & debugging · Docker & containers · CI/CD deep-dive · Web security basics ·
System design 101 · Accessibility · Writing good documentation.
