import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { profile } from '../data/profile'
import { etcProjects } from '../data/etc'

export function Contact() {
  return (
    <Cover id="cv-contact" nav="contact" page="08" num="08" variant="g3">
      <Reveal className="pf-overline">LET'S WORK TOGETHER</Reveal>
      <DisplayTitle text="CONTACT" />
      <Reveal className="pf-cover__sub" delay={0.1}>
        <p>함께 만들 준비가 되어 있습니다.</p>
      </Reveal>
      <Reveal delay={0.14}>
        <div className="pf-etc">
          <span className="pf-etc__label">MORE PROJECTS</span>
          {etcProjects.map((e) => (
            <a key={e.name} className="pf-etc__row" href={e.url} target="_blank" rel="noopener noreferrer">
              <b>{e.name}</b>
              <span>{e.desc}</span>
              <i>{e.stack}</i>
            </a>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.18}>
        <div className="pf-contacts">
          <a href={`mailto:${profile.email}`}>
            <b>EMAIL</b>
            <span>{profile.email}</span>
          </a>
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
            <b>GITHUB</b>
            <span>{profile.github}</span>
          </a>
          <a href={profile.blogUrl} target="_blank" rel="noopener noreferrer">
            <b>BLOG</b>
            <span>{profile.blog}</span>
          </a>
        </div>
      </Reveal>
      <Reveal className="pf-covermeta" delay={0.26}>
        <p>&copy; 2026 {profile.nameEn} &mdash; 감사합니다. 함께 일하고 싶은 동료가 될 개발자입니다.</p>
      </Reveal>
    </Cover>
  )
}
