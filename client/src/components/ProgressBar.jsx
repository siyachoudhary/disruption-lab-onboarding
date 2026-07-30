export default function ProgressBar({ pct }) {
  return (
    <div className="progressbar" aria-label={`${pct}% complete`}>
      <div style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
    </div>
  );
}
