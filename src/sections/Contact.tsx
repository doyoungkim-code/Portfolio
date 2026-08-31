import { useCallback, useEffect, useRef, useState } from 'react'
import { FaCheck, FaEnvelope, FaGithub, FaPenNib } from 'react-icons/fa6'
import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { profile } from '../data/profile'

/** 클립보드 복사 — Clipboard API가 막힌 환경(구형·비보안 컨텍스트)에서는 임시 textarea로 */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onCopy = useCallback(async () => {
    const ok = await copyText(profile.email)
    if (!ok) return
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2200)
  }, [])

  return (
    <Cover id="cv-contact" nav="contact" page="08" num="08" variant="g3">
      <Reveal className="pf-overline">LET'S WORK TOGETHER</Reveal>
      <DisplayTitle text="CONTACT" />
      <Reveal className="pf-cover__sub" delay={0.1}>
        <p>함께 만들 준비가 되어 있습니다.</p>
      </Reveal>
      <Reveal delay={0.18}>
        <div className="pf-links">
          <button type="button" className={`pf-links__item${copied ? ' is-copied' : ''}`} onClick={onCopy}>
            <span className="pf-links__icon" aria-hidden>{copied ? <FaCheck /> : <FaEnvelope />}</span>
            <b>EMAIL</b>
            <span className="pf-links__val">{profile.email}</span>
            <span className="pf-links__hint">{copied ? '복사되었습니다' : '클릭하면 복사'}</span>
          </button>
          <a className="pf-links__item" href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
            <span className="pf-links__icon" aria-hidden><FaGithub /></span>
            <b>GITHUB</b>
            <span className="pf-links__val">{profile.github}</span>
            <span className="pf-links__hint">github.com &#8599;</span>
          </a>
          <a className="pf-links__item" href={profile.blogUrl} target="_blank" rel="noopener noreferrer">
            <span className="pf-links__icon" aria-hidden><FaPenNib /></span>
            <b>BLOG</b>
            <span className="pf-links__val">{profile.blog}</span>
            <span className="pf-links__hint">기술 회고 &#8599;</span>
          </a>
        </div>
      </Reveal>
      <p className="pf-links__live" role="status" aria-live="polite">{copied ? `${profile.email} 이(가) 복사되었습니다` : ''}</p>
      <Reveal className="pf-covermeta" delay={0.26}>
        <p>&copy; 2026 {profile.nameEn} &mdash; 감사합니다. 함께 일하고 싶은 동료가 될 개발자입니다.</p>
      </Reveal>
    </Cover>
  )
}
