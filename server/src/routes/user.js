import { Router } from "express";
import bcrypt from "bcryptjs";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Update basic profile info from the dashboard: name + theme preference.
router.patch("/me", requireAuth, async (req, res) => {
  const { name, theme } = req.body || {};
  if (typeof name === "string" && name.trim()) req.user.name = name.trim();
  if (theme === "light" || theme === "dark") req.user.theme = theme;
  await req.user.save();
  res.json({ user: req.user.toPublicJSON() });
});

// Optional: change password.
router.patch("/me/password", requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!newPassword || newPassword.length < 8)
    return res.status(400).json({ error: "New password must be at least 8 characters." });

  const ok = await bcrypt.compare(currentPassword || "", req.user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Current password is incorrect." });

  req.user.passwordHash = await bcrypt.hash(newPassword, 12);
  await req.user.save();
  res.json({ ok: true });
});

// Let a student delete their own account.
router.delete("/me", requireAuth, async (req, res) => {
  await req.user.deleteOne();
  res.json({ ok: true });
});

export default router;
