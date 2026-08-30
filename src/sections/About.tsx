import { Cover } from '../components/Cover'
import { DisplayTitle } from '../components/DisplayTitle'
import { Reveal } from '../components/Reveal'
import { Vitals } from '../components/Vitals'
import { heroVitals, profile } from '../data/profile'
import { asset } from '../lib/asset'

export function About() {
  return (
    <Cover id="cv-about" nav="about" page="01" num="01" bg={{ src: 'images/hero-bg.jpg' }} next="cv-journey">
      <Reveal className="pf-overline">BACKEND DEVELOPER &middot; PORTFOLIO 2026</Reveal>
      <DisplayTitle as="h1" text={profile.nameEn} />
      <Reveal className="pf-cover__sub" delay={0.1}>
        <p>
          탄탄하게 쌓고, <b>AI</b>로 확장하는 백엔드 개발자 {profile.nameKr}입니다.
        </p>
      </Reveal>
      <Reveal className="pf-cover__desc" delay={0.18}>
        <p>
          손에 잡히는 문제를 끝까지 파고들어 제품으로 만드는 걸 좋아합니다.
          <br className="pf-br" />
          정보통신공학 &rarr; 42경산 &rarr; SSAFY. 세 번의 담금질로 다진 CS 기본기 위에,
          <br className="pf-br" />
          로컬 AI 서비스를 설치 파일까지 직접 배포해 본 실행력을 얹었습니다.
        </p>
      </Reveal>
      <Reveal delay={0.26}>
        <Vitals items={heroVitals} />
      </Reveal>
      <Reveal delay={0.32}>
        <div className="pf-coverlinks pf-coverlinks--hero">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GITHUB &#8599;</a>
          <a href={`mailto:${profile.email}`}>EMAIL</a>
          <a href={profile.blogUrl} target="_blank" rel="noopener noreferrer">BLOG &#8599;</a>
          {profile.resumeUrl && (
            <a href={asset(profile.resumeUrl)} target="_blank" rel="noopener noreferrer">이력서 PDF &#8599;</a>
          )}
        </div>
      </Reveal>
    </Cover>
  )
}
