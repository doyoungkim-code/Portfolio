import { Diagram, Edge, Group, Node, Seq } from './primitives'

/** 시스템 아키텍처 — 강의자 PC 온디바이스 + 수강자 브라우저. 본인 담당(배포·설치·FastAPI 일부) 강조 */
export function BunminArch() {
  return (
    <Diagram w={760} h={440}>
      <Group x={20} y={14} w={470} h={300} label="강의자 PC — 온디바이스 (서버 없음)" />
      <Node x={40} y={44} w={200} h={54} title="Electron 앱" sub="React UI · 강의자 화면" muted />
      <Node x={280} y={44} w={190} h={54} title="FastAPI (로컬)" sub="PyInstaller exe · 자식 프로세스" mine />
      <Node x={40} y={140} w={130} h={50} title="Whisper" sub="ASR (CT2 int8)" muted />
      <Node x={190} y={140} w={130} h={50} title="NLLB-200" sub="한→영 번역" muted />
      <Node x={340} y={140} w={130} h={50} title="TTS" sub="영어 음성 합성" muted />
      <Node x={40} y={220} w={200} h={50} title="Qwen3-VL" sub="슬라이드 OCR · 번역 (팀원)" muted />
      <Node x={280} y={220} w={190} h={50} title="모델 다운로드 · 검증" sub="설치 후 첫 실행 플로우" mine />

      <Node x={560} y={44} w={180} h={54} title="수강자 브라우저" sub="자막 · TTS · 번역 슬라이드" muted />
      <Node x={560} y={140} w={180} h={50} title="WebSocket · WebRTC" sub="4채널 동기화 (팀원)" muted />

      <Edge points={[[240, 71], [280, 71]]} label="localhost" labelDy={-12} />
      <Edge points={[[375, 98], [375, 122], [105, 122], [105, 140]]} noArrow />
      <Edge points={[[255, 122], [255, 140]]} noArrow />
      <Edge points={[[405, 122], [405, 140]]} />
      <Edge points={[[470, 71], [560, 71]]} label="LAN" />
      <Edge points={[[650, 98], [650, 140]]} noArrow />
      <Edge points={[[470, 165], [560, 165]]} label="음성·자막 스트림" dashed />

      {/* 배포 파이프라인 — 본인 담당 */}
      <Group x={20} y={336} w={720} h={94} label="배포 파이프라인 — 본인 담당" />
      <Node x={40} y={366} w={140} h={48} title="PyInstaller" sub="Python → backend.exe" mine />
      <Node x={220} y={366} w={150} h={48} title="electron-builder" sub="UI + 백엔드 번들" mine />
      <Node x={410} y={366} w={140} h={48} title="Inno Setup" sub="setup.exe · 디스크 체크" mine />
      <Node x={590} y={366} w={140} h={48} title="강의실 PC" sub="per-user 설치 · 17GB" mine />
      <Edge points={[[180, 390], [220, 390]]} acc />
      <Edge points={[[370, 390], [410, 390]]} acc />
      <Edge points={[[550, 390], [590, 390]]} acc />
    </Diagram>
  )
}

/** 데이터 플로우 — 발화 → 자막·음성 (팀 파이프라인), 2초 이내 */
export function BunminFlow() {
  return (
    <Diagram w={760} h={320}>
      <Group x={20} y={14} w={720} h={180} label="실시간 번역 파이프라인 — 목표 2초 이내 (팀)" />
      <Node x={40} y={60} w={110} h={48} title="마이크" sub="강사 발화" muted />
      <Node x={180} y={60} w={110} h={48} title="VAD" sub="발화 구간 검출" muted />
      <Node x={320} y={60} w={120} h={48} title="Whisper" sub="한국어 ASR" muted />
      <Node x={470} y={60} w={120} h={48} title="NLLB-200" sub="한 → 영" muted />
      <Node x={620} y={60} w={110} h={48} title="TTS" sub="영어 음성" muted />
      <Edge points={[[150, 84], [180, 84]]} />
      <Edge points={[[290, 84], [320, 84]]} />
      <Edge points={[[440, 84], [470, 84]]} label="텍스트" />
      <Edge points={[[590, 84], [620, 84]]} />
      <Node x={230} y={130} w={300} h={44} title="4채널 동기화" sub="원본 음성 · TTS · 자막 · 판서" muted />
      <Edge points={[[530, 108], [530, 130]]} noArrow />
      <Edge points={[[675, 108], [675, 152], [530, 152]]} />
      <Node x={580} y={128} w={150} h={48} title="수강자 브라우저" muted />

      <Group x={20} y={212} w={720} h={94} label="설치 데이터 — 본인 담당" />
      <Node x={40} y={242} w={160} h={48} title="setup.exe (17GB)" sub="모델 포함 단일 파일" mine />
      <Node x={250} y={242} w={170} h={48} title="per-user 설치" sub="관리자 권한 불필요" mine />
      <Node x={470} y={242} w={120} h={48} title="디스크 체크" sub="설치 전 사전 검사" mine />
      <Node x={630} y={242} w={110} h={48} title="첫 실행" sub="모델 검증" mine />
      <Edge points={[[200, 266], [250, 266]]} acc />
      <Edge points={[[420, 266], [470, 266]]} acc />
      <Edge points={[[590, 266], [630, 266]]} acc />
    </Diagram>
  )
}

/** 시퀀스 — 설치 · 첫 실행 (본인 담당) */
export function BunminSeq() {
  return (
    <Seq
      w={760}
      actors={[
        { name: '강사', muted: true },
        { name: 'setup.exe (Inno)', mine: true },
        { name: 'Electron 앱', muted: true },
        { name: 'backend.exe', mine: true },
        { name: '모델 저장소', muted: true },
      ]}
      messages={[
        { from: 0, to: 1, label: '설치 실행 (관리자 권한 없음)' },
        { from: 1, to: 1, label: '디스크 여유 공간 사전 체크 (17GB)', self: true, acc: true },
        { from: 1, to: 0, label: 'per-user 경로에 설치 완료', acc: true },
        { from: 0, to: 2, label: '앱 시작' },
        { from: 2, to: 3, label: '자식 프로세스로 백엔드 스폰', acc: true },
        { from: 3, to: 4, label: '모델 확인 · 누락분 다운로드', dashed: true },
        { from: 4, to: 3, label: '모델 파일', dashed: true },
        { from: 3, to: 3, label: '무결성 검증 · 로드', self: true, acc: true },
        { from: 3, to: 2, label: 'health OK (localhost)', acc: true },
        { from: 2, to: 0, label: '강의 시작 가능' },
      ]}
    />
  )
}
