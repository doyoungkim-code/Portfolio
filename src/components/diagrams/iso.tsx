import type { IconType } from 'react-icons'
import { TECH } from '../TechIcon'
import type { TechKey } from '../TechIcon'

/* ─────────────────────────────────────────────────────────
   아이소메트릭(2.5D) 다이어그램 프리미티브 — Cloudcraft 풍
   월드 좌표(x, y, z) → 화면: sx = (x − y)·cos30, sy = (x + y)·sin30 − z
   (x가 커지면 오른쪽 아래, y가 커지면 왼쪽 아래, z는 위)
   색은 CSS(.iso-*)에서 관리. 본인 담당 = mine(파랑), 팀원/외부 = muted.
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
}

export interface IsoPathSpec {
  /** 바닥 위 월드 좌표 꺾은선 (z는 장면의 바닥판 두께) */
  pts: [number, number][]
  z?: number
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

export function IsoPlate({ x, y, w, d, t = 10, label }: IsoPlateSpec) {
  const A = iso(x, y, t), B = iso(x + w, y, t), C = iso(x + w, y + d, t), D = iso(x, y + d, t)
  const C0 = iso(x + w, y + d, 0), D0 = iso(x, y + d, 0), B0 = iso(x + w, y, 0)
  return (
    <g className="iso-plate">
      <polygon className="iso-plate__left" points={`${pt(D)} ${pt(C)} ${pt(C0)} ${pt(D0)}`} />
      <polygon className="iso-plate__right" points={`${pt(B)} ${pt(C)} ${pt(C0)} ${pt(B0)}`} />
      <polygon className="iso-plate__top" points={`${pt(A)} ${pt(B)} ${pt(C)} ${pt(D)}`} />
      {label && <text className="iso-plate__label" x={C[0]} y={C[1] + 24} textAnchor="middle">{label}</text>}
    </g>
  )
}

export function IsoBox({ x, y, w, d, h, title, sub, icon, iconColor, mine, muted, label = 'below' }: IsoBoxSpec) {
  const A = iso(x, y, h), B = iso(x + w, y, h), C = iso(x + w, y + d, h), D = iso(x, y + d, h)
  const B0 = iso(x + w, y, 0), C0 = iso(x + w, y + d, 0), D0 = iso(x, y + d, 0)
  const top = iso(x + w / 2, y + d / 2, h)
  const base = iso(x + w / 2, y + d / 2, 0)
  const cls = `iso-box${mine ? ' iso-box--mine' : ''}${muted ? ' iso-box--muted' : ''}`

  /* 라벨 앵커 */
  let lx = C0[0], ly = C0[1] + 16, anchor: 'middle' | 'start' | 'end' = 'middle'
  if (label === 'above') { lx = A[0]; ly = A[1] - (sub ? 22 : 9) }
  else if (label === 'right') { lx = B0[0] + 10; ly = (B[1] + B0[1]) / 2 - (sub ? 4 : -4); anchor = 'start' }
  else if (label === 'left') { lx = D0[0] - 10; ly = (D[1] + D0[1]) / 2 - (sub ? 4 : -4); anchor = 'end' }

  return (
    <g className={cls}>
      <ellipse className="iso-box__shadow" cx={base[0]} cy={base[1] + 4} rx={(w + d) * 0.5} ry={(w + d) * 0.22} />
      <polygon className="iso-box__left" points={`${pt(D)} ${pt(C)} ${pt(C0)} ${pt(D0)}`} />
      <polygon className="iso-box__right" points={`${pt(B)} ${pt(C)} ${pt(C0)} ${pt(B0)}`} />
      <polygon className="iso-box__top" points={`${pt(A)} ${pt(B)} ${pt(C)} ${pt(D)}`} />
      {icon && <Icon icon={icon} color={iconColor} cx={top[0]} cy={top[1]} size={Math.min(w, d) * 0.58} />}
      <text className="dg-title iso-box__title" x={lx} y={ly} textAnchor={anchor}>{title}</text>
      {sub && <text className="dg-sub iso-box__sub" x={lx} y={ly + 14} textAnchor={anchor}>{sub}</text>}
    </g>
  )
}

export function IsoPath({ pts, z = 0, label, seg, labelDx = 0, labelDy = -7, dashed, acc, flow, noArrow, part = 'all' }: IsoPathSpec & { part?: 'all' | 'line' | 'label' }) {
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
    <g className="iso-path">
      {part !== 'label' && (
        <path
          d={dStr}
          className={`dg-edge${dashed ? ' dg-edge--dashed' : ''}${acc ? ' dg-edge--acc' : ''}`}
          markerEnd={noArrow ? undefined : `url(#${acc ? 'dg-arrow-acc' : 'dg-arrow'})`}
        />
      )}
      {part !== 'label' && flow && (
        <circle r={3.2} className={`iso-flow${acc ? ' iso-flow--acc' : ''}`}>
          <animateMotion dur="2.6s" repeatCount="indefinite" path={dStr} />
        </circle>
      )}
      {part !== 'line' && label && <text x={mx} y={my} textAnchor="middle" className="dg-label">{label}</text>}
    </g>
  )
}

/**
 * 장면: 바닥판 → 바닥 경로(선) → 상자(뒤에서 앞 순서로 자동 정렬) → 경로 라벨(맨 위, 상자에 가리지 않게).
 * origin: viewBox 안에서 월드 (0,0,0)이 놓일 화면 좌표
 */
export function IsoScene({ origin, plates = [], paths = [], boxes }: {
  origin: [number, number]
  plates?: IsoPlateSpec[]
  paths?: IsoPathSpec[]
  boxes: IsoBoxSpec[]
}) {
  const sorted = [...boxes].sort((a, b) => (a.x + a.w + a.y + a.d) - (b.x + b.w + b.y + b.d))
  const z = plates[0]?.t ?? (plates.length ? 10 : 0)
  return (
    <g transform={`translate(${origin[0]} ${origin[1]})`}>
      {plates.map((p) => <IsoPlate key={p.label} {...p} />)}
      {paths.map((p, i) => <IsoPath key={i} z={z} {...p} part="line" />)}
      {sorted.map((b) => <IsoBox key={b.id ?? b.title} {...b} />)}
      {paths.map((p, i) => <IsoPath key={`l${i}`} z={z} {...p} part="label" />)}
    </g>
  )
}
