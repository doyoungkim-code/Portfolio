import type { ReactNode } from 'react'
import { IsoBox } from './iso'
import type { IsoBoxSpec } from './iso'

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
        {/* 아이소메트릭 상자 면 조명 (위가 밝고 아래로 갈수록 어둡게) */}
        <linearGradient id="dg-g-top-mine" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6C88F6" /><stop offset="1" stopColor="#3A56CF" /></linearGradient>
        <linearGradient id="dg-g-left-mine" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3549BC" /><stop offset="1" stopColor="#1F2D86" /></linearGradient>
        <linearGradient id="dg-g-right-mine" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#24369A" /><stop offset="1" stopColor="#131D5C" /></linearGradient>
        <linearGradient id="dg-g-top-pur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9A8FF0" /><stop offset="1" stopColor="#5F53C9" /></linearGradient>
        <linearGradient id="dg-g-left-pur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5B4EBB" /><stop offset="1" stopColor="#3B328D" /></linearGradient>
        <linearGradient id="dg-g-right-pur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#493BA0" /><stop offset="1" stopColor="#282063" /></linearGradient>
        <linearGradient id="dg-g-top-muted" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#333A5A" /><stop offset="1" stopColor="#20253C" /></linearGradient>
        <linearGradient id="dg-g-left-muted" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1E2338" /><stop offset="1" stopColor="#131626" /></linearGradient>
        <linearGradient id="dg-g-right-muted" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#181C30" /><stop offset="1" stopColor="#0F1220" /></linearGradient>
        <linearGradient id="dg-g-plate" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="rgba(255,255,255,.07)" /><stop offset="1" stopColor="rgba(255,255,255,.02)" /></linearGradient>
        <filter id="dg-blur" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="dg-blur-lg" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="9" /></filter>
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

export interface SeqActor {
  name: string
  mine?: boolean
  muted?: boolean
  icon?: IsoBoxSpec['icon']
  iconColor?: string
}

interface SeqProps {
  w: number
  actors: SeqActor[]
  messages: SeqMessage[]
  rowH?: number
}

/**
 * 시퀀스 — 액터는 아이소메트릭 상자(3D)로 세우고, 메시지 화살표는 읽히도록 평면 수평선 유지.
 * (아이소 평면 위에 시간축을 눕히면 행 간격이 17px로 겹쳐 라벨을 읽을 수 없다)
 */
export function Seq({ w, actors, messages, rowH = 42 }: SeqProps) {
  const n = actors.length
  const pad = 70
  const step = n > 1 ? (w - pad * 2) / (n - 1) : 0
  const xs = actors.map((_, i) => pad + i * step)
  const top = 118
  const h = top + messages.length * rowH + 24
  const actCls = (i: number) => `dg-act${actors[i].mine ? ' dg-act--mine' : ''}`

  return (
    <Diagram w={w} h={h}>
      {/* 본인 담당 액터 열은 은은한 세로 밴드로 */}
      {actors.map((a, i) => a.mine && (
        <rect key={`band${i}`} className="dg-seqcol" x={xs[i] - 34} y={96} width={68} height={h - 104} rx={6} />
      ))}
      {actors.map((a, i) => (
        <g key={a.name}>
          <line x1={xs[i]} y1={92} x2={xs[i]} y2={h - 8} className={`dg-lifeline${a.mine ? ' dg-lifeline--mine' : ''}`} />
          {/* 상자 밑면 중심이 (xs, 46)에 오도록: iso(23, 17, 0) = (5.2, 20) */}
          <g transform={`translate(${xs[i] - 5.2} 26)`}>
            <IsoBox x={0} y={0} w={46} d={34} h={24} title={a.name} icon={a.icon} iconColor={a.iconColor} mine={a.mine} muted={a.muted} label="below" order={i} />
          </g>
        </g>
      ))}
      {messages.map((m, i) => {
        const y = top + i * rowH + 14
        const no = String(i + 1).padStart(2, '0')
        const isSelf = m.self || m.from === m.to
        const x1 = xs[m.from]
        const x2 = xs[m.to]
        const dir = x2 > x1 ? 1 : -1
        return (
          <g key={i} className="dg-seqrow" style={{ animationDelay: `${300 + i * 45}ms` }}>
            <rect className="dg-seqrow__band" x={pad - 40} y={y - rowH / 2} width={w - pad * 2 + 80} height={rowH} rx={4} />
            <text className="dg-seqrow__no" x={22} y={y + 4} textAnchor="middle">{no}</text>
            {/* 활성 바 — 메시지를 받는 쪽 라이프라인 */}
            <rect className={actCls(m.to)} x={xs[m.to] - 3} y={y - 10} width={6} height={20} rx={2} />
            {isSelf ? (
              <>
                <path d={`M${x1},${y - 8} L${x1 + 26},${y - 8} L${x1 + 26},${y + 8} L${x1 + 2},${y + 8}`}
                  className={`dg-edge${m.acc ? ' dg-edge--acc' : ''}`} markerEnd={`url(#${m.acc ? 'dg-arrow-acc' : 'dg-arrow'})`} />
                <text x={x1 + 32} y={y + 3} className="dg-label" textAnchor="start">{m.label}</text>
              </>
            ) : (
              <>
                <line x1={x1} y1={y} x2={x2 - dir * 4} y2={y}
                  className={`dg-edge${m.dashed ? ' dg-edge--dashed' : ''}${m.acc ? ' dg-edge--acc' : ''}`}
                  markerEnd={`url(#${m.acc ? 'dg-arrow-acc' : 'dg-arrow'})`} />
                <text x={(x1 + x2) / 2} y={y - 7} textAnchor="middle" className="dg-label">{m.label}</text>
              </>
            )}
          </g>
        )
      })}
    </Diagram>
  )
}
