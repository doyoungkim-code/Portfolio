import { AnimatePresence, motion } from 'framer-motion'

/** 우하단 현재 페이지 카운터 */
export function PageCounter({ page, total }: { page: string; total: string }) {
  return (
    <div className="pf-pageno" aria-hidden>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.b
          key={page}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {page}
        </motion.b>
      </AnimatePresence>
      <span>/ {total}</span>
    </div>
  )
}
