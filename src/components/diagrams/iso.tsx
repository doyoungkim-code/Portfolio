import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import { TECH } from '../TechIcon'
import type { TechKey } from '../TechIcon'

/* ─────────────────────────────────────────────────────────
   아이소메트릭(2.5D) 다이어그램 프리미티브 — Cloudcraft 풍
   월드 좌표(x, y, z) → 화면: sx = (x − y)·cos30, sy = (x + y)·sin30 − z
   (x가 커지면 오른쪽 아래, y가 커지면 왼쪽 아래, z는 위)
   색·그라디언트는 CSS(.iso-*)와 Diagram <defs>에서 관리.
   본인 담당 = mine(파랑/퍼플), 팀원·외부 = muted.
   ───────────────────────────────────────────────────────── */

const CX = 0.866
const SY = 0.5

export function iso(x: number, y: number, z = 0): [number, number] {
  return [(x - y) * CX, (x + y) * SY - z]
}

const pt = (p: [number, number]) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`

export interface IsoBoxSpec {
  id?: string
  x: number
  y: number
  w: number
  d: number
  h: number
  title: string
  sub?: string
  /** 호버 시 하단 캡션에 보여줄 한 줄 설명 (없으면 title — sub) */
  detail?: string
  /** 흐름 순서 번호 배지 */
  step?: number
  /** TechIcon 키 또는 react-icons 컴포넌트 */
  icon?: TechKey | IconType
  iconColor?: string
  mine?: boolean
  muted?: boolean
  /** 라벨 위치 — 주변에 비어 있는 쪽으로 (기본 below) */
  label?: 'above' | 'below' | 'left' | 'right'
}

export interface IsoPlateSpec {
  x: number
  y: number
  w: number
  d: number
  /** 두께 */
  t?: number
  label: string
  /** 바닥 그리드 간격 (0이면 없음) */
  grid?: number
}

export interface IsoPathSpec {
  /** 바닥 위 월드 좌표 꺾은선 (z는 장면의 바닥판 두께) */
  pts: [number, number][]
  z?: number
  /** 연결된 상자 id — 호버 포커스에 사용 */
  from?: string
  to?: string
  label?: string
  /** 라벨을 붙일 구간 인덱스 (기본: 가장 긴 구간) */
  seg?: number
  labelDx?: number
  labelDy?: number
  dashed?: boolean
  acc?: boolean
  /** 흐르는 패킷 애니메이션 */
  flow?: boolean
  noArrow?: boolean
}

function Icon({ icon, color, cx, cy, size }: { icon: TechKey | IconType; color?: string; cx: number; cy: number; size: number }) {
  if (typeof icon === 'string') {
    const def = TECH[icon]
    if (def.mono) {
      const M = def.mono.Icon
      return <M size={size} color={color ?? def.mono.color} x={cx - size / 2} y={cy - size / 2} />
    }
    return <image href={def.src} x={cx - size / 2} y={cy - size / 2} width={size} height={size} />
  }
  const I = icon
  return <I size={size} color={color ?? '#F2F4FA'} x={cx - size / 2} y={cy - size / 2} />
}

export function IsoPlate({ x, y, w, d, t = 10, label, grid = 40 }: IsoPlateSpec) {
  const A = iso(x, y, t), B = iso(x + w, y, t), C = iso(x + w, y + d, t), D = iso(x, y + d, t)
  const C0 = iso(x + w, y + d, 0), D0 = iso(x, y + d, 0), B0 = iso(x + w, y, 0)
  const lines: string[] = []
  if (grid > 0) {
    for (let gx = x + grid; gx < x + w; gx += grid) lines.push(`M${pt(iso(gx, y, t))} L${pt(iso(gx, y + d, t))}`)
    for (let gy = y + grid; gy < y + d; gy += grid) lines.push(`M${pt(iso(x, gy, t))} L${pt(iso(x + w, gy, t))}`)
  }
  return (
    <g className="iso-plate">
      <polygon className="iso-plate__left" points={`${pt(D)} ${pt(C)} ${pt(C0)} ${pt(D0)}`} />
      <polygon className="iso-plate__right" points={`${pt(B)} ${pt(C)} ${pt(C0)} ${pt(B0)}`} />
      <polygon className="iso-plate__top" points={`${pt(A)} ${pt(B)} ${pt(C)} ${pt(D)}`} />
      {lines.length > 0 && <path className="iso-plate__grid" d={lines.join(' ')} />}
      <polyline className="iso-plate__edge" points={`${pt(D)} ${pt(A)} ${pt(B)}`} />
      {label && (
        <g className="iso-plate__tag">
          <text className="iso-plate__label" x={C[0]} y={C[1] + 26} textAnchor="middle">{label}</text>
        </g>
      )}
    </g>
  )
}

interface IsoBoxProps extends IsoBoxSpec {
  order?: number
  state?: 'hot' | 'dim'
  onHover?: (id: string | null) => void
}

export function IsoBox({ id, x, y, w, d, h, title, sub, step, icon, iconColor, mine, muted, label = 'below', order = 0, state, onHover }: IsoBoxProps) {
  const A = iso(x, y, h), B = iso(x + w, y, h), C = iso(x + w, y + d, h), D = iso(x, y + d, h)
  const B0 = iso(x + w, y, 0), C0 = iso(x + w, y + d, 0), D0 = iso(x, y + d, 0)
  const top = iso(x + w / 2, y + d / 2, h)
  const base = iso(x + w / 2, y + d / 2, 0)
  const cls = `iso-box${mine ? ' iso-box--mine' : ''}${muted ? ' iso-box--muted' : ''}${state ? ` is-${state}` : ''}`
  const iconSize = Math.min(w, d) * 0.5

  /* 라벨 앵커 */
  let lx = C0[0], ly = C0[1] + 16, anchor: 'middle' | 'start' | 'end' = 'middle'
  if (label === 'above') { lx = A[0]; ly = A[1] - (sub ? 22 : 9) }
  else if (label === 'right') { lx = B0[0] + 10; ly = (B[1] + B0[1]) / 2 - (sub ? 4 : -4); anchor = 'start' }
  else if (label === 'left') { lx = D0[0] - 10; ly = (D[1] + D0[1]) / 2 - (sub ? 4 : -4); anchor = 'end' }

  return (
    <g
      className={cls}
      style={{ '--d': `${order * 55}ms` } as CSSProperties}
      onMouseEnter={onHover && id ? () => onHover(id) : undefined}
      onMouseLeave={onHover ? () => onHover(null) : undefined}
    >
      {mine && <ellipse className="iso-box__glow" cx={base[0]} cy={base[1] + 6} rx={(w + d) * 0.62} ry={(w + d) * 0.3} />}
      <ellipse className="iso-box__shadow" cx={base[0]} cy={base[1] + 5} rx={(w + d) * 0.52} ry={(w + d) * 0.24} />
      <polygon className="iso-box__left" points={`${pt(D)} ${pt(C)} ${pt(C0)} ${pt(D0)}`} />
      <polygon className="iso-box__right" points={`${pt(B)} ${pt(C)} ${pt(C0)} ${pt(B0)}`} />
      <polygon className="iso-box__top" points={`${pt(A)} ${pt(B)} ${pt(C)} ${pt(D)}`} />
      <polyline className="iso-box__hl" points={`${pt(D)} ${pt(A)} ${pt(B)}`} />
      {icon && (
        <g className="iso-box__icon">
          <ellipse className="iso-box__badge" cx={top[0]} cy={top[1] + 1} rx={iconSize * 0.95} ry={iconSize * 0.62} />
          <Icon icon={icon} color={iconColor} cx={top[0]} cy={top[1]} size={iconSize} />
        </g>
      )}
      {step != null && (
        <g className="iso-box__step">
          <circle cx={D[0] + 2} cy={D[1] - 2} r={8} />
          <text x={D[0] + 2} y={D[1] + 1.5} textAnchor="middle">{step}</text>
        </g>
      )}
      <text className="dg-title iso-box__title" x={lx} y={ly} textAnchor={anchor}>{title}</text>
      {sub && <text className="dg-sub iso-box__sub" x={lx} y={ly + 14} textAnchor={anchor}>{sub}</text>}
    </g>
  )
}

export function IsoPath({ pts, z = 0, label, seg, labelDx = 0, labelDy = -7, dashed, acc, flow, noArrow, part = 'all', state }: IsoPathSpec & { part?: 'all' | 'line' | 'label'; state?: 'hot' | 'dim' }) {
  const sp = pts.map(([x, y]) => iso(x, y, z))
  const dStr = sp.map((p, i) => `${i === 0 ? 'M' : 'L'}${pt(p)}`).join(' ')
  let bi = seg ?? 0
  if (seg == null) {
    let best = -1
    for (let i = 1; i < sp.length; i++) {
      const len = Math.hypot(sp[i][0] - sp[i - 1][0], sp[i][1] - sp[i - 1][1])
      if (len > best) { best = len; bi = i }
    }
  } else bi = seg + 1
  const mx = (sp[bi][0] + sp[bi - 1][0]) / 2 + labelDx
  const my = (sp[bi][1] + sp[bi - 1][1]) / 2 + labelDy
  return (
    <g className={`iso-path${state ? ` is-${state}` : ''}`}>
      {part !== 'label' && (
        <path
          d={dStr}
          className={`dg-edge${dashed ? ' dg-edge--dashed' : ''}${acc ? ' dg-edge--acc' : ''}`}
          markerEnd={noArrow ? undefined : `url(#${acc ? 'dg-arrow-acc' : 'dg-arrow'})`}
        />
      )}
      {part !== 'label' && flow && (
        <>
          <circle r={3.2} className={`iso-flow${acc ? ' iso-flow--acc' : ''}`}>
            <animateMotion dur="2.6s" repeatCount="indefinite" path={dStr} />
          </circle>
          <circle r={2.2} className={`iso-flow iso-flow--tail${acc ? ' iso-flow--acc' : ''}`}>
            <animateMotion dur="2.6s" begin="-1.3s" repeatCount="indefinite" path={dStr} />
          </circle>
        </>
      )}
      {part !== 'line' && label && <text x={mx} y={my} textAnchor="middle" className="dg-label">{label}</text>}
    </g>
  )
}

/**
 * 장면: 바닥판 → 경로(선) → 상자(뒤→앞 정렬, 순서대로 등장) → 경로 라벨(맨 위).
 * 상자에 마우스를 올리면 연결된 상자·경로만 밝게 남고 나머지는 흐려지며, captionAt 위치에 설명이 뜬다.
 * origin: viewBox 안에서 월드 (0,0,0)이 놓일 화면 좌표
 */
export function IsoScene({ origin, plates = [], paths = [], boxes, captionAt }: {
  origin: [number, number]
  plates?: IsoPlateSpec[]
  paths?: IsoPathSpec[]
  boxes: IsoBoxSpec[]
  /** 호버 캡션 위치 (origin 기준 화면 좌표) */
  captionAt?: [number, number]
}) {
  const [hover, setHover] = useState<string | null>(null)
  const sorted = [...boxes].sort((a, b) => (a.x + a.w + a.y + a.d) - (b.x + b.w + b.y + b.d))
  const z = plates[0]?.t ?? (plates.length ? 10 : 0)

  const related = new Set<string>()
  if (hover) {
    related.add(hover)
    for (const p of paths) {
      if (p.from === hover && p.to) related.add(p.to)
      if (p.to === hover && p.from) related.add(p.from)
    }
  }
  const boxState = (b: IsoBoxSpec) => (!hover ? undefined : b.id && related.has(b.id) ? 'hot' : 'dim')
  const pathState = (p: IsoPathSpec) => (!hover ? undefined : p.from === hover || p.to === hover ? 'hot' : 'dim')
  const hovered = hover ? boxes.find((b) => b.id === hover) : undefined
  const caption = hovered ? hovered.detail ?? (hovered.sub ? `${hovered.title} — ${hovered.sub}` : hovered.title) : ''

  return (
    <g className={`iso-scene${hover ? ' has-hover' : ''}`} transform={`translate(${origin[0]} ${origin[1]})`}>
      {plates.map((p) => <IsoPlate key={p.label || 'plate'} {...p} />)}
      {paths.map((p, i) => <IsoPath key={i} z={z} {...p} part="line" state={pathState(p)} />)}
      {sorted.map((b, i) => <IsoBox key={b.id ?? b.title} {...b} order={i} state={boxState(b)} onHover={setHover} />)}
      {paths.map((p, i) => <IsoPath key={`l${i}`} z={z} {...p} part="label" state={pathState(p)} />)}
      {captionAt && (
        <g className={`iso-caption${caption ? ' is-on' : ''}`}>
          <text x={captionAt[0]} y={captionAt[1]} textAnchor="start">
            {caption || '상자에 마우스를 올리면 연결과 설명이 표시됩니다'}
          </text>
        </g>
      )}
    </g>
  )
}

/** 범례용 미니 큐브 */
export function IsoLegendCube({ mine, muted }: { mine?: boolean; muted?: boolean }) {
  const x = 0, y = 0, w = 14, d = 14, h = 9
  const A = iso(x, y, h), B = iso(x + w, y, h), C = iso(x + w, y + d, h), D = iso(x, y + d, h)
  const B0 = iso(x + w, y, 0), C0 = iso(x + w, y + d, 0), D0 = iso(x, y + d, 0)
  return (
    <svg className="iso-legend" viewBox="-13 -1 26 25" width="18" height="17" aria-hidden>
      <g className={`iso-box${mine ? ' iso-box--mine' : ''}${muted ? ' iso-box--muted' : ''}`} style={{ animation: 'none' }}>
        <polygon className="iso-box__left" points={`${pt(D)} ${pt(C)} ${pt(C0)} ${pt(D0)}`} />
        <polygon className="iso-box__right" points={`${pt(B)} ${pt(C)} ${pt(C0)} ${pt(B0)}`} />
        <polygon className="iso-box__top" points={`${pt(A)} ${pt(B)} ${pt(C)} ${pt(D)}`} />
      </g>
    </svg>
  )
}
