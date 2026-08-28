import { motion } from 'framer-motion'

interface DisplayTitleProps {
  text: string
  kr?: boolean
  as?: 'h1' | 'h2'
}

const charVariants = {
  hidden: { y: '0.7em', opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

/** 대형 대문자 디스플레이 타이틀 — 문자 단위 스태거 리빌 */
export function DisplayTitle({ text, kr = false, as = 'h2' }: DisplayTitleProps) {
  const Tag = as === 'h1' ? motion.h1 : motion.h2
  return (
    <Tag
      className={`pf-display${kr ? ' pf-display--kr' : ''}`}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.04 }}
    >
      {Array.from(text).map((ch, i) => (
        <motion.span key={i} className="ch" aria-hidden variants={charVariants}>
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </Tag>
  )
}
