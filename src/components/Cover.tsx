import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { asset } from '../lib/asset'

export interface CoverBg {
  src: string
  blur?: boolean
}

interface CoverProps {
  id: string
  nav: string
  page: string
  num: string
  variant?: 'alt' | 'g2' | 'g3'
  bg?: CoverBg
  /** 하단 chevron이 가리킬 앵커 id (없으면 chevron 미표시) */
  next?: string
  children: ReactNode
}

/** 반투명 커버 배경 사진 — 파일이 없으면 통째로 사라진다 */
function CoverPhoto({ src, blur }: CoverBg) {
  const [ok, setOk] = useState(true)
  if (!ok) return null
  return (
    <div className={`pf-cover__bg${blur ? ' pf-cover__bg--blur' : ''}`} aria-hidden>
      <img src={asset(src)} alt="" onError={() => setOk(false)} />
    </div>
  )
}

/** 다크 풀스크린 커버 공통 셸: 배경 · 워터마크 번호(스크롤 패럴랙스) · chevron */
export function Cover({ id, nav, page, num, variant, bg, next, children }: CoverProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const numY = useTransform(scrollYProgress, [0, 1], ['0%', '-36%'])

  return (
    <section
      ref={ref}
      id={id}
      className={`pf-cover${variant ? ` pf-cover--${variant}` : ''}`}
      data-nav={nav}
      data-tone="dark"
      data-page={page}
    >
      {bg && <CoverPhoto {...bg} />}
      <motion.span className="pf-cover__num" aria-hidden style={{ y: numY }}>
        {num}
      </motion.span>
      <div className="pf-cover__in">{children}</div>
      {next && <a className="pf-down" href={`#${next}`} aria-label="다음 섹션" />}
    </section>
  )
}
