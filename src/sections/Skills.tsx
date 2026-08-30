import { FaCertificate } from 'react-icons/fa'
import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { TechIcon, TechStrip } from '../components/TechIcon'
import { alsoKeys, certs, highlightLine, skillRows } from '../data/skills'

export function Skills() {
  return (
    <Cover id="cv-skills" nav="skills" page="03" num="03" variant="g2" next="cv-p1">
      <Reveal className="pf-overline">PROVEN BY WORK, NOT PERCENT</Reveal>
      <DisplayTitle text="SKILLS" />
      <Reveal className="pf-cover__sub" delay={0.1}>
        <p>숫자 게이지 대신, 각 기술로 실제로 무엇을 만들었는지로 말합니다.</p>
      </Reveal>
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
      <Reveal delay={0.28}>
        <div className="pf-certs">
          <span className="pf-certs__label">CERTIFICATIONS</span>
          {certs.map((c) => (
            <div className="pf-cert" key={c.name}>
              <span className="pf-cert__seal" aria-hidden><FaCertificate /></span>
              <span className="pf-cert__body">
                <span className="pf-cert__name">{c.name} <em>{c.en}</em></span>
                <span className="pf-cert__meta">{c.issuer} · 취득 {c.date}</span>
              </span>
              <span className="pf-cert__kind">{c.kind}</span>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className="pf-covermeta pf-covermeta--tight" delay={0.32}>
        <p>{highlightLine}</p>
      </Reveal>
    </Cover>
  )
}
