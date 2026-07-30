// Demo backend: a drop-in replacement for the real API that runs entirely in
// the browser using localStorage. Used only for the static GitHub Pages build
// (VITE_DEMO=true), where there is no Express/MongoDB server. It mirrors the
// real server's behavior — including "quiz must be 100%" and auto-issuing the
// certificate once every module is complete.
import { modules } from "./curriculum";

const KEY = "dl_demo_user";
const load = () => {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
};
const save = (u) => localStorage.setItem(KEY, JSON.stringify(u));

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isComplete(progress) {
  return modules.every((m) => {
    const p = progress.find((x) => x.moduleId === m.id);
    return p && p.quizPassed && p.lessonsCompleted.length >= m.lessons.length;
  });
}

function maybeCert(u) {
  if (!u.certificateIssuedAt && isComplete(u.progress)) {
    u.certificateIssuedAt = new Date().toISOString();
  }
}

function getModule(u, moduleId) {
  let p = u.progress.find((x) => x.moduleId === moduleId);
  if (!p) {
    p = { moduleId, lessonsCompleted: [], quizPassed: false, quizBestScore: 0, quizAttempts: 0 };
    u.progress.push(p);
  }
  return p;
}

function requireUser() {
  const u = load();
  if (!u) throw new Error("Session expired. Please log in again.");
  return u;
}

export const demoApi = {
  async register({ name, email, password }) {
    name = (name || "").trim();
    email = (email || "").trim().toLowerCase();
    if (!name || !email || !password) throw new Error("Name, email and password are required.");
    if (!emailRe.test(email)) throw new Error("Please enter a valid email address.");
    if (password.length < 8) throw new Error("Password must be at least 8 characters.");
    const user = {
      id: "demo-" + Math.random().toString(36).slice(2, 8),
      name,
      email,
      theme: "light",
      progress: [],
      createdAt: new Date().toISOString(),
    };
    save(user);
    return { token: "demo-token", user };
  },

  async login({ email }) {
    const u = load();
    email = (email || "").trim().toLowerCase();
    if (!u || u.email !== email) {
      throw new Error("No demo account found. Use “Create an account” to start.");
    }
    return { token: "demo-token", user: u };
  },

  async me() {
    return { user: requireUser() };
  },

  async updateProfile({ name, theme }) {
    const u = requireUser();
    if (typeof name === "string" && name.trim()) u.name = name.trim();
    if (theme === "light" || theme === "dark") u.theme = theme;
    save(u);
    return { user: u };
  },

  async changePassword() {
    // No real passwords are stored in demo mode.
    return { ok: true };
  },

  async deleteAccount() {
    localStorage.removeItem(KEY);
    return { ok: true };
  },

  async completeLesson(moduleId, lessonId) {
    const u = requireUser();
    const p = getModule(u, moduleId);
    if (!p.lessonsCompleted.includes(lessonId)) p.lessonsCompleted.push(lessonId);
    maybeCert(u);
    save(u);
    return { user: u };
  },

  async submitQuiz(moduleId, score) {
    const u = requireUser();
    const pct = Math.max(0, Math.min(100, Number(score) || 0));
    // Quiz is locked until all lessons in the module are complete.
    const meta = modules.find((m) => m.id === moduleId);
    const existing = u.progress.find((p) => p.moduleId === moduleId);
    const doneLessons = existing ? existing.lessonsCompleted.length : 0;
    if (meta && doneLessons < meta.lessons.length) {
      throw new Error("Complete all lessons before taking the quiz.");
    }
    const p = getModule(u, moduleId);
    p.quizAttempts += 1;
    p.quizBestScore = Math.max(p.quizBestScore, pct);
    if (pct >= 100) {
      p.quizPassed = true;
      if (!p.completedAt) p.completedAt = new Date().toISOString();
    }
    maybeCert(u);
    save(u);
    return { user: u };
  },
};
