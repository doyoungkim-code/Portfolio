import { FaBoxOpen, FaDownload, FaGlobe, FaImage, FaLanguage, FaMicrophone, FaVolumeUp } from 'react-icons/fa'
import { Diagram, Edge, Group, Node, Seq } from './primitives'
import { IsoScene } from './iso'

/** 시스템 아키텍처 (아이소메트릭) — 강의자 PC 한 장 위에서 전부 처리(온디바이스), 왼쪽은 본인 담당 배포 파이프라인 */
export function BunminArch() {
  const S = { w: 56, d: 40, h: 28 }
  return (
    <Diagram w={960} h={600}>
      <IsoScene
        origin={[500, 160]}
        plates={[{ x: 0, y: 0, w: 400, d: 400, label: '강의자 PC — 온디바이스 (서버 없음) · 관리자 권한 없는 강의실 PC' }]}
        paths={[
          /* 배포 파이프라인 (본인) → 강의실 PC에 설치 */
          { pts: [[-172, 40], [-172, 120]], acc: true, flow: true },
          { pts: [[-172, 160], [-172, 240]], acc: true, flow: true },
          { pts: [[-144, 262], [-40, 262], [-40, 192], [40, 192]], label: 'setup.exe · per-user 설치', seg: 0, labelDx: -8, labelDy: 24, acc: true, flow: true },
          /* 앱 내부 */
          { pts: [[96, 60], [130, 60], [130, 184], [170, 184]], label: 'localhost', seg: 1, labelDx: 34, labelDy: 2 },
          { pts: [[96, 200], [170, 200]], dashed: true },
          { pts: [[260, 186], [280, 186], [280, 62], [300, 62]] },
          { pts: [[260, 200], [300, 200]] },
          { pts: [[230, 234], [230, 322], [300, 322]] },
          /* 수강자 브라우저 (LAN) */
          { pts: [[215, 170], [215, -60], [188, -60], [188, -110]], label: 'LAN · WebSocket', seg: 0, labelDx: 58, labelDy: 10, acc: true, flow: true },
        ]}
        boxes={[
          /* 배포 파이프라인 (본인) — 바닥판 왼쪽 위 대각선 */
          { id: 'pyinstaller', x: -200, y: 0, ...S, title: 'PyInstaller', sub: 'Python → backend.exe', icon: 'python', mine: true, label: 'above' },
          { id: 'builder', x: -200, y: 120, ...S, title: 'electron-builder', sub: 'UI + 백엔드 번들', icon: 'electron', mine: true, label: 'above' },
          { id: 'inno', x: -200, y: 240, ...S, title: 'Inno Setup', sub: '17GB setup.exe · 디스크 체크', icon: FaBoxOpen, iconColor: '#F2C94C', mine: true, label: 'above' },
          /* 강의자 PC 위 */
          { id: 'electron', x: 40, y: 40, ...S, title: 'Electron 앱', sub: 'React UI · 강의자 화면 (팀원)', icon: 'electron', muted: true, label: 'above' },
          { id: 'download', x: 40, y: 170, ...S, title: '모델 다운로드 · 검증', sub: '첫 실행 시 모델 검증 → 로드', icon: FaDownload, iconColor: '#F2F4FA', mine: true, label: 'above' },
          { id: 'fastapi', x: 170, y: 170, w: 90, d: 64, h: 36, title: 'FastAPI (로컬)', sub: 'PyInstaller exe · 자식 프로세스', icon: 'fastapi', mine: true, label: 'below' },
          { id: 'qwen', x: 40, y: 300, ...S, title: 'Qwen3-VL', sub: '슬라이드 OCR · 번역 (팀원)', icon: FaImage, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'whisper', x: 300, y: 40, ...S, title: 'Whisper', sub: 'ASR · CT2 int8', icon: FaMicrophone, iconColor: '#C9CFE0', muted: true, label: 'right' },
          { id: 'nllb', x: 300, y: 170, ...S, title: 'NLLB-200', sub: '한 → 영 번역', icon: FaLanguage, iconColor: '#C9CFE0', muted: true, label: 'right' },
          { id: 'tts', x: 300, y: 300, ...S, title: 'TTS', sub: '영어 음성 합성', icon: FaVolumeUp, iconColor: '#C9CFE0', muted: true, label: 'right' },
          /* 수강자 브라우저 — 바닥판 오른쪽 위 */
          { id: 'browser', x: 160, y: -150, ...S, title: '수강자 브라우저', sub: '자막 · TTS · 번역 슬라이드', icon: FaGlobe, iconColor: '#C9CFE0', muted: true, label: 'above' },
        ]}
      />
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
