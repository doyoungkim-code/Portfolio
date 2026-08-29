import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { asset } from '../lib/asset'

interface DemoFrameProps {
  /** public/ 기준 경로 (해시 제외) */
  path: string
  /** 자동 시연용 해시 토큰 (예: 'autoplay+dual') */
  autoHash: string
  /** 직접 조작용 해시 토큰 (예: 'dual') */
  freeHash?: string
  title: string
}

/**
 * 정적 데모(public/demo/*) 임베드.
 * - 기본(kiosk): 영상처럼 무한 반복 재생, 컨트롤 숨김, 클릭 차단
 * - "데모 둘러보기": 같은 자리에서 직접 조작 모드로 전환 (컨트롤 노출)
 * 화면에 들어올 때만 iframe을 마운트한다.
 */
export function DemoFrame({ path, autoHash, freeHash = '', title }: DemoFrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [free, setFree] = useState(false)

  const hash = free ? freeHash : `${autoHash}+kiosk`
  const src = asset(`${path}#${hash}`)

  return (
    <div ref={ref} className={`dt-demo${free ? ' dt-demo--free' : ''}`}>
      {inView && <iframe key={hash} className="dt-demo__frame" src={src} title={title} allow="autoplay" />}
      {!free && <div className="dt-demo__shield" aria-hidden />}
      <div className="dt-demo__ctl">
        {free ? (
          <button type="button" onClick={() => setFree(false)}>&#8634; 자동 시연으로</button>
        ) : (
          <button type="button" onClick={() => setFree(true)}>데모 둘러보기 &rarr;</button>
        )}
        <a href={asset(`${path}#${freeHash}`)} target="_blank" rel="noopener noreferrer">새 창 &#8599;</a>
      </div>
    </div>
  )
}
