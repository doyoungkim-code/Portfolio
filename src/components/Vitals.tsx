import { useRef } from 'react'
import { useInView } from 'framer-motion'
import type { Vital } from '../data/profile'
import { useCountUp } from '../hooks/useCountUp'

function VitalNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const n = useCountUp(value, inView)
  return (
    <b ref={ref}>
      {prefix}
      {n}
      {suffix}
    </b>
  )
}

/** 핵심 수치 스트립 — 숫자는 카운트업, 문자열은 그대로 */
export function Vitals({ items }: { items: Vital[] }) {
  return (
    <div className="pf-vitals">
      {items.map((v) => (
        <div key={v.label}>
          {typeof v.value === 'number' ? (
            <VitalNumber value={v.value} prefix={v.prefix} suffix={v.suffix} />
          ) : (
            <b>{v.value}</b>
          )}
          <span>{v.label}</span>
        </div>
      ))}
    </div>
  )
}
