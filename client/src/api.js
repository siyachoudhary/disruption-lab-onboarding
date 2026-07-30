// Tiny fetch wrapper. Stores the JWT in localStorage and attaches it to every
// request. In dev, Vite proxies /api to the Express server (see vite.config.js).
//
// When built with VITE_DEMO=true (the static GitHub Pages build), all calls are
// served by an in-browser localStorage mock instead — see demoApi.js.
import { demoApi } from "./demoApi";

const DEMO = import.meta.env.VITE_DEMO === "true";

const TOKEN_KEY = "dl_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

const realApi = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  me: () => request("/auth/me"),

  updateProfile: (payload) => request("/user/me", { method: "PATCH", body: payload }),
  changePassword: (payload) => request("/user/me/password", { method: "PATCH", body: payload }),
  deleteAccount: () => request("/user/me", { method: "DELETE" }),

  completeLesson: (moduleId, lessonId) =>
    request("/progress/lesson", { method: "POST", body: { moduleId, lessonId } }),
  submitQuiz: (moduleId, score) =>
    request("/progress/quiz", { method: "POST", body: { moduleId, score } }),
};

export const api = DEMO ? demoApi : realApi;
export const IS_DEMO = DEMO;
