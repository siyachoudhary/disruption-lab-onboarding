import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProgressBar from "./ProgressBar";
import { modules } from "../curriculum";
import { moduleProgress, overallProgress, allComplete, isLessonDone } from "../progress";

export default function Sidebar({ open = true, onNavigate = () => {} }) {
  const { user } = useAuth();
  const location = useLocation();
  const overall = overallProgress(user);
  const certReady = allComplete(user);

  // Which module is currently open (from the URL), so we can auto-expand it.
  const activeModuleId = location.pathname.startsWith("/module/")
    ? location.pathname.split("/")[2]
    : null;

  const [expanded, setExpanded] = useState(() =>
    activeModuleId ? { [activeModuleId]: true } : {}
  );

  // Auto-expand the module you're currently working in.
  useEffect(() => {
    if (activeModuleId) setExpanded((e) => ({ ...e, [activeModuleId]: true }));
  }, [activeModuleId]);

  const toggle = (idKey) =>
    setExpanded((e) => ({ ...e, [idKey]: !e[idKey] }));

  return (
    <aside className={"sidebar" + (open ? "" : " collapsed")}>
      {/* Overall progress */}
      <div className="sidebar-progress">
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 13 }}>Your progress</span>
          <span className="muted" style={{ fontSize: 13 }}>{overall.pct}%</span>
        </div>
        <ProgressBar pct={overall.pct} />
        <div className="muted" style={{ fontSize: 12, marginTop: 7 }}>
          {overall.done} of {overall.totalSteps} steps complete
        </div>
      </div>

      <NavLink to="/" end className="side-link" onClick={onNavigate}>
        <span className="side-link-label">Dashboard</span>
      </NavLink>

      <div className="side-heading">Modules</div>
      <nav className="side-modules">
        {modules.map((mod, i) => {
          const mp = moduleProgress(user, mod);
          const started = mp.lessonsDone > 0 || mp.bestScore > 0;
          const stepsDone = mp.lessonsDone + (mp.quizPassed ? 1 : 0);
          const stepsTotal = mp.totalLessons + 1;
          const pct = Math.round((stepsDone / stepsTotal) * 100);
          const isOpen = !!expanded[mod.id];
          return (
            <div key={mod.id} className="side-module-group">
              <div className={"side-module" + (activeModuleId === mod.id ? " active" : "")}>
                <button
                  className="side-caret"
                  onClick={() => toggle(mod.id)}
                  aria-label={isOpen ? "Collapse" : "Expand"}
                  aria-expanded={isOpen}
                >
                  <span className={"caret" + (isOpen ? " open" : "")}>▸</span>
                </button>
                <NavLink to={`/module/${mod.id}`} className="side-module-link" onClick={onNavigate}>
                  <span className={"side-num" + (mp.complete ? " done" : "")}>
                    {mp.complete ? "✓" : i + 1}
                  </span>
                  <span className="side-module-body">
                    <span className="side-module-title">{mod.title}</span>
                    <span className="side-module-meta">
                      {mp.complete
                        ? "Complete"
                        : started
                        ? `In progress · ${pct}%`
                        : "Not started"}
                    </span>
                    <span className="side-module-bar">
                      <span style={{ width: `${pct}%` }} />
                    </span>
                  </span>
                </NavLink>
              </div>

              {/* Expanded lesson + quiz jump links */}
              {isOpen && (
                <div className="side-lessons">
                  {mod.lessons.map((l, li) => {
                    const done = isLessonDone(user, mod.id, l.id);
                    return (
                      <NavLink
                        key={l.id}
                        to={`/module/${mod.id}/lesson/${li}`}
                        className={({ isActive }) => "side-lesson" + (isActive ? " active" : "")}
                        onClick={onNavigate}
                      >
                        <span className={"side-lesson-dot" + (done ? " done" : "")}>
                          {done ? "✓" : ""}
                        </span>
                        <span className="side-lesson-title">{l.title}</span>
                      </NavLink>
                    );
                  })}
                  <NavLink
                    to={`/module/${mod.id}/quiz`}
                    className={({ isActive }) => "side-lesson quiz" + (isActive ? " active" : "")}
                    onClick={onNavigate}
                  >
                    <span className={"side-lesson-dot" + (mp.quizPassed ? " done" : "")}>
                      {mp.quizPassed ? "✓" : ""}
                    </span>
                    <span className="side-lesson-title">
                      Quiz{mp.lessonsDone >= mp.totalLessons ? "" : " (locked)"}
                    </span>
                  </NavLink>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="side-heading">Finish</div>
      <NavLink to="/certificate" className="side-link" onClick={onNavigate}>
        <span className="side-link-label">Certificate</span>
        <span className={"side-tag " + (certReady ? "ready" : "locked")}>
          {certReady ? "Ready" : "Locked"}
        </span>
      </NavLink>
      <NavLink to="/settings" className="side-link" onClick={onNavigate}>
        <span className="side-link-label">Settings</span>
      </NavLink>
    </aside>
  );
}
