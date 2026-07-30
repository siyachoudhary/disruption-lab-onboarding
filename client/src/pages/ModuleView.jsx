import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import { moduleById, modules } from "../curriculum";
import { moduleProgress, isLessonDone } from "../progress";

export default function ModuleView() {
  const { id, lessonIndex } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const mod = moduleById[id];

  // The current lesson is driven by the URL so the sidebar (and any link) can
  // jump straight to a specific lesson.
  const rawIndex = parseInt(lessonIndex, 10);
  const index = Number.isInteger(rawIndex)
    ? Math.max(0, Math.min(rawIndex, (mod?.lessons.length || 1) - 1))
    : 0;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id, index]);

  if (!mod) {
    return (
      <div className="container">
        <p>Module not found. <Link to="/">Back to dashboard</Link></p>
      </div>
    );
  }

  const moduleNumber = modules.findIndex((m) => m.id === mod.id) + 1;
  const lesson = mod.lessons[index];
  const mp = moduleProgress(user, mod);
  const isLast = index === mod.lessons.length - 1;
  const allLessonsRead = mp.lessonsDone >= mod.lessons.length;

  const goToLesson = (i) => navigate(`/module/${mod.id}/lesson/${i}`);

  const markRead = async () => {
    if (isLessonDone(user, mod.id, lesson.id)) return true;
    try {
      const { user: updated } = await api.completeLesson(mod.id, lesson.id);
      refreshUser(updated);
      return true;
    } catch {
      return false;
    }
  };

  const onContinue = async () => {
    const ok = await markRead();
    if (!ok) return;
    if (!isLast) goToLesson(index + 1);
    else navigate(`/module/${mod.id}/quiz`);
  };

  return (
    <div className="container">
      <Link to="/" className="muted">← Dashboard</Link>
      <div className="row" style={{ gap: 14, margin: "12px 0 4px" }}>
        <div className="module-badge">{moduleNumber}</div>
        <h1 style={{ margin: 0 }}>{mod.title}</h1>
      </div>
      <p className="muted" style={{ marginTop: 0 }}>{mod.blurb}</p>

      {/* Lesson tabs */}
      <div className="row wrap" style={{ gap: 8, marginBottom: 20 }}>
        {mod.lessons.map((l, i) => {
          const readDone = isLessonDone(user, mod.id, l.id);
          return (
            <button
              key={l.id}
              className={`btn ${i === index ? "" : "subtle"}`}
              style={{ fontSize: 13 }}
              onClick={() => goToLesson(i)}
            >
              {readDone ? "✓ " : ""}{i + 1}. {l.title}
            </button>
          );
        })}
        <button
          className={`btn ${allLessonsRead ? "navy" : "subtle"}`}
          style={{ fontSize: 13 }}
          onClick={() => navigate(`/module/${mod.id}/quiz`)}
          disabled={!allLessonsRead}
          title={allLessonsRead ? "Take the quiz" : "Read all lessons first"}
        >
          {mp.quizPassed ? "✓ " : ""}Quiz{allLessonsRead ? "" : " (locked)"}
        </button>
      </div>

      {/* Lesson content */}
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2 style={{ margin: 0 }}>{lesson.title}</h2>
          <span className="muted" style={{ fontSize: 13 }}>~{lesson.minutes} min read</span>
        </div>
        <div className="divider" />
        <div className="lesson-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.body}</ReactMarkdown>
        </div>

        <div className="divider" />
        <div className="row" style={{ justifyContent: "space-between" }}>
          <button className="btn ghost" disabled={index === 0}
            onClick={() => goToLesson(index - 1)}>
            ← Previous
          </button>
          <button className="btn" onClick={onContinue}>
            {isLast ? "Finish & go to quiz →" : "Mark as read & continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
