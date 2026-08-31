import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { asset } from '../lib/asset'

/** 논리 좌표계(size.w 기준)에서 확대해 보여줄 영역 */
export interface FocusRect {
  x: number
  y: number
  w: number
  h: number
}

interface DemoStageProps {
  /** public/ 기준 경로 (해시 제외) */
  path: string
  /** 자동 시연 해시 (kiosk는 여기서 붙임) */
  hash: string
  /** 데모의 논리 너비(w)로 렌더한 뒤 스테이지에 맞게 축소. h는 초기값이며 스테이지 비율을 따라 재계산 */
  size: { w: number; h: number }
  title: string
  /** 배경 없이 콘텐츠(휴대폰)만 떠 있게 — iframe·스테이지 투명 */
  bare?: boolean
  /** 현재 단계에서 확대할 영역 (없으면 전체) */
  focus?: FocusRect
  /** 데모가 postMessage로 보내는 단계 자막 */
  onPhase: (text: string) => void
}

/**
 * 데모를 논리 해상도로 렌더하고 스테이지에 맞춘다. 영상처럼 보기만(조작 차단).
 * - 처음 화면에 들어올 때 한 번 마운트 후 유지, 로드 후 페이드인
 * - focus가 주어지면 카메라처럼 해당 영역으로 부드럽게 확대/이동
 */
export function DemoStage({ path, hash, size, title, bare = false, focus, onPhase }: DemoStageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const inView = useInView(stageRef, { amount: 0.2 })
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  const [box, setBox] = useState({ cw: 0, ch: 0, pw: 0 })

  useEffect(() => {
    if (inView) setMounted(true)
  }, [inView])

  /* 스테이지 크기 추적 — 레이아웃 px(clientWidth) 기준이라 CSS zoom과 무관.
     bare(휴대폰)일 때는 부모(디바이스 열) 너비도 재서, 확대 화면이 스테이지 박스 밖으로 넘칠 수 있는 폭으로 쓴다 */
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const parent = el.parentElement
    const fit = () => {
      if (el.clientWidth && el.clientHeight) {
        setBox({ cw: el.clientWidth, ch: el.clientHeight, pw: bare && parent ? parent.clientWidth : el.clientWidth })
      }
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    if (bare && parent) ro.observe(parent)
    return () => ro.disconnect()
  }, [bare])

  /* 데모 → 단계 자막 수신 (이 iframe에서 온 메시지만) */
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.source !== frameRef.current?.contentWindow) return
      if (e.data && e.data.type === 'demo-phase' && typeof e.data.text === 'string') onPhase(e.data.text)
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [onPhase])

  const { cw, ch, pw } = box
  const logicalW = size.w
  const logicalH = cw ? Math.round(logicalW * (ch / cw)) : size.h
  const s0 = cw ? cw / logicalW : 0.5

  /* 포커스 영역 → 확대·이동 (카메라). 가로는 허용 폭(휴대폰: 디바이스 열 전체)에, 세로는 스테이지 높이에 맞춘다 */
  let camera = 'translate(0px, 0px) scale(1)'
  if (focus && cw && ch) {
    const aw = Math.max(cw, pw)
    const fw = focus.w * s0
    const fh = focus.h * s0
    const k = Math.min(aw / fw, ch / fh)
    const tx = (cw - fw * k) / 2 - focus.x * s0 * k
    const ty = (ch - fh * k) / 2 - focus.y * s0 * k
    camera = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${k.toFixed(4)})`
  }

  return (
    <div ref={stageRef} className={`pf-demo__stage${bare ? ' pf-demo__stage--bare' : ''}`}>
      {/* 화면이 켜지기 전(로드·루프 재시작) — 빈 화면 대신 대기 로고 */}
      {!bare && (
        <div className={`pf-demo__boot${ready ? ' is-off' : ''}`} aria-hidden>
          <span className="pf-demo__boot-mark">DOYOUNG<i>.</i></span>
        </div>
      )}
      {mounted && cw > 0 && (
        <div className={`pf-demo__scaler${ready ? ' is-ready' : ''}`} style={{ width: cw, height: ch, transform: camera }}>
          <iframe
            ref={frameRef}
            className="pf-demo__frame"
            src={asset(`${path}#${hash}+kiosk`)}
            title={title}
            style={{ width: logicalW, height: logicalH, transform: `scale(${s0})`, background: bare ? 'transparent' : undefined }}
            allow="autoplay"
            onLoad={() => {
              setReady(false)
              window.setTimeout(() => setReady(true), 450) /* 데모가 스스로 배치를 끝낸 뒤 표시 */
            }}
          />
          <div className="pf-demo__shield" aria-hidden />
        </div>
      )}
    </div>
  )
}
