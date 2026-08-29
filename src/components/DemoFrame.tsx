import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { asset } from '../lib/asset'

interface DemoFrameProps {
  /** public/ 기준 경로 (자동 시연 해시 포함) */
  path: string
  title: string
}

/**
 * 정적 데모(public/demo/*)를 상세 페이지에 꽉 채워 임베드.
 * 화면에 들어올 때만 iframe을 마운트해 자동 시연을 시작하고, 벗어나면 내려서 리소스를 아낀다.
 */
export function DemoFrame({ path, title }: DemoFrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  return (
    <div ref={ref} className="dt-demo">
      {inView && <iframe className="dt-demo__frame" src={asset(path)} title={title} allow="autoplay" />}
    </div>
  )
}
