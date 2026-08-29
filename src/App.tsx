import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { Chrome } from './components/Chrome'
import { SideNav } from './components/SideNav'
import { PageCounter } from './components/PageCounter'

/* Three.js는 무거워서 별도 청크로 지연 로딩 */
const ThreeBackground = lazy(() => import('./components/ThreeBackground'))
import { useActiveSection } from './hooks/useActiveSection'
import { useSnapScroll } from './hooks/useSnapScroll'
import { useFixedCanvas } from './hooks/useFixedCanvas'
import { About } from './sections/About'
import { Journey } from './sections/Journey'
import { Skills } from './sections/Skills'
import { Project1Cover, Project1Deep, Project2Cover, Project2Deep } from './sections/Projects'
import { Contact } from './sections/Contact'

export default function App() {
  const { id, nav, tone, page } = useActiveSection()
  useSnapScroll()
  useFixedCanvas()
  const rootClass = ['pf', tone === 'light' && 'pf--onlight', id.startsWith('dm-') && 'pf--ondemo']
    .filter(Boolean)
    .join(' ')

  return (
    <MotionConfig reducedMotion="user">
      <div className={rootClass}>
        <Suspense fallback={null}>
          <ThreeBackground dimmed={tone === 'light'} />
        </Suspense>
        <Chrome />
        <SideNav active={nav} />
        <main>
          <About />
          <Journey />
          <Skills />
          <Project1Cover />
          <Project1Deep />
          <Project2Cover />
          <Project2Deep />
          <Contact />
        </main>
        <PageCounter page={page} total="08" />
      </div>
    </MotionConfig>
  )
}
