import { useEffect } from 'react'

export const CANVAS_W = 1440
export const CANVAS_H = 900
const MIN_DESKTOP = 1024

/**
 * 데스크톱에서는 1440×900 기준으로 디자인된 페이지를 창 크기에 맞춰 균일하게 확대/축소한다.
 * (CSS zoom) 창 크기·브라우저 확대와 무관하게 항상 같은 구도로 보이도록.
 * --zoom: 배율, --lb: 가로 레터박스(디자인 px) — 고정 크롬 위치 보정용
 */
export function useFixedCanvas() {
  useEffect(() => {
    const root = document.documentElement
    const apply = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      if (vw < MIN_DESKTOP) {
        root.style.setProperty('--zoom', '1')
        root.style.setProperty('--lb', '0px')
        root.classList.remove('fixed-canvas')
        return
      }
      const zoom = Math.min(vw / CANVAS_W, vh / CANVAS_H)
      const lb = Math.max(0, (vw / zoom - CANVAS_W) / 2)
      root.style.setProperty('--zoom', String(zoom))
      root.style.setProperty('--lb', `${lb}px`)
      root.classList.add('fixed-canvas')
    }
    apply()
    window.addEventListener('resize', apply)
    return () => {
      window.removeEventListener('resize', apply)
      root.classList.remove('fixed-canvas')
    }
  }, [])
}
