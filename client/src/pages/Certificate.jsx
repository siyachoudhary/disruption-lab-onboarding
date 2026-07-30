import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { overallProgress, allComplete } from "../progress";
import { modules } from "../curriculum";
import Logo from "../components/Logo";
import { IS_DEMO } from "../api";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function Certificate() {
  const { user } = useAuth();
  // In the static demo build, the certificate is always unlocked so visitors
  // can preview it without completing every module. The real build stays gated.
  const done = allComplete(user) || IS_DEMO;
  const overall = overallProgress(user);

  if (!done) {
    return (
      <div className="container narrow">
        <div className="card center">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, opacity: 0.5 }}>
            <Logo size={52} />
          </div>
          <h1 style={{ marginTop: 8 }}>Certificate locked</h1>
          <p className="muted">
            Complete all {modules.length} modules — every lesson read and every quiz at 100% —
            to unlock your certificate. You're {overall.pct}% of the way there.
          </p>
          <Link to="/" className="btn">Back to modules</Link>
        </div>
      </div>
    );
  }

  const issued = user.certificateIssuedAt || Date.now();
  const certId = `DL-${String(user.id || "").slice(-6).toUpperCase()}-${new Date(issued).getFullYear()}`;

  return (
    <div className="container">
      <div className="row no-print" style={{ justifyContent: "space-between", marginBottom: 16 }}>
        <Link to="/" className="muted">← Dashboard</Link>
        <button className="btn" onClick={() => window.print()}>Print / Save as PDF</button>
      </div>

      <div className="certificate">
        <div className="certificate-watermark" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i}>
              Disruption Lab · powered by Gies · Disruption Lab · powered by Gies · Disruption Lab
            </span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <Logo size={64} />
        </div>
        <p className="kicker">Certificate of Completion</p>
        <h1>Disruption Lab · Developer Onboarding</h1>
        <p className="meta">This certifies that</p>
        <div className="recipient">{user.name}</div>
        <div className="rule" />
        <p className="body-text">
          has successfully completed the Disruption Lab onboarding program, demonstrating
          working knowledge of team practices &amp; expectations, Git &amp; GitHub, APIs, cloud
          infrastructure (AWS), databases &amp; secrets management, effective use of AI tools, and
          team-based, deployment-friendly software development.
        </p>
        <div className="row" style={{ justifyContent: "space-around", marginTop: 34, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontWeight: 700 }}>{formatDate(issued)}</div>
            <div className="meta">Date completed</div>
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{certId}</div>
            <div className="meta">Certificate ID</div>
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>Disruption Lab</div>
            <div className="meta">powered by Gies</div>
          </div>
        </div>
      </div>

      <p className="muted center no-print" style={{ marginTop: 18 }}>
        Use “Save as PDF” in the print dialog to keep a shareable copy.
      </p>
    </div>
  );
}
