// Helpers to read a user's progress against the curriculum.
import { modules } from "./curriculum";

export function moduleProgress(user, mod) {
  const p = user?.progress?.find((x) => x.moduleId === mod.id);
  const lessonsDone = p ? p.lessonsCompleted.length : 0;
  const totalLessons = mod.lessons.length;
  const quizPassed = !!p?.quizPassed;
  const bestScore = p?.quizBestScore || 0;
  // A module is fully complete when all lessons are read AND the quiz is 100%.
  const complete = lessonsDone >= totalLessons && quizPassed;
  return { lessonsDone, totalLessons, quizPassed, bestScore, complete, record: p };
}

export function isLessonDone(user, moduleId, lessonId) {
  const p = user?.progress?.find((x) => x.moduleId === moduleId);
  return !!p?.lessonsCompleted.includes(lessonId);
}

// Overall completion as a fraction 0..1, counting each lesson and each quiz.
export function overallProgress(user) {
  let totalSteps = 0;
  let done = 0;
  for (const mod of modules) {
    totalSteps += mod.lessons.length + 1; // lessons + one quiz
    const mp = moduleProgress(user, mod);
    done += mp.lessonsDone + (mp.quizPassed ? 1 : 0);
  }
  const pct = totalSteps === 0 ? 0 : Math.round((done / totalSteps) * 100);
  return { pct, done, totalSteps };
}

export function allComplete(user) {
  return modules.every((m) => moduleProgress(user, m).complete);
}
