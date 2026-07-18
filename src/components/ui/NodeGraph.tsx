import { useId, useMemo } from "react";

type Node = { id: string; label: string; col: number; row: number };
type Edge = [string, string];

type NodeGraphProps = {
  nodes: readonly Node[];
  edges: Edge[];
  accent?: "blue" | "purple" | "cyan";
  highlightIds?: string[];
};

const COL_W = 148;
const ROW_H = 92;
const PAD_X = 70;
const PAD_Y = 50;

export default function NodeGraph({ nodes, edges, accent = "blue", highlightIds = [] }: NodeGraphProps) {
  const uid = useId().replace(/:/g, "");
  const positions = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};
    nodes.forEach((n) => {
      map[n.id] = { x: n.col * COL_W, y: n.row * ROW_H };
    });
    return map;
  }, [nodes]);

  const maxCol = Math.max(...nodes.map((n) => n.col));
  const minRow = Math.min(...nodes.map((n) => n.row));
  const maxRow = Math.max(...nodes.map((n) => n.row));

  const minX = -PAD_X;
  const minY = minRow * ROW_H - PAD_Y;
  const width = maxCol * COL_W + PAD_X * 2;
  const viewHeight = (maxRow - minRow) * ROW_H + PAD_Y * 2;

  const accentColor = `var(--color-${accent})`;

  return (
    <svg
      viewBox={`${minX} ${minY} ${width} ${viewHeight}`}
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Animated automation workflow diagram"
    >
      <defs>
        <filter id={`glow-${uid}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`edge-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-blue)" />
          <stop offset="50%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-cyan)" />
        </linearGradient>
      </defs>

      {edges.map(([from, to], i) => {
        const a = positions[from];
        const b = positions[to];
        if (!a || !b) return null;
        const midX = (a.x + b.x) / 2;
        const pathId = `path-${uid}-${i}`;
        const d = `M ${a.x + 34} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x - 34} ${b.y}`;
        return (
          <g key={pathId}>
            <path
              id={pathId}
              d={d}
              fill="none"
              stroke={`url(#edge-${uid})`}
              strokeWidth={1.4}
              strokeOpacity={0.35}
            />
            <path
              d={d}
              fill="none"
              stroke={accentColor}
              strokeWidth={1.4}
              strokeDasharray="6 10"
              strokeOpacity={0.7}
              className="animate-dash"
            />
            <circle r="3" fill="var(--color-cyan)" filter={`url(#glow-${uid})`}>
              <animateMotion
                dur={`${3.5 + (i % 4) * 0.6}s`}
                repeatCount="indefinite"
                begin={`${(i % 5) * 0.4}s`}
              >
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </circle>
          </g>
        );
      })}

      {nodes.map((node) => {
        const pos = positions[node.id];
        const isHighlighted = highlightIds.includes(node.id);
        return (
          <g
            key={node.id}
            data-node-id={node.id}
            transform={`translate(${pos.x}, ${pos.y})`}
            className="cursor-default"
          >
            <rect
              x={-52}
              y={-22}
              width={104}
              height={44}
              rx={12}
              fill="var(--color-card)"
              stroke={isHighlighted ? accentColor : "var(--color-line)"}
              strokeWidth={isHighlighted ? 1.6 : 1}
              filter={isHighlighted ? `url(#glow-${uid})` : undefined}
            />
            <text
              x={0}
              y={5}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill="var(--color-ink)"
              letterSpacing="0.02em"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
