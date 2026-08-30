import { FaCode, FaGraduationCap, FaRocket } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { Diagram } from '../components/diagrams/primitives'
import { IsoBox } from '../components/diagrams/iso'
import { journeyMeta, journeyRows } from '../data/journey'
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

/**
 * JOURNEY — 위 60%는 전시발표회 수상 사진, 아래 띠에 가로 계단 타임라인
 * (큐브가 왼쪽→오른쪽으로 높아지고, 레일 위로 점이 흐른다)
 */
export function Journey() {
  return (
    <Cover id="cv-journey" nav="journey" page="02" num="02" variant="alt" bg={{ src: 'images/journey-bg.jpg' }} next="cv-skills">
      <div className="pf-jn">
        <div className="pf-jn__head">
          <Reveal className="pf-overline">THE ROAD SO FAR</Reveal>
          <DisplayTitle text="JOURNEY" />
          <Reveal className="pf-cover__sub" delay={0.1}>
            <p>한 번에 완성된 개발자는 없다고 생각합니다.<br className="pf-br" />세 개의 과정을 순서대로 통과했습니다.</p>
          </Reveal>
        </div>

        <div className="pf-jn__band">
          <span className="pf-jn__rail" aria-hidden><b /><b /><b /><i /></span>
          {journeyRows.map((row, i) => (
            <Reveal key={row.name} className="pf-jn__col" delay={0.14 + i * 0.14}>
              <span className="pf-jn__no">{String(i + 1).padStart(2, '0')}</span>
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
        </div>

        <Reveal className="pf-jn__meta" delay={0.5}>
          <p>{journeyMeta}</p>
        </Reveal>
      </div>
    </Cover>
  )
}
