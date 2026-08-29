import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { Vitals } from '../components/Vitals'
import { DetailTabs } from '../components/DetailTabs'
import { DtRows, DtTroubles } from '../components/rows'
import { CaptionFigure, Shots } from '../components/media'
import { TechStrip } from '../components/TechIcon'
import { DemoFrame } from '../components/DemoFrame'
import { asset } from '../lib/asset'
import { project1, project2 } from '../data/projects'

/** 커버 하단 헤어라인 링크: GITHUB · DEMO */
function CoverLinks({ repoUrl, demoPath }: { repoUrl: string; demoPath: string }) {
  return (
    <div className="pf-coverlinks">
      <a href={repoUrl} target="_blank" rel="noopener noreferrer">GITHUB &#8599;</a>
      <a href={asset(demoPath)} target="_blank" rel="noopener noreferrer">DEMO &#8599;</a>
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

/* ── PROJECT 01 · SSABREE TIME ───────────────────────── */

export function Project1Cover() {
  const p = project1
  return (
    <Cover id={p.coverId} nav={p.id} page={p.coverPage} num="04" bg={p.bg} next={p.detailId}>
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
        <CoverLinks repoUrl={p.repoUrl} demoPath={p.demo.path} />
      </Reveal>
    </Cover>
  )
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
            { id: 'e', label: '데모', content: <DemoFrame path={p.demo.path} title={p.demo.title} /> },
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
    <Cover id={p.coverId} nav={p.id} page={p.coverPage} num="05" variant="alt" bg={p.bg} next={p.detailId}>
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
        <CoverLinks repoUrl={p.repoUrl} demoPath={p.demo.path} />
      </Reveal>
    </Cover>
  )
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
            { id: 'd', label: '데모', content: <DemoFrame path={p.demo.path} title={p.demo.title} /> },
          ]}
        />
      </div>
    </section>
  )
}
