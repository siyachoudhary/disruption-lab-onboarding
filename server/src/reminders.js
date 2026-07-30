import cron from "node-cron";
import nodemailer from "nodemailer";
import { User } from "./models/User.js";
import { isOnboardingComplete } from "./curriculumMeta.js";

// Build a mail transport only if SMTP is configured. Otherwise reminders are
// skipped gracefully so the app still runs in local/dev with no email set up.
function buildTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function sendReminders() {
  const transport = buildTransport();
  if (!transport) return; // email not configured — nothing to do

  const days = Number(process.env.REMINDER_AFTER_DAYS || 3);
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  // Off track = inactive since `cutoff`, not finished, and not reminded recently.
  const candidates = await User.find({
    lastActive: { $lt: cutoff },
    certificateIssuedAt: { $exists: false },
    $or: [{ remindedAt: { $exists: false } }, { remindedAt: { $lt: cutoff } }],
  });

  for (const user of candidates) {
    if (isOnboardingComplete(user.progress)) continue;
    try {
      await transport.sendMail({
        from: process.env.MAIL_FROM || "Disruption Lab <onboarding@disruptionlab.dev>",
        to: user.email,
        subject: "You're falling behind on Disruption Lab onboarding 👀",
        text:
          `Hi ${user.name},\n\n` +
          `You haven't made progress on your Disruption Lab onboarding in a few days. ` +
          `The whole program is only ~10-15 hours and is meant to be finished within one week.\n\n` +
          `Jump back in and keep the momentum going — you're closer than you think!\n\n` +
          `— The Disruption Lab team`,
      });
      user.remindedAt = new Date();
      await user.save();
      console.log(`Reminder sent to ${user.email}`);
    } catch (err) {
      console.error(`Failed to email ${user.email}:`, err.message);
    }
  }
}

export function startReminderJob() {
  // Every day at 09:00 server time.
  cron.schedule("0 9 * * *", () => {
    sendReminders().catch((e) => console.error("Reminder job error:", e));
  });
  console.log("✓ Daily reminder job scheduled (09:00)");
}
