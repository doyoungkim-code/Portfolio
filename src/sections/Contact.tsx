import { FaEnvelope, FaGithub, FaPenNib } from 'react-icons/fa6'
import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { profile } from '../data/profile'

const LINKS = [
  { label: 'EMAIL', value: profile.email, href: `mailto:${profile.email}`, Icon: FaEnvelope, external: false },
  { label: 'GITHUB', value: profile.github, href: profile.githubUrl, Icon: FaGithub, external: true },
  { label: 'BLOG', value: profile.blog, href: profile.blogUrl, Icon: FaPenNib, external: true },
]

export function Contact() {
  return (
    <Cover id="cv-contact" nav="contact" page="08" num="08" variant="g3">
      <Reveal className="pf-overline">LET'S WORK TOGETHER</Reveal>
      <DisplayTitle text="CONTACT" />
      <Reveal className="pf-cover__sub" delay={0.1}>
        <p>함께 만들 준비가 되어 있습니다.</p>
      </Reveal>
      <Reveal delay={0.18}>
        <div className="pf-links">
          {LINKS.map(({ label, value, href, Icon, external }) => (
            <a
              key={label}
              className="pf-links__item"
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="pf-links__icon" aria-hidden><Icon /></span>
              <b>{label}</b>
              <span className="pf-links__val">{value}</span>
            </a>
          ))}
        </div>
      </Reveal>
      <Reveal className="pf-covermeta" delay={0.26}>
        <p>&copy; 2026 {profile.nameEn} &mdash; 감사합니다. 함께 일하고 싶은 동료가 될 개발자입니다.</p>
      </Reveal>
    </Cover>
  )
}
