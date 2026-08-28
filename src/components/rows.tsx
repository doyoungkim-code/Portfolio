import type { RowItem, Trouble } from '../data/projects'

/** 번호 · 제목 · 설명의 헤어라인 행 목록 */
export function DtRows({ items }: { items: RowItem[] }) {
  return (
    <div className="dt-rows">
      {items.map((r) => (
        <div className="dt-row" key={r.title}>
          <span className="dt-row__no">{r.no}</span>
          <span className="dt-row__h">{r.title}</span>
          <p>{r.desc}</p>
        </div>
      ))}
    </div>
  )
}

/** 문제 → 해결 트러블슈팅 블록 */
export function DtTroubles({ items }: { items: Trouble[] }) {
  return (
    <>
      {items.map((t) => (
        <div className="dt-tro" key={t.title}>
          <h4>{t.title}</h4>
          <p>
            <span className="dt-k">문제</span>
            {t.problem}
          </p>
          <p>
            <span className="dt-k dt-k--s">해결</span>
            {t.solution}
          </p>
        </div>
      ))}
    </>
  )
}
