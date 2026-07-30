import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import { moduleById, modules } from "../curriculum";
import { moduleProgress } from "../progress";

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const mod = moduleById[id];

  const [answers, setAnswers] = useState({}); // qIndex -> optionIndex
  const [graded, setGraded] = useState(false);
  const [score, setScore] = useState(0);
  const [busy, setBusy] = useState(false);

  if (!mod) return <div className="container"><p>Module not found.</p></div>;

  // The quiz stays locked until every lesson in the module has been read.
  const mp = moduleProgress(user, mod);
  const lessonsLeft = mp.totalLessons - mp.lessonsDone;
  if (lessonsLeft > 0) {
    const firstUnread = mod.lessons.findIndex((l) => !mp.record?.lessonsCompleted.includes(l.id));
    const goTo = firstUnread === -1 ? 0 : firstUnread;
    return (
      <div className="container narrow">
        <div className="card center">
          <h1 style={{ marginTop: 0 }}>Quiz locked</h1>
          <p className="muted">
            Finish all {mp.totalLessons} lessons in “{mod.title}” before taking the quiz —
            you have {lessonsLeft} lesson{lessonsLeft === 1 ? "" : "s"} left to read.
          </p>
          <button className="btn" onClick={() => navigate(`/module/${mod.id}/lesson/${goTo}`)}>
            Continue the lessons →
          </button>
        </div>
      </div>
    );
  }

  const questions = mod.quiz;
  const passed = graded && score === 100;

  const choose = (qi, oi) => {
    if (graded) return;
    setAnswers((a) => ({ ...a, [qi]: oi }));
  };

  const submit = async () => {
    let correct = 0;
    questions.forEach((q, qi) => {
      if (answers[qi] === q.answer) correct++;
    });
    const pct = Math.round((correct / questions.length) * 100);
    setScore(pct);
    setGraded(true);
    setBusy(true);
    try {
      const { user: updated } = await api.submitQuiz(mod.id, pct);
      refreshUser(updated);
    } catch {
      /* score still shown locally */
    } finally {
      setBusy(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retake = () => {
    setAnswers({});
    setGraded(false);
    setScore(0);
    window.scrollTo({ top: 0 });
  };

  const allAnswered = questions.every((_, qi) => answers[qi] !== undefined);

  // Find the next module for a handy "next" button.
  const idx = modules.findIndex((m) => m.id === mod.id);
  const next = modules[idx + 1];

  return (
    <div className="container">
      <Link to={`/module/${mod.id}`} className="muted">← Back to {mod.title}</Link>
      <h1>{mod.title} — Quiz</h1>
      <p className="muted" style={{ marginTop: -6 }}>
        You must score <strong>100%</strong> to complete this module. You can retake it as many
        times as you need.
      </p>

      {graded && (
        <div className="card" style={{
          marginBottom: 20,
          borderColor: passed ? "var(--success)" : "var(--danger)",
        }}>
          <h2 style={{ margin: 0 }}>
            {passed ? "Perfect score" : `You scored ${score}%`}
          </h2>
          {passed ? (
            <p style={{ marginBottom: 0 }}>
              Module complete. {next
                ? <>Ready for the next one?</>
                : <>That was the last module — <Link to="/certificate"><strong>check your certificate!</strong></Link></>}
            </p>
          ) : (
            <p style={{ marginBottom: 0 }}>
              Not quite — review the highlighted answers below, then try again until you hit 100%.
            </p>
          )}
        </div>
      )}

      {questions.map((q, qi) => (
        <div className="card" key={qi} style={{ marginBottom: 16 }}>
          <strong>{qi + 1}. {q.q}</strong>
          <div style={{ marginTop: 12 }}>
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              let cls = "quiz-option";
              if (graded) {
                if (oi === q.answer) cls += " correct";
                else if (selected) cls += " wrong";
              } else if (selected) cls += " selected";
              return (
                <button key={oi} className={cls} onClick={() => choose(qi, oi)}>
                  {opt}
                  {graded && oi === q.answer && "  ✓"}
                  {graded && selected && oi !== q.answer && "  ✗"}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="row" style={{ gap: 12 }}>
        {!graded && (
          <button className="btn" onClick={submit} disabled={!allAnswered || busy}>
            {allAnswered ? "Submit answers" : "Answer all questions to submit"}
          </button>
        )}
        {graded && !passed && (
          <button className="btn" onClick={retake}>Retake quiz</button>
        )}
        {passed && next && (
          <button className="btn navy" onClick={() => navigate(`/module/${next.id}`)}>
            Next module: {next.title} →
          </button>
        )}
        {passed && (
          <Link to="/" className="btn ghost">Back to dashboard</Link>
        )}
      </div>
    </div>
  );
}
