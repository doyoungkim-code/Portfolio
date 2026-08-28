import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

export interface Tab {
  id: string
  label: string
  content: ReactNode
}

/** 상세 페이지 상단(오버라인+탭 바) + 패널 전환 (AnimatePresence) */
export function DetailTabs({ overline, tabs }: { overline: string; tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id)
  const current = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <>
      <div className="dt-top">
        <p className="dt-overline">{overline}</p>
        <div className="dt-tabs" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === active}
              className={t.id === active ? 'on' : undefined}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="dt-panels">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            className="dt-panel on"
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {current.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
