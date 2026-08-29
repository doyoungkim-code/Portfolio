import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { asset } from '../lib/asset'

export type DemoMode = 'auto' | 'free'

interface DemoStageProps {
  /** public/ 기준 경로 (해시 제외) */
  path: string
  /** 자동 시연 해시 (kiosk는 여기서 붙임) */
  autoHash: string
  /** 직접 조작 해시 (컨트롤 노출) */
  freeHash: string
  /** 'auto' = 영상처럼 반복·조작 차단 / 'free' = 같은 자리에서 직접 조작 */
  mode: DemoMode
  /** 데모의 논리 너비(w)로 렌더한 뒤 스테이지에 맞게 축소. h는 초기값이며 스테이지 비율을 따라 재계산 */
  size: { w: number; h: number }
  title: string
  /** 배경 없이 콘텐츠(휴대폰)만 떠 있게 — iframe·스테이지 투명 */
  bare?: boolean
  /** 데모가 postMessage로 보내는 단계 자막 */
  onPhase: (text: string) => void
}

/**
 * 데모를 논리 해상도로 렌더하고 CSS transform으로 스테이지에 꽉 맞춘다.
 * - 화면에 처음 들어올 때 한 번 마운트하고 이후 유지 (재마운트로 인한 위치 점프 방지)
 * - 로드 후 데모가 자리 잡을 때까지 숨겼다가 페이드인 (흰 화면 깜박임 방지)
 * - auto 모드는 조작 차단, free 모드는 같은 스테이지에서 직접 조작
 */
export function DemoStage({ path, autoHash, freeHash, mode, size, title, bare = false, onPhase }: DemoStageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const inView = useInView(stageRef, { amount: 0.2 })
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  const [fitState, setFit] = useState({ scale: 0.5, h: size.h })
  const scale = fitState.scale
  const logicalH = fitState.h

  useEffect(() => {
    if (inView) setMounted(true)
  }, [inView])

  /* 스테이지에 여백 없이 꽉 차도록 — 레이아웃 px(clientWidth) 기준이라 CSS zoom과 무관 */
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const fit = () => {
      const cw = el.clientWidth
      const ch = el.clientHeight
      if (cw === 0 || ch === 0) return
      setFit({ scale: cw / size.w, h: Math.round(size.w * (ch / cw)) })
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [size.w])

  /* 데모 → 단계 자막 수신 (이 iframe에서 온 메시지만) */
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.source !== frameRef.current?.contentWindow) return
      if (e.data && e.data.type === 'demo-phase' && typeof e.data.text === 'string') onPhase(e.data.text)
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [onPhase])

  const hash = mode === 'auto' ? `${autoHash}+kiosk` : freeHash
  const w = Math.round(size.w * scale)
  const h = Math.round(logicalH * scale)

  return (
    <div
      ref={stageRef}
      className={`pf-demo__stage${mode === 'free' ? ' pf-demo__stage--free' : ''}${bare ? ' pf-demo__stage--bare' : ''}`}
    >
      {mounted && (
        <div className={`pf-demo__scaler${ready ? ' is-ready' : ''}`} style={{ width: w, height: h }}>
          <iframe
            key={hash}
            ref={frameRef}
            className="pf-demo__frame"
            src={asset(`${path}#${hash}`)}
            title={title}
            style={{ width: size.w, height: logicalH, transform: `scale(${scale})`, background: bare ? 'transparent' : undefined }}
            allow="autoplay"
            allowTransparency
            onLoad={() => {
              setReady(false)
              window.setTimeout(() => setReady(true), 450) /* 데모가 스스로 배치를 끝낸 뒤 표시 */
            }}
          />
          {mode === 'auto' && <div className="pf-demo__shield" aria-hidden />}
        </div>
      )}
    </div>
  )
}
