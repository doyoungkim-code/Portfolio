import { FaBoxOpen, FaCheck, FaDatabase, FaDesktop, FaDownload, FaGlobe, FaHdd, FaImage, FaLanguage, FaMicrophone, FaUser, FaVolumeUp } from 'react-icons/fa'
import { Diagram, Seq } from './primitives'
import { IsoScene } from './iso'

/** 시스템 아키텍처 (아이소메트릭) — 강의자 PC 한 장 위에서 전부 처리(온디바이스), 왼쪽은 본인 담당 배포 파이프라인 */
export function BunminArch() {
  const S = { w: 56, d: 40, h: 28 }
  return (
    <Diagram w={960} h={626}>
      <IsoScene
        origin={[500, 160]}
        plates={[{ x: 0, y: 0, w: 400, d: 400, label: '강의자 PC — 온디바이스 (서버 없음) · 관리자 권한 없는 강의실 PC' }]}
        paths={[
          /* 배포 파이프라인 (본인) → 강의실 PC에 설치 */
          { pts: [[-172, 40], [-172, 120]], from: 'pyinstaller', to: 'builder', acc: true, flow: true },
          { pts: [[-172, 160], [-172, 240]], from: 'builder', to: 'inno', acc: true, flow: true },
          { pts: [[-144, 262], [-40, 262], [-40, 192], [40, 192]], from: 'inno', to: 'download', label: 'setup.exe · per-user 설치', seg: 0, labelDx: -8, labelDy: 24, acc: true, flow: true },
          /* 앱 내부 */
          { pts: [[96, 60], [130, 60], [130, 184], [170, 184]], from: 'electron', to: 'fastapi', label: 'localhost', seg: 1, labelDx: 34, labelDy: 2 },
          { pts: [[96, 200], [170, 200]], from: 'download', to: 'fastapi', dashed: true },
          { pts: [[260, 186], [280, 186], [280, 62], [300, 62]], from: 'fastapi', to: 'whisper' },
          { pts: [[260, 200], [300, 200]], from: 'fastapi', to: 'nllb' },
          { pts: [[230, 234], [230, 322], [300, 322]], from: 'fastapi', to: 'tts' },
          /* 수강자 브라우저 (LAN) */
          { pts: [[215, 170], [215, -60], [188, -60], [188, -110]], from: 'fastapi', to: 'browser', label: 'LAN · WebSocket', seg: 0, labelDx: 58, labelDy: 10, acc: true, flow: true },
        ]}
        boxes={[
          /* 배포 파이프라인 (본인) — 바닥판 왼쪽 위 대각선 */
          { id: 'pyinstaller', detail: '본인 — Python 백엔드 전체를 단일 backend.exe로 (숨은 import · 모델 경로 처리)', x: -200, y: 0, ...S, title: 'PyInstaller', sub: 'Python → backend.exe', icon: 'python', mine: true, label: 'above' },
          { id: 'builder', detail: '본인 — Electron UI와 backend.exe를 하나의 앱으로 번들', x: -200, y: 120, ...S, title: 'electron-builder', sub: 'UI + 백엔드 번들', icon: 'electron', mine: true, label: 'above' },
          { id: 'inno', detail: '본인 — 17GB 모델을 포함한 단일 setup.exe. 설치 전 디스크 여유 공간 체크, 관리자 권한 없는 per-user 설치', x: -200, y: 240, ...S, title: 'Inno Setup', sub: '17GB setup.exe · 디스크 체크', icon: FaBoxOpen, iconColor: '#F2C94C', mine: true, label: 'above' },
          /* 강의자 PC 위 */
          { id: 'electron', detail: '팀원 담당 — React UI, 강의자 화면. 시작 시 backend.exe를 자식 프로세스로 스폰', x: 40, y: 40, ...S, title: 'Electron 앱', sub: 'React UI · 강의자 화면 (팀원)', icon: 'electron', muted: true, label: 'above' },
          { id: 'download', detail: '본인 — 설치 후 첫 실행 시 모델 존재 · 무결성 검증 → 로드. 비개발자도 통과할 수 있는 플로우', x: 40, y: 170, ...S, title: '모델 다운로드 · 검증', sub: '첫 실행 시 모델 검증 → 로드', icon: FaDownload, iconColor: '#F2F4FA', mine: true, label: 'above' },
          { id: 'fastapi', detail: '본인(일부) — 로컬 FastAPI 서버. Electron과 localhost로 통신, AI 모델 호출', x: 170, y: 170, w: 90, d: 64, h: 36, title: 'FastAPI (로컬)', sub: 'PyInstaller exe · 자식 프로세스', icon: 'fastapi', mine: true, label: 'below' },
          { id: 'qwen', detail: '팀원 담당 — 강의 슬라이드 OCR · 번역 (VLM)', x: 40, y: 300, ...S, title: 'Qwen3-VL', sub: '슬라이드 OCR · 번역 (팀원)', icon: FaImage, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'whisper', detail: '팀원 담당 — 한국어 ASR (CTranslate2 int8)', x: 300, y: 40, ...S, title: 'Whisper', sub: 'ASR · CT2 int8', icon: FaMicrophone, iconColor: '#C9CFE0', muted: true, label: 'right' },
          { id: 'nllb', detail: '팀원 담당 — 한 → 영 번역', x: 300, y: 170, ...S, title: 'NLLB-200', sub: '한 → 영 번역', icon: FaLanguage, iconColor: '#C9CFE0', muted: true, label: 'right' },
          { id: 'tts', detail: '팀원 담당 — 영어 음성 합성', x: 300, y: 300, ...S, title: 'TTS', sub: '영어 음성 합성', icon: FaVolumeUp, iconColor: '#C9CFE0', muted: true, label: 'right' },
          /* 수강자 브라우저 — 바닥판 오른쪽 위 */
          { id: 'browser', detail: '팀원 담당 — LAN으로 자막 · TTS · 번역 슬라이드 · 판서 4채널 수신', x: 160, y: -150, ...S, title: '수강자 브라우저', sub: '자막 · TTS · 번역 슬라이드', icon: FaGlobe, iconColor: '#C9CFE0', muted: true, label: 'above' },
        ]}
        captionAt={[-480, 450]}
      />
    </Diagram>
  )
}

/** 데이터 플로우 (아이소메트릭) — 한 바닥판 위 두 줄: 실시간 번역 파이프라인(팀) / 설치 데이터(본인) */
export function BunminFlow() {
  const S = { w: 56, d: 40, h: 26 }
  /* 두 줄이 y축(왼쪽 아래 방향)으로 흐른다 — 상자 라벨은 왼쪽(빈 공간), 경로 라벨은 오른쪽 */
  const row = (x: number, i: number) => ({ x, y: 20 + i * 130, ...S })
  return (
    <Diagram w={1000} h={530}>
      <IsoScene
        origin={[640, 30]}
        plates={[{ x: 0, y: 0, w: 360, d: 600, label: '' }]}
        paths={[
          /* 1행: 실시간 번역 (팀) */
          { pts: [[48, 60], [48, 150]], from: 'mic', to: 'asr', label: 'VAD 발화 구간', labelDx: 58, labelDy: 2 },
          { pts: [[48, 190], [48, 280]], from: 'asr', to: 'nmt', label: '한국어 텍스트', labelDx: 56, labelDy: 2 },
          { pts: [[48, 320], [48, 410]], from: 'nmt', to: 'tts', label: '영어 텍스트', labelDx: 52, labelDy: 2 },
          { pts: [[48, 450], [48, 540]], from: 'tts', to: 'browser', label: '음성 · 자막 · 판서 4채널', labelDx: 84, labelDy: 2, acc: true, flow: true },
          /* 2행: 설치 데이터 (본인) */
          { pts: [[328, 60], [328, 150]], from: 'setup', to: 'peruser', label: '17GB 단일 파일', labelDx: 60, labelDy: 2, acc: true, flow: true },
          { pts: [[328, 190], [328, 280]], from: 'peruser', to: 'disk', label: '관리자 권한 불필요', labelDx: 68, labelDy: 2, acc: true, flow: true },
          { pts: [[328, 320], [328, 410]], from: 'disk', to: 'first', label: '용량 사전 검사', labelDx: 58, labelDy: 2, acc: true, flow: true },
          { pts: [[328, 450], [328, 540]], from: 'first', to: 'ready', label: '모델 검증 → 로드', labelDx: 62, labelDy: 2, acc: true, flow: true },
        ]}
        boxes={[
          { id: 'mic', detail: '강사 발화 — 마이크 입력, VAD로 발화 구간 검출', step: 1, ...row(20, 0), title: '강사 발화', sub: '마이크 입력', icon: FaMicrophone, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'asr', detail: '팀원 — Whisper 한국어 ASR', step: 2, ...row(20, 1), title: 'Whisper', sub: '한국어 ASR', icon: FaLanguage, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'nmt', detail: '팀원 — NLLB-200 한 → 영', step: 3, ...row(20, 2), title: 'NLLB-200', sub: '한 → 영 번역', icon: FaLanguage, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'tts', detail: '팀원 — 영어 TTS', step: 4, ...row(20, 3), title: 'TTS', sub: '영어 음성 합성', icon: FaVolumeUp, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'browser', detail: '팀원 — 원본 음성 · TTS · 자막 · 판서 4채널을 수강자 브라우저에 동기화 (목표 2초 이내)', step: 5, ...row(20, 4), title: '수강자 브라우저', sub: '자막 · 음성 · 슬라이드', icon: FaGlobe, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'setup', detail: '본인 — 모델까지 넣은 17GB 단일 setup.exe (Inno Setup)', step: 1, ...row(300, 0), title: 'setup.exe', sub: '모델 포함 17GB', icon: FaBoxOpen, iconColor: '#F2C94C', mine: true, label: 'left' },
          { id: 'peruser', detail: '본인 — 관리자 권한 없는 강의실 PC에 per-user 설치', step: 2, ...row(300, 1), title: 'per-user 설치', sub: '강의실 PC', icon: FaDesktop, iconColor: '#F2F4FA', mine: true, label: 'left' },
          { id: 'disk', detail: '본인 — 설치 전 디스크 여유 공간 사전 검사', step: 3, ...row(300, 2), title: '디스크 체크', sub: '설치 전 사전 검사', icon: FaHdd, iconColor: '#F2F4FA', mine: true, label: 'left' },
          { id: 'first', detail: '본인 — 첫 실행 시 모델 존재 · 무결성 검증 → 로드', step: 4, ...row(300, 3), title: '첫 실행', sub: '모델 검증', icon: FaDownload, iconColor: '#F2F4FA', mine: true, label: 'left' },
          { id: 'ready', detail: '본인 — backend health OK → 강의 시작 가능', step: 5, ...row(300, 4), title: '강의 시작 가능', sub: 'health OK', icon: FaCheck, iconColor: '#46BE8C', mine: true, label: 'left' },
        ]}
        captionAt={[-620, 484]}
      />
      {/* 행 태그 — 각 줄의 앞쪽(왼쪽 아래) 끝 */}
      <text className="iso-plate__label" x={640 + (48 - 600) * 0.866} y={30 + (48 + 600) * 0.5 + 4} textAnchor="middle">실시간 번역 · 2초 이내 (팀)</text>
      <text className="iso-plate__label" x={640 + (328 - 600) * 0.866} y={30 + (328 + 600) * 0.5 + 4} textAnchor="middle">설치 → 첫 실행 (본인)</text>
    </Diagram>
  )
}

/** 시퀀스 — 설치 · 첫 실행 (본인 담당) */
export function BunminSeq() {
  return (
    <Seq
      w={760}
      actors={[
        { name: '강사', muted: true, icon: FaUser, iconColor: '#C9CFE0' },
        { name: 'setup.exe (Inno)', mine: true, icon: FaBoxOpen, iconColor: '#F2C94C' },
        { name: 'Electron 앱', muted: true, icon: 'electron' },
        { name: 'backend.exe', mine: true, icon: 'python' },
        { name: '모델 저장소', muted: true, icon: FaDatabase, iconColor: '#C9CFE0' },
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
