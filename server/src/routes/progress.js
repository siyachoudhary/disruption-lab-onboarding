import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { MODULE_IDS, MODULES, isOnboardingComplete } from "../curriculumMeta.js";

const router = Router();

function getOrCreateModule(user, moduleId) {
  let mod = user.progress.find((p) => p.moduleId === moduleId);
  if (!mod) {
    mod = { moduleId, lessonsCompleted: [], quizPassed: false, quizBestScore: 0, quizAttempts: 0 };
    user.progress.push(mod);
    mod = user.progress[user.progress.length - 1];
  }
  return mod;
}

// Mark a lesson as read.
router.post("/lesson", requireAuth, async (req, res) => {
  const { moduleId, lessonId } = req.body || {};
  if (!MODULE_IDS.has(moduleId)) return res.status(400).json({ error: "Unknown module." });
  if (!lessonId) return res.status(400).json({ error: "lessonId required." });

  const mod = getOrCreateModule(req.user, moduleId);
  if (!mod.lessonsCompleted.includes(lessonId)) mod.lessonsCompleted.push(lessonId);

  maybeIssueCertificate(req.user);
  await req.user.save();
  res.json({ user: req.user.toPublicJSON() });
});

// Submit a quiz score. Only a perfect 100% flips quizPassed to true.
router.post("/quiz", requireAuth, async (req, res) => {
  const { moduleId, score } = req.body || {};
  if (!MODULE_IDS.has(moduleId)) return res.status(400).json({ error: "Unknown module." });
  const pct = Math.max(0, Math.min(100, Number(score) || 0));

  // The quiz is locked until every lesson in the module has been completed.
  const meta = MODULES.find((m) => m.id === moduleId);
  const existing = req.user.progress.find((p) => p.moduleId === moduleId);
  const doneLessons = existing ? existing.lessonsCompleted.length : 0;
  if (meta && doneLessons < meta.lessonCount) {
    return res.status(400).json({ error: "Complete all lessons before taking the quiz." });
  }

  const mod = getOrCreateModule(req.user, moduleId);
  mod.quizAttempts += 1;
  mod.quizBestScore = Math.max(mod.quizBestScore, pct);
  if (pct >= 100) {
    mod.quizPassed = true;
    if (!mod.completedAt) mod.completedAt = new Date();
  }

  maybeIssueCertificate(req.user);
  await req.user.save();
  res.json({ user: req.user.toPublicJSON() });
});

function maybeIssueCertificate(user) {
  if (!user.certificateIssuedAt && isOnboardingComplete(user.progress)) {
    user.certificateIssuedAt = new Date();
  }
}

export default router;
