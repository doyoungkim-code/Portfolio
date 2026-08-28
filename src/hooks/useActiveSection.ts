import { useEffect, useState } from 'react'

export interface SectionState {
  nav: string
  tone: 'dark' | 'light'
  page: string
}

/**
 * [data-nav]/[data-tone]/[data-page]를 단 섹션들을 관찰해
 * 현재 화면의 내비 키 · 톤 · 페이지 번호를 돌려준다.
 */
export function useActiveSection(): SectionState {
  const [state, setState] = useState<SectionState>({ nav: 'about', tone: 'dark', page: '01' })

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]'))
    if (sections.length === 0) return

    const apply = (el: HTMLElement) =>
      setState({
        nav: el.dataset.nav ?? 'about',
        tone: (el.dataset.tone as 'dark' | 'light') ?? 'dark',
        page: el.dataset.page ?? '01',
      })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) apply(e.target as HTMLElement)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))

    /* 페이지 바닥에서는 마지막 섹션 강제 */
    const last = sections[sections.length - 1]
    const onScroll = () => {
      const h = document.documentElement
      if (h.scrollTop + h.clientHeight >= h.scrollHeight - 80) apply(last)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return state
}
