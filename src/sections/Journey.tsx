import { useLayoutEffect, useRef, useState } from 'react'
import { FaCertificate, FaCode, FaGraduationCap, FaRocket } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { Diagram } from '../components/diagrams/primitives'
import { IsoBox } from '../components/diagrams/iso'
import { journeyCerts, journeyEnd, journeyMeta, journeyRows } from '../data/journey'
import { asset } from '../lib/asset'

/* 여정 3단계 — 왼쪽→오른쪽으로 높아지는 아이소메트릭 큐브 + 기관 공식 로고(public/images/logos) */
const STEPS: { icon: IconType; h: number; logo: string; logoH: number; alt: string }[] = [
  { icon: FaGraduationCap, h: 12, logo: 'images/logos/yu.svg', logoH: 24, alt: '영남대학교' },
  { icon: FaCode, h: 22, logo: 'images/logos/42gyeongsan.png', logoH: 26, alt: '42 GYEONGSAN' },
  { icon: FaRocket, h: 32, logo: 'images/logos/ssafy.png', logoH: 38, alt: 'SSAFY' },
]

function StepCube({ icon, h, order }: { icon: IconType; h: number; order: number }) {
  return (
    <Diagram w={84} h={86}>
      <g transform="translate(42 54)">
        <IsoBox x={-16} y={-16} w={32} d={32} h={h} title="" icon={icon} iconColor="#F2F4FA" mine order={order} />
      </g>
    </Diagram>
  )
}

/** 'YYYY.MM' 또는 'YYYY.MM.DD' → 월 단위 숫자 */
function months(d: string) {
  const [y, m] = d.split('.').map(Number)
  return y * 12 + (m - 1)
}

/**
 * 자격증 핀의 x 좌표 — 취득일이 속한 구간(큐브 i ~ 큐브 i+1, 마지막은 큐브 ~ 현재)의 정중앙.
 * 큐브·라벨과 겹치지 않으면서 "그 기간 중에 땄다"가 읽힌다.
 */
function pinX(date: string, anchors: number[], xs: number[], endX: number) {
  const t = months(date)
  const pts = [...xs, endX]
  const ts = [...anchors, months(journeyEnd)]
  for (let i = 0; i < ts.length - 1; i++) {
    if (t >= ts[i] && t <= ts[i + 1]) return (pts[i] + pts[i + 1]) / 2
  }
  return t < ts[0] ? pts[0] : (pts[pts.length - 2] + endX) / 2
}

/**
 * JOURNEY — 위 60%는 전시발표회 수상 사진, 아래 띠에 가로 계단 타임라인.
 * 큐브 = 과정 시작, 레일 = 시간축(끝 = 현재), 자격증 = 취득 시점 위치의 핀.
 */
export function Journey() {
  const bandRef = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState<{ xs: number[]; w: number } | null>(null)

  /* 큐브 중심 x(띠 기준)를 재서 핀 위치를 계산 — 창 크기(캔버스 폭)가 바뀌면 다시 */
  useLayoutEffect(() => {
    const band = bandRef.current
    if (!band) return
    const measure = () => {
      const b = band.getBoundingClientRect()
      const cubes = Array.from(band.querySelectorAll<HTMLElement>('.pf-jn__stair .dg'))
      if (cubes.length !== journeyRows.length || !b.width) return
      /* getBoundingClientRect는 화면 px(고정 캔버스 zoom 포함), left 스타일은 레이아웃 px → zoom으로 나눈다 */
      const pf = band.closest('.pf') as HTMLElement | null
      const zoom = pf ? parseFloat(getComputedStyle(pf).zoom as string) || 1 : 1
      const xs = cubes.map((c) => {
        const r = c.getBoundingClientRect()
        return (r.left + r.width / 2 - b.left) / zoom
      })
      setGeo({ xs, w: b.width / zoom - 6 })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(band)
    return () => ro.disconnect()
  }, [])

  const anchors = journeyRows.map((r) => months(r.start))
  const pins = geo ? journeyCerts.map((c) => ({ c, x: pinX(c.date, anchors, geo.xs, geo.w) })) : []

  return (
    <Cover id="cv-journey" nav="journey" page="02" num="02" variant="alt" bg={{ src: 'images/journey-bg.jpg' }} next="cv-skills">
      <div className="pf-jn">
        <div className="pf-jn__head">
          <Reveal className="pf-overline">THE ROAD SO FAR</Reveal>
          <DisplayTitle text="JOURNEY" />
          <Reveal className="pf-cover__sub" delay={0.1}>
            <p>한 번에 완성된 개발자는 없다고 생각합니다.<br className="pf-br" />세 개의 과정을 순서대로 거쳐 학습해왔습니다.</p>
          </Reveal>
        </div>

        <div className="pf-jn__band" ref={bandRef}>
          <span className="pf-jn__rail" aria-hidden><b /><b /><b /><i /></span>
          {/* 자격증 핀 — 레일 위, 취득 시점 위치 */}
          {pins.map(({ c, x }, i) => (
            <div key={c.name} className="pf-jn__pin" style={{ left: x, animationDelay: `${0.6 + i * 0.15}s` }} title={`${c.issuer} · 취득 ${c.date}`}>
              <span className="pf-jn__pin-node" aria-hidden />
              <span className="pf-jn__pin-stem" aria-hidden />
              <span className="pf-jn__pin-label">
                <b><i className="pf-jn__seal" aria-hidden><FaCertificate /></i>{c.name}{c.en ? ` (${c.en})` : ''}</b>
                <span>{c.kind} · {c.date}</span>
              </span>
            </div>
          ))}
          {journeyRows.map((row, i) => (
            <Reveal key={row.name} className="pf-jn__col" delay={0.14 + i * 0.14}>
              <div className="pf-jn__stair">
                <StepCube icon={STEPS[i].icon} h={STEPS[i].h} order={i} />
              </div>
              <span className="pf-jn__logobox">
                <img className="pf-jn__logo" src={asset(STEPS[i].logo)} alt={STEPS[i].alt} style={{ height: STEPS[i].logoH }} loading="lazy" />
              </span>
              <span className="pf-jn__date">{row.date}</span>
              <span className="pf-jn__name">{row.name}</span>
              <span className="pf-jn__desc">{row.desc}</span>
            </Reveal>
          ))}
          {/* 모바일(레일 없음)에서는 자격증을 목록으로 */}
          <ul className="pf-jn__certlist" aria-label="자격증">
            <li className="pf-jn__awards-by">CERTIFICATIONS</li>
            {journeyCerts.map((c) => (
              <li key={c.name}>
                <i className="pf-jn__seal" aria-hidden><FaCertificate /></i>
                <b>{c.name}{c.en ? ` (${c.en})` : ''}</b>
                <em>{c.kind}</em>
                <span>{c.issuer} · {c.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="pf-jn__meta" delay={0.5}>
          <p>{journeyMeta}</p>
        </Reveal>
      </div>
    </Cover>
  )
}
