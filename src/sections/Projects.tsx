import { useCallback, useState } from 'react'
import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { Vitals } from '../components/Vitals'
import { DetailTabs } from '../components/DetailTabs'
import { DtRows, DtTroubles } from '../components/rows'
import { CaptionFigure, Shots } from '../components/media'
import { TechStrip } from '../components/TechIcon'
import { DemoStage } from '../components/DemoStage'
import type { DemoMode } from '../components/DemoStage'
import { project1, project2 } from '../data/projects'

type Project = typeof project1 | typeof project2

/** 커버 하단 헤어라인 링크 */
function CoverLinks({ repoUrl }: { repoUrl: string }) {
  return (
    <div className="pf-coverlinks">
      <a href={repoUrl} target="_blank" rel="noopener noreferrer">GITHUB &#8599;</a>
    </div>
  )
}

function Lead({ lead }: { lead: { before: string; strong: string; after: string } }) {
  return (
    <p className="dt-lead">
      {lead.before}
      <b>{lead.strong}</b>
      {lead.after}
    </p>
  )
}

/** "④ 그룹 매칭 — …" 형태의 자막에서 단계 인덱스(0-based)를 뽑는다 */
function stepIndexOf(text: string): number {
  const code = text.charCodeAt(0)
  return code >= 0x2460 && code <= 0x2473 ? code - 0x2460 : -1
}

/* ── 데모 전용 풀스크린 페이지 ─────────────────────── */

function ProjectDemo({ p, num, variant }: { p: Project; num: string; variant?: 'alt' }) {
  const [phase, setPhase] = useState('')
  const [mode, setMode] = useState<DemoMode>('auto')
  const onPhase = useCallback((t: string) => setPhase(t), [])
  const free = mode === 'free'
  const active = free ? -1 : stepIndexOf(phase)
  const caption = free
    ? '직접 조작 중 — 화면을 눌러 기능을 써 보세요. 하단 ▶ 로 시연을 다시 재생할 수도 있습니다.'
    : active >= 0
      ? p.demo.steps[active]
      : p.demo.steps[0]

  return (
    <Cover id={`dm-${p.id}`} nav={p.id} page={p.demoPage} num={num} variant={variant} next={p.detailId} wide>
      <div className="pf-demo">
        <DemoStage
          path={p.demo.path}
          autoHash={p.demo.autoHash}
          freeHash={p.demo.freeHash}
          mode={mode}
          size={p.demo.size}
          title={p.demo.title}
          onPhase={onPhase}
        />
        <aside className="pf-demo__side">
          <p className="pf-overline">{free ? 'HANDS-ON · TRY IT' : 'LIVE DEMO · AUTO REPLAY'}</p>
          <h2 className={`pf-demo__title${'titleKr' in p && p.titleKr ? ' pf-demo__title--kr' : ''}`}>{p.title}</h2>

          <p className="pf-demo__label">{free ? 'HANDS-ON' : 'NOW SHOWING'}</p>
          <p className="pf-demo__caption">{caption}</p>

          <ol className={`pf-demo__steps${free ? ' pf-demo__steps--dim' : ''}`}>
            {p.demo.steps.map((s, i) => (
              <li key={s} className={i === active ? 'on' : i < active ? 'done' : undefined}>
                <i>{String(i + 1).padStart(2, '0')}</i>
                <span>{s}</span>
              </li>
            ))}
          </ol>

          <button type="button" className="pf-demo__cta" onClick={() => setMode(free ? 'auto' : 'free')}>
            {free ? '↺ 자동 시연으로 돌아가기' : '직접 조작해보기 →'}
          </button>
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

export function Project1Demo() {
  return <ProjectDemo p={project1} num="04" />
}

export function Project1Detail() {
  const p = project1
  return (
    <section className="pf-detail" id={p.detailId} data-nav={p.id} data-tone="light" data-page={p.detailPage}>
      <div className="pf-detail__in">
        <DetailTabs
          overline={`PROJECT 01 — ${p.title}`}
          tabs={[
            {
              id: 'a',
              label: '개요',
              content: (
                <>
                  <Lead lead={p.lead} />
                  <Shots items={p.shots} kind="mobile" />
                  <a href={p.retroUrl} target="_blank" rel="noopener noreferrer" className="dt-more">
                    회고 블로그 보기 &rarr;
                  </a>
                </>
              ),
            },
            { id: 'b', label: '구현', content: <DtRows items={p.roles} /> },
            { id: 'c', label: '기술 선택', content: <DtRows items={p.tech} /> },
            { id: 'd', label: '트러블슈팅', content: <DtTroubles items={p.troubles} /> },
          ]}
        />
      </div>
    </section>
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

export function Project2Demo() {
  return <ProjectDemo p={project2} num="05" variant="alt" />
}

export function Project2Detail() {
  const p = project2
  return (
    <section className="pf-detail" id={p.detailId} data-nav={p.id} data-tone="light" data-page={p.detailPage}>
      <div className="pf-detail__in">
        <DetailTabs
          overline={`PROJECT 02 — ${p.title}`}
          tabs={[
            {
              id: 'a',
              label: '개요',
              content: (
                <>
                  <Lead lead={p.lead} />
                  <Shots items={p.shots} kind="pc" />
                </>
              ),
            },
            { id: 'b', label: '담당 영역', content: <DtRows items={p.roles} /> },
            {
              id: 'c',
              label: '트러블슈팅 · 수상',
              content: (
                <>
                  <DtTroubles items={p.troubles} />
                  <CaptionFigure {...p.award} />
                </>
              ),
            },
          ]}
        />
      </div>
    </section>
  )
}
