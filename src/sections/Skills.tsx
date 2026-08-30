import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { TechIcon, TechStrip } from '../components/TechIcon'
import { alsoKeys, highlightLine, skillRows } from '../data/skills'

export function Skills() {
  return (
    <Cover id="cv-skills" nav="skills" page="03" num="03" variant="g2" next="cv-p1">
      <Reveal className="pf-overline">PROVEN BY WORK, NOT PERCENT</Reveal>
      <DisplayTitle text="SKILLS" />
      <Reveal delay={0.18}>
        <div className="pf-panel">
          {skillRows.map((row) => (
            <div className="pf-srow" key={row.name}>
              <span className="pf-srow__name">
                <TechIcon k={row.icon} size={20} />
                {row.name}
              </span>
              <span className="pf-srow__desc">{row.desc}</span>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.24}>
        <TechStrip keys={alsoKeys} />
      </Reveal>
      <Reveal className="pf-covermeta pf-covermeta--tight" delay={0.3}>
        <p>{highlightLine}</p>
      </Reveal>
    </Cover>
  )
}
