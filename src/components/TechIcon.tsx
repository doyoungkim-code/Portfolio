import type { IconType } from 'react-icons'
import { FaAws, FaJava } from 'react-icons/fa'
import {
  SiCplusplus, SiDocker, SiElectron, SiFastapi, SiGit, SiHtml5, SiJavascript, SiMysql,
  SiNginx, SiPostgresql, SiPython, SiReact, SiRedis, SiSpring, SiSpringboot, SiTypescript, SiVuedotjs,
} from 'react-icons/si'

export type TechKey =
  | 'java' | 'spring' | 'jpa' | 'postgres' | 'redis' | 'cpp'
  | 'aws' | 'nginx' | 'python' | 'fastapi' | 'electron'
  | 'docker' | 'git' | 'mysql' | 'html' | 'js' | 'react' | 'vue' | 'ts'

export const TECH: Record<TechKey, { label: string; Icon: IconType }> = {
  java: { label: 'Java', Icon: FaJava },
  spring: { label: 'Spring Boot', Icon: SiSpringboot },
  jpa: { label: 'Spring Data JPA', Icon: SiSpring },
  postgres: { label: 'PostgreSQL', Icon: SiPostgresql },
  redis: { label: 'Redis', Icon: SiRedis },
  cpp: { label: 'C / C++', Icon: SiCplusplus },
  aws: { label: 'AWS EC2', Icon: FaAws },
  nginx: { label: 'Nginx', Icon: SiNginx },
  python: { label: 'Python', Icon: SiPython },
  fastapi: { label: 'FastAPI', Icon: SiFastapi },
  electron: { label: 'Electron', Icon: SiElectron },
  docker: { label: 'Docker', Icon: SiDocker },
  git: { label: 'Git', Icon: SiGit },
  mysql: { label: 'MySQL', Icon: SiMysql },
  html: { label: 'HTML5', Icon: SiHtml5 },
  js: { label: 'JavaScript', Icon: SiJavascript },
  react: { label: 'React', Icon: SiReact },
  vue: { label: 'Vue.js', Icon: SiVuedotjs },
  ts: { label: 'TypeScript', Icon: SiTypescript },
}

/** 단일 기술 아이콘 (모노톤, 컬러는 CSS currentColor) */
export function TechIcon({ k, size = 18 }: { k: TechKey; size?: number }) {
  const { Icon, label } = TECH[k]
  return <Icon size={size} title={label} aria-label={label} />
}

/** 아이콘 + 라벨 스트립 — 헤어라인으로 구분 */
export function TechStrip({ keys, compact = false }: { keys: TechKey[]; compact?: boolean }) {
  return (
    <ul className={`pf-techstrip${compact ? ' pf-techstrip--sm' : ''}`}>
      {keys.map((k) => (
        <li key={k}>
          <TechIcon k={k} size={compact ? 18 : 22} />
          <span>{TECH[k].label}</span>
        </li>
      ))}
    </ul>
  )
}
