import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { Chrome } from './components/Chrome'
import { SideNav } from './components/SideNav'
import { PageCounter } from './components/PageCounter'

/* Three.js는 무거워서 별도 청크로 지연 로딩 */
const ThreeBackground = lazy(() => import('./components/ThreeBackground'))
import { useActiveSection } from './hooks/useActiveSection'
import { useSnapScroll } from './hooks/useSnapScroll'
import { About } from './sections/About'
import { Journey } from './sections/Journey'
import { Skills } from './sections/Skills'
import { Project1Cover, Project1Demo, Project1Detail, Project2Cover, Project2Demo, Project2Detail } from './sections/Projects'
import { Contact } from './sections/Contact'

export default function App() {
  const { nav, tone, page } = useActiveSection()
  useSnapScroll()

  return (
    <MotionConfig reducedMotion="user">
      <div className={`pf${tone === 'light' ? ' pf--onlight' : ''}`}>
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
          <Project1Demo />
          <Project1Detail />
          <Project2Cover />
          <Project2Demo />
          <Project2Detail />
          <Contact />
        </main>
        <PageCounter page={page} total="10" />
      </div>
    </MotionConfig>
  )
}
