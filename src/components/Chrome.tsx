import { profile } from '../data/profile'

/** 고정 크롬: 로고 · 슬로건 · 블로그 링크 */
export function Chrome() {
  return (
    <header className="pf-chrome">
      <a className="pf-logo" href="#cv-about">
        DOYOUNG<i>.</i>
      </a>
      <p className="pf-slogan">{profile.slogan}</p>
      <a className="pf-chrome__blog" href={profile.blogUrl} target="_blank" rel="noopener noreferrer">
        BLOG
      </a>
    </header>
  )
}
