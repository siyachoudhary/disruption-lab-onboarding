// The University of Illinois "Block I" mark, drawn as an SVG so it scales
// crisply and can be recolored. Rendered inside a rounded navy tile by default.

export function BlockI({ size = 28, color = "#FF5F05" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <polygon
        fill={color}
        points="12,14 108,14 108,42 74,42 74,78 108,78 108,106 12,106 12,78 46,78 46,42 12,42"
      />
    </svg>
  );
}

export default function Logo({ size = 40, tile = true }) {
  if (!tile) return <BlockI size={size} />;
  const pad = Math.round(size * 0.18);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        background: "#13294B",
        borderRadius: Math.round(size * 0.22),
        padding: pad,
        boxSizing: "border-box",
      }}
    >
      <BlockI size={size - pad * 2} color="#FF5F05" />
    </span>
  );
}
