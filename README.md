# Portfolio

백엔드 개발자 김도영의 포트폴리오. 에디토리얼 풀페이지 디자인.

**Live**: https://doyoungkim-code.github.io/Portfolio

## Stack

- React 19 + TypeScript + Vite
- framer-motion — 리빌 · 탭 전환 · 스크롤 연동 애니메이션
- @react-three/fiber (Three.js) — 파티클 3D 배경
- GitHub Actions → GitHub Pages 자동 배포

## Structure

```
src/
  data/        # 포트폴리오 콘텐츠 (검증본, PORTFOLIO_FORM.md 기반)
  hooks/       # useActiveSection · useSnapScroll · useCountUp
  components/  # Cover · DisplayTitle · DetailTabs · ThreeBackground ...
  sections/    # 8페이지: About → Journey → Skills → P1 커버 → P1 딥다이브 → P2 커버 → P2 딥다이브 → Contact
  components/diagrams/  # 수작업 SVG 다이어그램 (아키텍처 · 데이터 플로우 · 시퀀스)
  styles/      # 디자인 토큰 + 글로벌 스타일
```

## Development

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입체크 + 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기 (/Portfolio/ base)
```

## Demos

`public/demo/` 에 두 프로젝트의 **정적 인터랙티브 데모**(빌드 없는 바닐라 HTML/CSS/JS)가 들어 있고, 프로젝트마다 **딥다이브 페이지** 왼쪽(휴대폰 / 모니터 목업)에서 영상처럼 반복 재생됩니다. 오른쪽에는 아키텍처 · 데이터 플로우 · 시퀀스 다이어그램 · 문제→해결→결과 · 역할 탭이 있습니다.

- `public/demo/ssabree/` — SSABREE TIME: 갤럭시 폰 프레임 2대가 채팅·알림을 실시간 동기화하는 자동 시연
- `public/demo/bunmin/` — 번역의 민족: 강의자 화면 자동 시연
- 해시 옵션: `#autoplay`(자동 시연) `#dual`(폰 2대) `#dark`(다크 테마) `#kiosk`(컨트롤 숨김·조작 차단·무한 반복, 단계 자막을 `postMessage`로 부모창에 전달)
- 페이지는 1280×800 논리 해상도로 렌더한 iframe을 CSS `transform: scale`로 스테이지에 맞추고, 우측에 "지금 보여주는 단계"를 동기 표시합니다 (`src/components/DemoStage.tsx`)

## Content docs

- `PORTFOLIO_FORM.md` — 콘텐츠 원본 (사실 검증 완료본)
- `INTERVIEW_PREP.md` — 항목별 개념 · 구현 · 예상 질문 정리
- `public/images/README.md` — 필요한 이미지 목록
