import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { Vitals } from '../components/Vitals'
import { DetailTabs } from '../components/DetailTabs'
import { DtRows } from '../components/rows'
import { TechStrip } from '../components/TechIcon'
import { DemoStage } from '../components/DemoStage'
import type { DemoMode } from '../components/DemoStage'
import { SsabreeArch, SsabreeFlow, SsabreeSeq } from '../components/diagrams/SsabreeDiagrams'
import { BunminArch, BunminFlow, BunminSeq } from '../components/diagrams/BunminDiagrams'
import { project1, project2 } from '../data/projects'
import type { Trouble } from '../data/projects'

type Project = typeof project1 | typeof project2

/** 커버 하단 헤어라인 링크 */
function CoverLinks({ repoUrl }: { repoUrl: string }) {
  return (
    <div className="pf-coverlinks">
      <a href={repoUrl} target="_blank" rel="noopener noreferrer">GITHUB &#8599;</a>
    </div>
  )
}

/** "④ 그룹 매칭 — …" 형태의 자막에서 단계 인덱스(0-based)를 뽑는다 */
function stepIndexOf(text: string): number {
  const code = text.charCodeAt(0)
  return code >= 0x2460 && code <= 0x2473 ? code - 0x2460 : -1
}

function DiagramTab({ children, note }: { children: ReactNode; note: string }) {
  return (
    <div className="dg-wrap">
      {children}
      <p className="dg-note">
        <b>■</b> 본인 담당 &nbsp;·&nbsp; 흐린 상자 = 팀원 · 외부 서비스 &nbsp;·&nbsp; {note}
      </p>
    </div>
  )
}

/** 문제 → 해결 → 결과 */
function Psr({ items }: { items: Trouble[] }) {
  return (
    <div className="psr">
      {items.map((t) => (
        <div className="psr__item" key={t.title}>
          <h4 className="psr__title">{t.title}</h4>
          <div className="psr__grid">
            <div className="psr__cell psr__cell--p"><b>문제</b><p>{t.problem}</p></div>
            <div className="psr__cell psr__cell--s"><b>해결</b><p>{t.solution}</p></div>
            <div className="psr__cell psr__cell--r"><b>결과</b><p>{t.result}</p></div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── 딥다이브 페이지: 왼쪽 영상(디바이스) + 오른쪽 기술 탭 ─────────── */

interface DeepProps {
  p: Project
  num: string
  variant?: 'alt'
  next: string
  diagrams: { arch: ReactNode; flow: ReactNode; seq: ReactNode; notes: [string, string, string] }
}

function ProjectDeep({ p, num, variant, next, diagrams }: DeepProps) {
  const [phase, setPhase] = useState('')
  const [mode, setMode] = useState<DemoMode>('auto')
  const onPhase = useCallback((t: string) => setPhase(t), [])
  const free = mode === 'free'
  const active = free ? -1 : stepIndexOf(phase)
  const caption = free ? '직접 조작 중 — 화면을 눌러 기능을 써 보세요' : p.demo.steps[Math.max(active, 0)]

  const stage = (
    <DemoStage
      path={p.demo.path}
      autoHash={p.demo.autoHash}
      freeHash={p.demo.freeHash}
      mode={mode}
      size={p.demo.size}
      title={p.demo.title}
      bare={p.device === 'phone'}
      onPhase={onPhase}
    />
  )

  return (
    <Cover id={`dm-${p.id}`} nav={p.id} page={p.demoPage} num={num} variant={variant} next={next} wide demo>
      <div className="pf-deep">
        <div className="pf-deep__left">
          <div className={`pf-device pf-device--${p.device}`}>
            {p.device === 'monitor' ? (
              <div className="pf-monitor">
                <div className="pf-monitor__screen">{stage}</div>
                <div className="pf-monitor__stand" />
                <div className="pf-monitor__base" />
              </div>
            ) : (
              stage
            )}
          </div>
          <div className="pf-deep__strip">
            <span className="pf-deep__now">{free ? 'HANDS-ON' : `NOW · ${String(Math.max(active, 0) + 1).padStart(2, '0')}`}</span>
            <span className="pf-deep__cap" title={caption}>{caption}</span>
            <span className="pf-deep__dots" aria-hidden>
              {p.demo.steps.map((s, i) => (
                <i key={s} className={i === active ? 'on' : i < active ? 'done' : undefined} />
              ))}
            </span>
            <button type="button" className="pf-deep__toggle" onClick={() => setMode(free ? 'auto' : 'free')}>
              {free ? '↺ 자동 시연' : '직접 조작 →'}
            </button>
          </div>
        </div>

        <aside className="pf-deep__panel">
          <h2 className={`pf-deep__title${'titleKr' in p && p.titleKr ? ' pf-deep__title--kr' : ''}`}>{p.title}</h2>
          <DetailTabs
            overline="DEEP DIVE"
            tabs={[
              { id: 'arch', label: '아키텍처', content: <DiagramTab note={diagrams.notes[0]}>{diagrams.arch}</DiagramTab> },
              { id: 'flow', label: '데이터 플로우', content: <DiagramTab note={diagrams.notes[1]}>{diagrams.flow}</DiagramTab> },
              { id: 'seq', label: '시퀀스', content: <DiagramTab note={diagrams.notes[2]}>{diagrams.seq}</DiagramTab> },
              { id: 'psr', label: '문제 → 해결 → 결과', content: <Psr items={p.troubles} /> },
              { id: 'roles', label: '역할 · 구현', content: <DtRows items={p.roles} /> },
            ]}
          />
        </aside>
      </div>
    </Cover>
  )
}

/* ── PROJECT 01 · SSABREE TIME ───────────────────────── */

export function Project1Cover() {
  const p = project1
  return (
    <Cover id={p.coverId} nav={p.id} page={p.coverPage} num="04" bg={p.bg} next={`dm-${p.id}`}>
      <Reveal className="pf-overline">{p.overline}</Reveal>
      <DisplayTitle text={p.title} />
      <Reveal className="pf-cover__sub" delay={0.1}>
        <p>{p.sub}</p>
      </Reveal>
      <Reveal className="pf-cover__desc" delay={0.16}>
        <p>{p.meta}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <TechStrip keys={p.stack} compact />
      </Reveal>
      <Reveal delay={0.24}>
        <Vitals items={p.vitals} />
      </Reveal>
      <Reveal delay={0.3}>
        <CoverLinks repoUrl={p.repoUrl} />
      </Reveal>
    </Cover>
  )
}

export function Project1Deep() {
  return (
    <ProjectDeep
      p={project1}
      num="04"
      next={project2.coverId}
      diagrams={{
        arch: <SsabreeArch />,
        flow: <SsabreeFlow />,
        seq: <SsabreeSeq />,
        notes: [
          'EC2 한 대에 Docker Compose로 Nginx · Spring · PostgreSQL · Redis 구동',
          'HOT 게시판은 look-aside 캐시(TTL 3분), 인기 검색어는 Sorted Set',
          'STOMP CONNECT 프레임의 JWT를 ChannelInterceptor에서 검증',
        ],
      }}
    />
  )
}

/* ── PROJECT 02 · 번역의 민족 ───────────────────────── */

export function Project2Cover() {
  const p = project2
  return (
    <Cover id={p.coverId} nav={p.id} page={p.coverPage} num="05" variant="alt" bg={p.bg} next={`dm-${p.id}`}>
      <Reveal className="pf-overline">{p.overline}</Reveal>
      <DisplayTitle text={p.title} kr />
      <Reveal className="pf-cover__sub" delay={0.1}>
        <p>{p.sub}</p>
      </Reveal>
      <Reveal className="pf-cover__desc" delay={0.16}>
        <p>{p.meta}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <TechStrip keys={p.stack} compact />
      </Reveal>
      <Reveal delay={0.24}>
        <Vitals items={p.vitals} />
      </Reveal>
      <Reveal delay={0.3}>
        <CoverLinks repoUrl={p.repoUrl} />
      </Reveal>
    </Cover>
  )
}

export function Project2Deep() {
  return (
    <ProjectDeep
      p={project2}
      num="05"
      variant="alt"
      next="cv-contact"
      diagrams={{
        arch: <BunminArch />,
        flow: <BunminFlow />,
        seq: <BunminSeq />,
        notes: [
          '서버 없이 강의자 PC 한 대에서 전 과정 처리(온디바이스)',
          '발화 단위로 ASR → NMT → TTS, 목표 지연 2초 이내',
          '설치 → 첫 실행까지, 관리자 권한 없는 강의실 PC 기준',
        ],
      }}
    />
  )
}
