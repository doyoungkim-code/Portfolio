import type { IconType } from 'react-icons'
import { FaAws } from 'react-icons/fa'
import { SiElectron, SiNginx } from 'react-icons/si'
import javaSvg from 'devicon/icons/java/java-original.svg'
import springSvg from 'devicon/icons/spring/spring-original.svg'
import postgresSvg from 'devicon/icons/postgresql/postgresql-original.svg'
import redisSvg from 'devicon/icons/redis/redis-original.svg'
import cppSvg from 'devicon/icons/cplusplus/cplusplus-original.svg'
import pythonSvg from 'devicon/icons/python/python-original.svg'
import fastapiSvg from 'devicon/icons/fastapi/fastapi-original.svg'
import dockerSvg from 'devicon/icons/docker/docker-original.svg'
import gitSvg from 'devicon/icons/git/git-original.svg'
import mysqlSvg from 'devicon/icons/mysql/mysql-original.svg'
import html5Svg from 'devicon/icons/html5/html5-original.svg'
import jsSvg from 'devicon/icons/javascript/javascript-original.svg'
import reactSvg from 'devicon/icons/react/react-original.svg'
import vueSvg from 'devicon/icons/vuejs/vuejs-original.svg'
import tsSvg from 'devicon/icons/typescript/typescript-original.svg'

export type TechKey =
  | 'java' | 'spring' | 'jpa' | 'postgres' | 'redis' | 'cpp'
  | 'aws' | 'nginx' | 'python' | 'fastapi' | 'electron'
  | 'docker' | 'git' | 'mysql' | 'html' | 'js' | 'react' | 'vue' | 'ts'

interface TechDef {
  label: string
  /** Devicon 컬러 로고 URL */
  src?: string
  /** 원본 로고가 다크 배경에서 안 보이는 경우: 단색 아이콘 + 브랜드 컬러 */
  mono?: { Icon: IconType; color: string }
}

/** Devicon 정식 컬러 로고 (AWS · Nginx · Electron은 다크 배경 가독성 때문에 브랜드 단색) */
export const TECH: Record<TechKey, TechDef> = {
  java: { label: 'Java', src: javaSvg },
  spring: { label: 'Spring Boot', src: springSvg },
  jpa: { label: 'Spring Data JPA', src: springSvg },
  postgres: { label: 'PostgreSQL', src: postgresSvg },
  redis: { label: 'Redis', src: redisSvg },
  cpp: { label: 'C / C++', src: cppSvg },
  aws: { label: 'AWS EC2', mono: { Icon: FaAws, color: '#FF9900' } },
  nginx: { label: 'Nginx', mono: { Icon: SiNginx, color: '#2FCC6B' } },
  python: { label: 'Python', src: pythonSvg },
  fastapi: { label: 'FastAPI', src: fastapiSvg },
  electron: { label: 'Electron', mono: { Icon: SiElectron, color: '#9FEAF9' } },
  docker: { label: 'Docker', src: dockerSvg },
  git: { label: 'Git', src: gitSvg },
  mysql: { label: 'MySQL', src: mysqlSvg },
  html: { label: 'HTML5', src: html5Svg },
  js: { label: 'JavaScript', src: jsSvg },
  react: { label: 'React', src: reactSvg },
  vue: { label: 'Vue.js', src: vueSvg },
  ts: { label: 'TypeScript', src: tsSvg },
}

/** 단일 기술 아이콘 */
export function TechIcon({ k, size = 22 }: { k: TechKey; size?: number }) {
  const { label, src, mono } = TECH[k]
  if (mono) return <mono.Icon size={size} color={mono.color} title={label} aria-label={label} />
  return <img src={src} alt={label} title={label} width={size} height={size} className="pf-techicon" loading="lazy" />
}

/** 아이콘 + 라벨 스트립 — 헤어라인으로 구분 */
export function TechStrip({ keys, compact = false }: { keys: TechKey[]; compact?: boolean }) {
  return (
    <ul className={`pf-techstrip${compact ? ' pf-techstrip--sm' : ''}`}>
      {keys.map((k) => (
        <li key={k}>
          <TechIcon k={k} size={compact ? 20 : 26} />
          <span>{TECH[k].label}</span>
        </li>
      ))}
    </ul>
  )
}
