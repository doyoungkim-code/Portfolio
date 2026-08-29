import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { asset } from '../lib/asset'

interface DemoStageProps {
  /** public/ 기준 경로 (해시 제외) */
  path: string
  /** 자동 시연 해시 (kiosk는 여기서 붙임) */
  autoHash: string
  /** 데모의 논리 해상도 — 이 크기로 렌더한 뒤 스테이지에 맞게 축소 */
  size: { w: number; h: number }
  title: string
  /** 데모가 postMessage로 보내는 단계 자막 */
  onPhase: (text: string) => void
}

/**
 * 데모를 논리 해상도(예: 1280×800)로 렌더하고 CSS transform으로 스테이지에 꽉 맞춘다.
 * 화면에 들어올 때만 마운트, 조작은 차단(영상처럼 보기만).
 */
export function DemoStage({ path, autoHash, size, title, onPhase }: DemoStageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const inView = useInView(stageRef, { amount: 0.3 })
  const [scale, setScale] = useState(0.5)

  /* 스테이지 크기에 맞춰 축소 비율 계산 */
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const fit = () => {
      const r = el.getBoundingClientRect()
      setScale(Math.min(r.width / size.w, r.height / size.h))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [size.w, size.h])

  /* 데모 → 단계 자막 수신 (이 iframe에서 온 메시지만) */
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.source !== frameRef.current?.contentWindow) return
      if (e.data && e.data.type === 'demo-phase' && typeof e.data.text === 'string') onPhase(e.data.text)
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [onPhase])

  const w = Math.round(size.w * scale)
  const h = Math.round(size.h * scale)

  return (
    <div ref={stageRef} className="pf-demo__stage">
      {inView && (
        <div className="pf-demo__scaler" style={{ width: w, height: h }}>
          <iframe
            ref={frameRef}
            className="pf-demo__frame"
            src={asset(`${path}#${autoHash}+kiosk`)}
            title={title}
            style={{ width: size.w, height: size.h, transform: `scale(${scale})` }}
            allow="autoplay"
          />
          <div className="pf-demo__shield" aria-hidden />
        </div>
      )}
    </div>
  )
}
