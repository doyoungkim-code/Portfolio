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
npm run capture  # (dev 서버 실행 중) 데모 화면 캡처 → public/images/{ssabree-1.jpg, translate-1.png, og.jpg}
```

`npm run capture`는 로컬 Edge(Playwright `channel: msedge`)로 데모의 특정 장면을 찍어 커버 배경과 링크 미리보기(OG) 이미지를 만듭니다. 실제 사진이 준비되면 같은 파일명으로 덮어쓰면 됩니다 — `public/images/README.md`.

## Demos

`public/demo/` 에 두 프로젝트의 **정적 인터랙티브 데모**(빌드 없는 바닐라 HTML/CSS/JS)가 들어 있고, 프로젝트마다 **딥다이브 페이지** 왼쪽(휴대폰 / 모니터 목업)에서 영상처럼 반복 재생됩니다. 오른쪽에는 아키텍처 · 데이터 플로우 · 시퀀스 다이어그램 · 문제→해결→결과 · 역할 탭이 있습니다.

- `public/demo/ssabree/` — SSABREE TIME: 갤럭시 폰 프레임에서 로그인 → 게시판 → AI 검열 → 팀 매칭 → 수락 푸시 → 채팅까지 자동 시연 (kiosk 모드에서는 지원자 폰 1대만 표시)
- `public/demo/bunmin/` — 번역의 민족: 강의자 화면 자동 시연
- 해시 옵션: `#autoplay`(자동 시연) `#dual`(폰 2대, 직접 실행 시) `#dark`(다크 테마) `#kiosk`(컨트롤 숨김·조작 차단·무한 반복, 단계 자막을 `postMessage`로 부모창에 전달)
- 페이지는 논리 해상도(휴대폰 440×880, 모니터 1120×700)로 렌더한 iframe을 CSS `transform: scale`로 스테이지에 맞추고, 단계마다 전체 → 해당 영역 확대(카메라)로 보여줍니다 (`src/components/DemoStage.tsx`). 모바일에서는 세로 스택·확대 없음

## Content docs

- `PORTFOLIO_FORM.md` — 콘텐츠 원본 (사실 검증 완료본)
- `INTERVIEW_PREP.md` — 항목별 개념 · 구현 · 예상 질문 정리
- `public/images/README.md` — 필요한 이미지 목록
