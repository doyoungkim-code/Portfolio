import type { ReactNode } from 'react'

/* ─────────────────────────────────────────────────────────
   수작업 SVG 다이어그램 프리미티브 — 포트폴리오 다크 톤에 맞춘 도식
   좌표는 viewBox 단위(디자인 px). 색은 CSS(.dg-*)에서 관리.
   ───────────────────────────────────────────────────────── */

export function Diagram({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  return (
    <svg className="dg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMinYMin meet" role="img" aria-label="다이어그램">
      <defs>
        <marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="dg-arrowhead" />
        </marker>
        <marker id="dg-arrow-acc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="dg-arrowhead dg-arrowhead--acc" />
        </marker>
      </defs>
      {children}
    </svg>
  )
}

interface NodeProps {
  x: number
  y: number
  w: number
  h: number
  title: string
  sub?: string
  /** 본인 담당 영역 강조 */
  mine?: boolean
  /** 팀원 담당·외부 서비스 등 흐리게 */
  muted?: boolean
}

export function Node({ x, y, w, h, title, sub, mine, muted }: NodeProps) {
  const cx = x + w / 2
  const cy = y + h / 2
  return (
    <g className={`dg-node${mine ? ' dg-node--mine' : ''}${muted ? ' dg-node--muted' : ''}`}>
      <rect x={x} y={y} width={w} height={h} rx={3} />
      <text x={cx} y={sub ? cy - 7 : cy} textAnchor="middle" dominantBaseline="middle" className="dg-title">{title}</text>
      {sub && (
        <text x={cx} y={cy + 11} textAnchor="middle" dominantBaseline="middle" className="dg-sub">{sub}</text>
      )}
    </g>
  )
}

interface EdgeProps {
  /** 꺾은선 좌표 목록 */
  points: [number, number][]
  label?: string
  dashed?: boolean
  acc?: boolean
  noArrow?: boolean
  /** 라벨 위치 오프셋 */
  labelDx?: number
  labelDy?: number
}

export function Edge({ points, label, dashed, acc, noArrow, labelDx = 0, labelDy = -7 }: EdgeProps) {
  const d = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  /* 라벨: 가장 긴 구간의 중점 */
  let best = 0
  let bi = 0
  for (let i = 1; i < points.length; i++) {
    const len = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1])
    if (len > best) { best = len; bi = i }
  }
  const mx = (points[bi][0] + points[bi - 1][0]) / 2 + labelDx
  const my = (points[bi][1] + points[bi - 1][1]) / 2 + labelDy
  return (
    <g>
      <path
        d={d}
        className={`dg-edge${dashed ? ' dg-edge--dashed' : ''}${acc ? ' dg-edge--acc' : ''}`}
        markerEnd={noArrow ? undefined : `url(#${acc ? 'dg-arrow-acc' : 'dg-arrow'})`}
      />
      {label && (
        <text x={mx} y={my} textAnchor="middle" className="dg-label">{label}</text>
      )}
    </g>
  )
}

export function Group({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  return (
    <g className="dg-group">
      <rect x={x} y={y} width={w} height={h} rx={4} />
      <text x={x + 10} y={y + 15}>{label}</text>
    </g>
  )
}

/* ── 시퀀스 다이어그램 ── */

export interface SeqMessage {
  from: number
  to: number
  label: string
  dashed?: boolean
  acc?: boolean
  /** 자기 자신에게 (내부 처리) */
  self?: boolean
}

interface SeqProps {
  w: number
  actors: { name: string; mine?: boolean; muted?: boolean }[]
  messages: SeqMessage[]
  rowH?: number
}

export function Seq({ w, actors, messages, rowH = 42 }: SeqProps) {
  const n = actors.length
  const pad = 64
  const step = n > 1 ? (w - pad * 2) / (n - 1) : 0
  const xs = actors.map((_, i) => pad + i * step)
  const top = 60
  const h = top + messages.length * rowH + 24
  const actorW = Math.min(120, step - 12)

  return (
    <Diagram w={w} h={h}>
      {actors.map((a, i) => (
        <g key={a.name}>
          <line x1={xs[i]} y1={40} x2={xs[i]} y2={h - 8} className="dg-lifeline" />
          <Node x={xs[i] - actorW / 2} y={6} w={actorW} h={34} title={a.name} mine={a.mine} muted={a.muted} />
        </g>
      ))}
      {messages.map((m, i) => {
        const y = top + i * rowH + 14
        if (m.self || m.from === m.to) {
          const x = xs[m.from]
          return (
            <g key={i}>
              <path d={`M${x},${y - 8} L${x + 26},${y - 8} L${x + 26},${y + 8} L${x + 2},${y + 8}`}
                className={`dg-edge${m.acc ? ' dg-edge--acc' : ''}`} markerEnd={`url(#${m.acc ? 'dg-arrow-acc' : 'dg-arrow'})`} />
              <text x={x + 32} y={y + 3} className="dg-label" textAnchor="start">{m.label}</text>
            </g>
          )
        }
        const x1 = xs[m.from]
        const x2 = xs[m.to]
        const dir = x2 > x1 ? 1 : -1
        return (
          <g key={i}>
            <line x1={x1} y1={y} x2={x2 - dir * 4} y2={y}
              className={`dg-edge${m.dashed ? ' dg-edge--dashed' : ''}${m.acc ? ' dg-edge--acc' : ''}`}
              markerEnd={`url(#${m.acc ? 'dg-arrow-acc' : 'dg-arrow'})`} />
            <text x={(x1 + x2) / 2} y={y - 7} textAnchor="middle" className="dg-label">{m.label}</text>
          </g>
        )
      })}
    </Diagram>
  )
}
