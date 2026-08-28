import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { journeyMeta, journeyRows } from '../data/journey'

export function Journey() {
  return (
    <Cover id="cv-journey" nav="journey" page="02" num="02" variant="alt" next="cv-skills">
      <Reveal className="pf-overline">THE ROAD SO FAR</Reveal>
      <DisplayTitle text="JOURNEY" />
      <Reveal className="pf-cover__sub" delay={0.1}>
        <p>한 번에 완성된 개발자는 없다고 생각합니다. 세 개의 과정을 순서대로 통과했습니다.</p>
      </Reveal>
      <Reveal delay={0.18}>
        <div className="pf-panel">
          {journeyRows.map((row) => (
            <div className="pf-jrow" key={row.name}>
              <span className="pf-jrow__date">{row.date}</span>
              <span className="pf-jrow__name">{row.name}</span>
              <span className="pf-jrow__desc">{row.desc}</span>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className="pf-covermeta" delay={0.26}>
        <p>{journeyMeta}</p>
      </Reveal>
    </Cover>
  )
}
