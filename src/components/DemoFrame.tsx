import { asset } from '../lib/asset'

interface DemoFrameProps {
  /** public/ 기준 경로 (해시 포함 가능) */
  path: string
  title: string
  note?: string
}

/** 정적 데모(public/demo/*)를 상세 페이지 탭 안에 임베드 */
export function DemoFrame({ path, title, note }: DemoFrameProps) {
  const url = asset(path)
  return (
    <div className="dt-demo">
      <div className="dt-demo__bar">
        <span>{note ?? '자동 시연이 재생됩니다 — 실제 서비스 UI를 재현한 정적 데모'}</span>
        <a href={url} target="_blank" rel="noopener noreferrer">
          새 창에서 열기 &#8599;
        </a>
      </div>
      <iframe className="dt-demo__frame" src={url} title={title} loading="lazy" allow="autoplay" />
    </div>
  )
}
