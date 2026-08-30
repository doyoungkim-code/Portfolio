import type { CSSProperties } from 'react'
import { FaCode, FaGraduationCap, FaRocket } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { Diagram } from '../components/diagrams/primitives'
import { IsoBox } from '../components/diagrams/iso'
import { journeyMeta, journeyRows } from '../data/journey'

/* 여정 3단계를 아이소메트릭 계단으로 — 갈수록 높아지는 큐브 */
const STEPS: { icon: IconType; h: number }[] = [
  { icon: FaGraduationCap, h: 12 },
  { icon: FaCode, h: 20 },
  { icon: FaRocket, h: 28 },
]

function StepCube({ icon, h, order }: { icon: IconType; h: number; order: number }) {
  return (
    <Diagram w={72} h={78}>
      <g transform="translate(36 46)">
        <IsoBox x={-15} y={-15} w={30} d={30} h={h} title="" icon={icon} iconColor="#F2F4FA" mine order={order} />
      </g>
    </Diagram>
  )
}

/**
 * JOURNEY — 가운데는 전시발표회 수상 사진이 그대로 보이고,
 * 왼쪽에 제목·한 줄 소개, 오른쪽에 계단형 3D 타임라인
 */
export function Journey() {
  return (
    <Cover id="cv-journey" nav="journey" page="02" num="02" variant="alt" bg={{ src: 'images/journey-bg.jpg' }} next="cv-skills">
      <div className="pf-jr">
        <div className="pf-jr__left">
          <Reveal className="pf-overline">THE ROAD SO FAR</Reveal>
          <DisplayTitle text="JOURNEY" />
          <Reveal className="pf-cover__sub" delay={0.1}>
            <p>한 번에 완성된 개발자는 없다고 생각합니다. 세 개의 과정을 순서대로 통과했습니다.</p>
          </Reveal>
          <Reveal className="pf-covermeta" delay={0.2}>
            <p>{journeyMeta}</p>
          </Reveal>
        </div>
        <div className="pf-jr__center" aria-hidden />
        <div className="pf-jr__right">
          <ol className="pf-tl">
            <i className="pf-tl__dot" aria-hidden />
            {journeyRows.map((row, i) => (
              <Reveal key={row.name} delay={0.12 + i * 0.12}>
                <li className="pf-tl__item" style={{ '--i': i } as CSSProperties}>
                  <div className="pf-tl__cube">
                    <StepCube icon={STEPS[i].icon} h={STEPS[i].h} order={i} />
                  </div>
                  <div className="pf-tl__body">
                    <span className="pf-tl__no">{String(i + 1).padStart(2, '0')}</span>
                    <span className="pf-tl__date">{row.date}</span>
                    <span className="pf-tl__name">{row.name}</span>
                    <span className="pf-tl__desc">{row.desc}</span>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Cover>
  )
}
