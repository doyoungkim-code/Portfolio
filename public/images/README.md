# images/ — 커버 배경 · 링크 미리보기 이미지

**파일이 없으면 커버는 배경 사진 없이 렌더된다** (onError 처리 — 깨진 이미지 아이콘 없음).

현재 `ssabree-1.jpg` · `translate-1.png` · `og.png`는 **데모 화면을 캡처해 자동 생성한 임시본**이다.

```
npm run dev       # dev 서버
npm run capture   # → ssabree-1.jpg, translate-1.png, og.png 재생성
```

실제 사진이 준비되면 **같은 파일명으로 덮어쓰기만** 하면 된다 (코드 수정 불필요).

| 파일명 | 용도 | 권장 | 상태 |
|---|---|---|---|
| `ssabree-1.jpg` | PROJECT 01 커버 반투명 배경 | 세로 (휴대폰 스크린샷) | 데모 캡처 (자동) |
| `translate-1.png` | PROJECT 02 커버 반투명 배경 | 가로 16:10 | 데모 캡처 (자동) |
| `og.png` | 카톡·슬랙·메일 링크 미리보기 (`index.html` og:image) | 1200×630 | 1페이지 캡처 (자동) |
| `hero-bg.jpg` | ABOUT 커버 배경 사진 — 넣은 뒤 `src/sections/About.tsx`의 `Cover`에 `bg={{ src: 'images/hero-bg.jpg' }}` 추가 | 가로 1920px+ | 없음 |
| `award.jpg` | 전시발표회 수상 사진 — PROJECT 02 커버 배경으로 쓰려면 `src/data/projects.ts` `project2.bg` 교체 | 가로 | 없음 |

이력서 PDF는 `public/resume.pdf`로 넣고 `src/data/profile.ts`의 `resumeUrl: 'resume.pdf'`로 설정하면 1페이지에 링크가 생긴다.
