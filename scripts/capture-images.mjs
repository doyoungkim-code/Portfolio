/**
 * 데모 화면을 캡처해 커버 배경·링크 미리보기(OG) 이미지를 만든다.
 * 실제 사진이 준비되면 같은 파일명으로 덮어쓰면 된다 (public/images/README.md).
 *
 *   npm run dev        (다른 터미널에서 dev 서버가 떠 있어야 함)
 *   npm run capture    → public/images/{ssabree-1.jpg, translate-1.png, og.jpg}
 *
 * 브라우저는 로컬 Edge(channel: msedge)를 쓰므로 별도 브라우저 다운로드가 필요 없다.
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'images')
const BASE = process.env.CAPTURE_BASE ?? 'http://localhost:5173/Portfolio/'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ channel: 'msedge', headless: true })

/* 1) SSABREE — 휴대폰 홈 대시보드 (kiosk 자동 시연 ②단계, 약 9초) */
{
  const page = await browser.newPage({ viewport: { width: 440, height: 880 }, deviceScaleFactor: 2 })
  await page.goto(`${BASE}demo/ssabree/index.html#autoplay+kiosk`, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: 'html,body{background:#0C0F1D!important}' })
  await page.waitForTimeout(12500)
  await page.screenshot({ path: path.join(OUT, 'ssabree-1.jpg'), type: 'jpeg', quality: 88 })
  await page.close()
  console.log('✓ ssabree-1.jpg')
}

/* 2) 번역의 민족 — 강의 진행 화면 (슬라이드 + 자막, 약 30초) */
{
  const page = await browser.newPage({ viewport: { width: 1120, height: 700 }, deviceScaleFactor: 2 })
  await page.goto(`${BASE}demo/bunmin/index.html#autoplay+kiosk`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(31000)
  await page.screenshot({ path: path.join(OUT, 'translate-1.png') })
  await page.close()
  console.log('✓ translate-1.png')
}

/* 3) OG 이미지 — 포트폴리오 1페이지를 1200×630으로 */
{
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(3000) /* 타이틀 스태거·카운트업이 끝난 뒤 */
  await page.screenshot({ path: path.join(OUT, 'og.jpg'), type: 'jpeg', quality: 86 })
  await page.close()
  console.log('✓ og.jpg')
}

await browser.close()
