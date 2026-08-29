import { useEffect } from 'react'

export const CANVAS_W = 1440
export const CANVAS_H = 900
const MIN_DESKTOP = 1024

/**
 * 데스크톱에서는 1440×900 기준으로 디자인된 페이지를 창 크기에 맞춰 균일하게 확대/축소한다.
 * (CSS zoom) 창 크기·브라우저 확대와 무관하게 항상 같은 크기감으로 보이도록.
 * 높이는 항상 한 화면(900 디자인 px)에 맞추고, 가로는 창 너비만큼 캔버스를 넓혀 좌우 여백 없이 쓴다.
 * --zoom: 배율, --cw: 캔버스 너비(디자인 px)
 */
export function useFixedCanvas() {
  useEffect(() => {
    const root = document.documentElement
    const apply = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      if (vw < MIN_DESKTOP) {
        root.style.setProperty('--zoom', '1')
        root.style.setProperty('--cw', '100%')
        root.classList.remove('fixed-canvas')
        return
      }
      const zoom = Math.min(vw / CANVAS_W, vh / CANVAS_H)
      root.style.setProperty('--zoom', String(zoom))
      root.style.setProperty('--cw', `${Math.round(vw / zoom)}px`)
      root.classList.add('fixed-canvas')
    }
    apply()
    window.addEventListener('resize', apply)
    return () => {
      window.removeEventListener('resize', apply)
      root.classList.remove('fixed-canvas')
      root.style.removeProperty('--cw')
    }
  }, [])
}
