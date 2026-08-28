import { useEffect } from 'react'

/** 데스크톱에서만 문서에 페이지 단위 스냅(y mandatory)을 건다 */
export function useSnapScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const apply = () => {
      document.documentElement.style.scrollSnapType =
        window.innerWidth > 860 && !reduce ? 'y mandatory' : ''
    }
    apply()
    window.addEventListener('resize', apply)
    return () => {
      window.removeEventListener('resize', apply)
      document.documentElement.style.scrollSnapType = ''
    }
  }, [])
}
