import { useState } from 'react'
import { asset } from '../lib/asset'
import type { Shot } from '../data/projects'

function ShotFigure({ src, alt }: Shot) {
  const [ok, setOk] = useState(true)
  return (
    <figure className={`dt-shot${ok ? '' : ' is-ph'}`}>
      {ok && <img loading="lazy" src={asset(src)} alt={alt} onError={() => setOk(false)} />}
    </figure>
  )
}

/** 스크린샷 줄 — 이미지가 없으면 IMAGE 플레이스홀더 */
export function Shots({ items, kind }: { items: Shot[]; kind: 'mobile' | 'pc' }) {
  return (
    <div className={`dt-shots dt-shots--${kind}`}>
      {items.map((s) => (
        <ShotFigure key={s.src} {...s} />
      ))}
    </div>
  )
}

/** 캡션 있는 단일 사진 (수상 사진 등) */
export function CaptionFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const [ok, setOk] = useState(true)
  return (
    <figure className={`dt-figure${ok ? '' : ' is-ph'}`}>
      {ok && <img loading="lazy" src={asset(src)} alt={alt} onError={() => setOk(false)} />}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
