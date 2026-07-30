// Authoritative list of modules used to decide when a student has *fully*
// completed onboarding (and therefore earns a certificate). The rich lesson
// content and quiz questions live on the client; the server only needs to know
// how many lessons each module has and that its quiz was passed at 100%.
//
// IMPORTANT: keep these ids + lessonCounts in sync with
// client/src/curriculum/index.js
export const MODULES = [
  { id: "foundations", lessonCount: 3 },
  { id: "git", lessonCount: 4 },
  { id: "apis", lessonCount: 3 },
  { id: "cloud", lessonCount: 3 },
  { id: "data", lessonCount: 3 },
  { id: "ai-tools", lessonCount: 3 },
  { id: "teamwork", lessonCount: 3 },
];

export const MODULE_IDS = new Set(MODULES.map((m) => m.id));

// A student is done when every module has its quiz passed and all lessons read.
export function isOnboardingComplete(progress) {
  return MODULES.every((m) => {
    const p = progress.find((x) => x.moduleId === m.id);
    return p && p.quizPassed && p.lessonsCompleted.length >= m.lessonCount;
  });
}
