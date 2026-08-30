import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { journeyMeta, journeyRows } from '../data/journey'

/**
 * JOURNEY — 가운데는 전시발표회 수상 사진이 그대로 보이고,
 * 왼쪽에 제목·한 줄 소개, 오른쪽에 여정 3단계(사이드 패널)
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
        <Reveal className="pf-jr__right" delay={0.18}>
          <div className="pf-panel pf-panel--side">
            {journeyRows.map((row) => (
              <div className="pf-jrow" key={row.name}>
                <span className="pf-jrow__date">{row.date}</span>
                <span className="pf-jrow__name">{row.name}</span>
                <span className="pf-jrow__desc">{row.desc}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Cover>
  )
}
