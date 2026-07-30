import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProgressBar from "../components/ProgressBar";
import { modules, SUGGESTED_PLAN, TOTAL_ESTIMATE_HOURS, TOTAL_LESSONS } from "../curriculum";
import { moduleProgress, overallProgress, allComplete } from "../progress";

function fmtMins(m) {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  if (h && mm) return `${h} hr ${mm} min`;
  if (h) return `${h} hr`;
  return `${mm} min`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const overall = overallProgress(user);
  const done = allComplete(user);

  return (
    <div className="container">
      <h1 style={{ marginBottom: 4 }}>Welcome, {user.name.split(" ")[0]}</h1>
      <p className="muted" style={{ marginTop: 0 }}>
        Disruption Lab developer onboarding — {modules.length} modules · {TOTAL_LESSONS} lessons ·
        about {TOTAL_ESTIMATE_HOURS} total.
      </p>

      {/* Overall progress */}
      <div className="card" style={{ marginBottom: 22 }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
          <strong>Overall progress</strong>
          <span className="muted">{overall.pct}% · {overall.done}/{overall.totalSteps} steps</span>
        </div>
        <ProgressBar pct={overall.pct} />
        {done ? (
          <p style={{ marginBottom: 0, marginTop: 14 }}>
            You've completed everything.{" "}
            <Link to="/certificate"><strong>View your certificate →</strong></Link>
          </p>
        ) : (
          <p className="muted" style={{ marginBottom: 0, marginTop: 14 }}>
            Finish every lesson and score 100% on each quiz to unlock your certificate.
          </p>
        )}
      </div>

      {/* Suggested 1-week plan */}
      <div className="card" style={{ marginBottom: 22 }}>
        <h3 style={{ marginTop: 0 }}>Suggested one-week schedule</h3>
        <p className="muted" style={{ marginTop: 0 }}>
          This program is designed to be completed within <strong>one week</strong>. Pace yourself
          roughly like this — but go at whatever speed works for you.
        </p>
        <table className="lesson-body" style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {SUGGESTED_PLAN.map((row) => (
              <tr key={row.day}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap", fontWeight: 700 }}>
                  {row.day}
                </td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)" }}>
                  {row.focus}
                </td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap", color: "var(--text-dim)" }}>
                  {row.hours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modules */}
      <h2>Modules</h2>
      <div className="module-grid">
        {modules.map((mod, i) => {
          const mp = moduleProgress(user, mod);
          const started = mp.lessonsDone > 0 || mp.bestScore > 0;
          return (
            <Link to={`/module/${mod.id}`} key={mod.id} className="card module-card">
              <div className="module-badge">{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <h3>{mod.title}</h3>
                  {mp.complete ? (
                    <span className="pill done">Complete</span>
                  ) : started ? (
                    <span className="pill progress">In progress</span>
                  ) : (
                    <span className="pill todo">Not started</span>
                  )}
                </div>
                <p className="muted" style={{ margin: "2px 0 12px" }}>{mod.blurb}</p>
                <div className="meta-row">
                  <span>{mp.lessonsDone}/{mp.totalLessons} lessons</span>
                  <span>Quiz: {mp.quizPassed ? "passed" : `best ${mp.bestScore}%`}</span>
                  <span>~{fmtMins(mod.estMinutes)}</span>
                </div>
                <div style={{ marginTop: 12 }}>
                  <ProgressBar
                    pct={Math.round(((mp.lessonsDone + (mp.quizPassed ? 1 : 0)) / (mp.totalLessons + 1)) * 100)}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="footer-note">Disruption Lab · powered by Gies College of Business</p>
    </div>
  );
}
