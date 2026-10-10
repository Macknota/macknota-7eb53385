import type { ReactNode } from "react";

// Abstract, on-brand illustrations for each project. They hint at the domain
// (a document, ledger rows, a graph) without depicting any real interface.

const TEAL = "hsl(171 77% 64%)";
const LINE = "hsl(223 47% 97% / 0.16)";
const SOFT = "hsl(223 47% 97% / 0.32)";
const AMBER = "hsl(38 92% 62%)";
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: 1.5 };

const Check = ({ x, y, r = 9 }: { x: number; y: number; r?: number }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="hsl(171 77% 64% / 0.12)" stroke={TEAL} strokeWidth="1.2" />
    <path
      d={`M${x - r * 0.42} ${y} l${r * 0.3} ${r * 0.32} l${r * 0.55} -${r * 0.62}`}
      fill="none"
      stroke={TEAL}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
);

const EInvoicing = () => {
  const stages = ["CSR", "COMPLIANCE CSID", "6/6 CHECKS", "PRODUCTION CSID"];
  // Deterministic pseudo-QR so the pattern is stable between renders.
  const cells = Array.from({ length: 81 }, (_, i) => (i * 7 + ((i * i) % 5)) % 3 !== 0);
  return (
    <>
      <rect x="92" y="62" width="214" height="282" rx="10" fill="none" stroke={LINE} />
      <rect x="76" y="48" width="214" height="282" rx="10" fill="hsl(225 42% 10.5%)" stroke={SOFT} />
      <path d="M258 48 l32 32 h-24 a8 8 0 0 1 -8 -8 z" fill="hsl(225 50% 8%)" stroke={SOFT} />
      <circle cx="108" cy="88" r="12" fill="none" stroke={TEAL} strokeWidth="1.2" />
      <path d="M130 83 h78 M130 95 h52" stroke={SOFT} strokeLinecap="round" />
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <path d={`M96 ${134 + row * 22} h118`} stroke={row === 0 ? TEAL : LINE} strokeLinecap="round" />
          <path d={`M232 ${134 + row * 22} h38`} stroke={LINE} strokeLinecap="round" />
        </g>
      ))}
      <path d="M96 226 h174" stroke={LINE} strokeDasharray="2 4" />
      <g transform="translate(96 244)">
        {cells.map((on, i) =>
          on ? (
            <rect key={i} x={(i % 9) * 7} y={Math.floor(i / 9) * 7} width="5.4" height="5.4" rx="0.8" fill={TEAL} opacity={0.35 + ((i * 13) % 6) / 10} />
          ) : null,
        )}
      </g>
      <path d="M178 262 h60 M178 276 h40" stroke={SOFT} strokeLinecap="round" />
      <Check x={258} y={300} r={13} />

      <path d="M306 190 H372" stroke={TEAL} strokeDasharray="3 5" />
      <path d="M400 96 V304" stroke={LINE} />
      {stages.map((stage, i) => (
        <g key={stage}>
          <circle cx="400" cy={96 + i * 69.3} r="5" fill="hsl(225 50% 8%)" stroke={TEAL} strokeWidth="1.4" />
          <circle cx="400" cy={96 + i * 69.3} r="1.8" fill={TEAL} />
          <text x="420" y={100 + i * 69.3} fill="hsl(223 47% 97% / 0.72)" style={mono}>
            {stage}
          </text>
        </g>
      ))}
    </>
  );
};

const Reconciliation = () => {
  const columns = [
    { x: 70, label: "BANK" },
    { x: 262, label: "GATEWAY" },
    { x: 454, label: "MERCHANT" },
  ];
  const rows = [0, 1, 2, 3, 4, 5];
  const exception = 3;
  return (
    <>
      {columns.map((column) => (
        <g key={column.label}>
          <text x={column.x} y="62" fill={TEAL} style={mono}>
            {column.label}
          </text>
          <path d={`M${column.x} 74 h116`} stroke={LINE} />
        </g>
      ))}
      {rows.map((row) => {
        const y = 104 + row * 42;
        const isException = row === exception;
        return (
          <g key={row}>
            {columns.map((column, c) => {
              const missing = isException && c === 2;
              return (
                <g key={column.label}>
                  <rect
                    x={column.x}
                    y={y - 13}
                    width="116"
                    height="26"
                    rx="6"
                    fill={missing ? "none" : "hsl(223 47% 97% / 0.035)"}
                    stroke={missing ? AMBER : isException ? "hsl(38 92% 62% / 0.5)" : LINE}
                    strokeDasharray={missing ? "3 4" : undefined}
                  />
                  {!missing && (
                    <>
                      <path d={`M${column.x + 12} ${y} h${34 + ((row + c) % 3) * 10}`} stroke={SOFT} strokeLinecap="round" />
                      <path d={`M${column.x + 82} ${y} h22`} stroke={isException ? AMBER : SOFT} strokeLinecap="round" />
                    </>
                  )}
                </g>
              );
            })}
            {[186, 378].map((x, link) => {
              const broken = isException && link === 1;
              return (
                <g key={x}>
                  <path d={`M${x} ${y} h76`} stroke={broken ? AMBER : TEAL} strokeDasharray={broken ? "2 5" : undefined} opacity={broken ? 0.9 : 0.55} />
                  {!broken && <circle cx={x + 38} cy={y} r="3" fill={TEAL} />}
                  {broken && (
                    <path d={`M${x + 33} ${y - 5} l10 10 M${x + 43} ${y - 5} l-10 10`} stroke={AMBER} strokeWidth="1.4" strokeLinecap="round" />
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </>
  );
};

const Seo = () => {
  const points = [
    [84, 286],
    [150, 268],
    [216, 276],
    [282, 232],
    [348, 214],
    [414, 168],
    [480, 150],
    [556, 106],
  ];
  const path = points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const steps = ["REVIEW", "APPROVE", "APPLY"];
  return (
    <>
      <rect x="84" y="50" width="330" height="40" rx="20" fill="hsl(223 47% 97% / 0.035)" stroke={SOFT} />
      <circle cx="108" cy="69" r="7" fill="none" stroke={TEAL} strokeWidth="1.4" />
      <path d="M113 74 l6 6" stroke={TEAL} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M132 70 h150" stroke={SOFT} strokeLinecap="round" />
      <path d="M294 70 h2" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />

      {[130, 182, 234, 286].map((y) => (
        <path key={y} d={`M84 ${y} H556`} stroke={LINE} strokeDasharray="2 6" />
      ))}
      <path d={`${path} L556 304 L84 304 Z`} fill="hsl(171 77% 64% / 0.07)" />
      <path d={path} fill="none" stroke={TEAL} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 4.5 : 2.6} fill={i === points.length - 1 ? TEAL : "hsl(225 50% 8%)"} stroke={TEAL} strokeWidth="1.2" />
      ))}

      {steps.map((step, i) => (
        <g key={step} transform={`translate(${84 + i * 124} 326)`}>
          <rect width="96" height="28" rx="14" fill="none" stroke={i === 2 ? TEAL : SOFT} />
          <text x="48" y="18" textAnchor="middle" fill={i === 2 ? TEAL : "hsl(223 47% 97% / 0.7)"} style={mono}>
            {step}
          </text>
          {i < 2 && <path d="M102 14 h16 m-5 -4 l5 4 l-5 4" fill="none" stroke={SOFT} strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      ))}
    </>
  );
};

const StoreApi = () => {
  const methods = ["GET", "POST", "PUT", "DELETE"];
  return (
    <>
      {[0, 1, 2, 3].map((layer) => (
        <rect
          key={layer}
          x={70 + layer * 26}
          y={56 + layer * 26}
          width={250 - layer * 52}
          height={288 - layer * 52}
          rx={22 - layer * 3}
          fill={layer === 3 ? "hsl(171 77% 64% / 0.1)" : "none"}
          stroke={layer === 3 ? TEAL : SOFT}
          strokeDasharray={layer === 0 ? "3 5" : undefined}
          opacity={0.55 + layer * 0.15}
        />
      ))}
      <circle cx="195" cy="200" r="5" fill={TEAL} />
      <path d="M320 200 H372" stroke={TEAL} strokeDasharray="3 5" />
      {methods.map((method, i) => (
        <g key={method} transform={`translate(380 ${98 + i * 54})`}>
          <rect width="190" height="38" rx="9" fill="hsl(223 47% 97% / 0.035)" stroke={LINE} />
          <rect x="10" y="9" width="54" height="20" rx="5" fill="none" stroke={i === 0 ? TEAL : SOFT} />
          <text x="37" y="23" textAnchor="middle" fill={i === 0 ? TEAL : "hsl(223 47% 97% / 0.7)"} style={{ ...mono, fontSize: 9 }}>
            {method}
          </text>
          <path d={`M78 19 h${56 + ((i * 17) % 30)}`} stroke={SOFT} strokeLinecap="round" />
          <path d="M168 14 v10 M163 19 h10" stroke={LINE} strokeLinecap="round" opacity="0" />
        </g>
      ))}
    </>
  );
};

const Social = () => (
  <>
    {[
      { x: 96, y: 78, w: 210, side: "left" },
      { x: 300, y: 148, w: 244, side: "right" },
      { x: 96, y: 222, w: 168, side: "left" },
      { x: 348, y: 290, w: 196, side: "right" },
    ].map((bubble, i) => (
      <g key={i}>
        <rect
          x={bubble.x}
          y={bubble.y}
          width={bubble.w}
          height="46"
          rx="16"
          fill={bubble.side === "right" ? "hsl(171 77% 64% / 0.1)" : "hsl(223 47% 97% / 0.035)"}
          stroke={bubble.side === "right" ? TEAL : SOFT}
        />
        <path d={`M${bubble.x + 18} ${bubble.y + 18} h${bubble.w - 60}`} stroke={SOFT} strokeLinecap="round" />
        <path d={`M${bubble.x + 18} ${bubble.y + 30} h${bubble.w - 110}`} stroke={LINE} strokeLinecap="round" />
      </g>
    ))}
    {[
      { x: 66, y: 101 },
      { x: 66, y: 245 },
    ].map((avatar, i) => (
      <g key={i}>
        <circle cx={avatar.x} cy={avatar.y} r="15" fill="hsl(225 42% 10.5%)" stroke={SOFT} />
        <circle cx={avatar.x + 11} cy={avatar.y + 11} r="4.5" fill={TEAL} stroke="hsl(225 50% 8%)" strokeWidth="2" />
      </g>
    ))}
    {[0, 1, 2].map((dot) => (
      <circle key={dot} cx={110 + dot * 12} cy="320" r="3" fill={TEAL} opacity={0.35 + dot * 0.3} />
    ))}
  </>
);

const visuals: Record<string, () => ReactNode> = {
  einvoicing: EInvoicing,
  reconciliation: Reconciliation,
  seo: Seo,
  storeapi: StoreApi,
  social: Social,
};

const ProjectVisual = ({ kind, title }: { kind?: string; title: string }) => {
  const Visual = (kind && visuals[kind]) || EInvoicing;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="dot-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <svg viewBox="0 0 640 400" className="relative block h-auto w-full" role="img" aria-label={`Abstract illustration for ${title}`}>
        <Visual />
      </svg>
    </div>
  );
};

export default ProjectVisual;
