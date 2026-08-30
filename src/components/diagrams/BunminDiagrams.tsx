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
        plates={[{ x: 0, y: 0, w: 400, d: 400, label: '강의자 PC 한 대 — 온디바이스 (서버 없음) · 2초 이내 실시간 번역' }]}
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
          { pts: [[215, 170], [215, -60], [188, -60], [188, -110]], from: 'fastapi', to: 'browser', label: '자막 · 음성 스트림', seg: 0, labelDx: 62, labelDy: 10, acc: true, flow: true },
        ]}
        boxes={[
          /* 배포 파이프라인 (본인) — 바닥판 왼쪽 위 대각선 */
          { id: 'pyinstaller', detail: '본인 — FastAPI 백엔드를 Python 미설치 PC에서도 도는 단일 실행 파일(exe)로 패키징', x: -200, y: 0, ...S, title: 'PyInstaller', sub: 'Python → 단일 exe', icon: 'python', mine: true, label: 'above' },
          { id: 'builder', detail: '본인 — Electron 앱 빌드 (UI + 백엔드 exe 번들)', x: -200, y: 120, ...S, title: 'electron-builder', sub: 'UI + 백엔드 번들', icon: 'electron', mine: true, label: 'above' },
          { id: 'inno', detail: '본인 — 17GB 모델 포함 단일 setup.exe. 관리자 권한 없는 per-user 설치, 설치 전 디스크 용량 사전 체크', x: -200, y: 240, ...S, title: 'Inno Setup', sub: '17GB setup.exe · 디스크 체크', icon: FaBoxOpen, iconColor: '#F2C94C', mine: true, label: 'above' },
          /* 강의자 PC 위 */
          { id: 'electron', detail: '팀원 담당 — 강의자 화면 UI. 로컬 FastAPI와 localhost로 통신', x: 40, y: 40, ...S, title: 'Electron 앱', sub: '강의자 화면 UI (팀원)', icon: 'electron', muted: true, label: 'above' },
          { id: 'download', detail: '본인 — 대용량 AI 모델의 다운로드 · 설치 과정을 비개발자도 통과할 수 있는 사용자 플로우로 설계 · 구현', x: 40, y: 170, ...S, title: '모델 다운로드 · 설치', sub: '첫 실행 사용자 플로우', icon: FaDownload, iconColor: '#F2F4FA', mine: true, label: 'above' },
          { id: 'fastapi', detail: '본인(일부) — 로컬에서 도는 FastAPI 서버 API 일부 구현', x: 170, y: 170, w: 90, d: 64, h: 36, title: 'FastAPI (로컬)', sub: 'PyInstaller exe · localhost', icon: 'fastapi', mine: true, label: 'below' },
          { id: 'qwen', detail: '팀원 담당 — Surya OCR → Qwen3-VL 번역으로 레이아웃을 보존한 번역 슬라이드 생성', x: 40, y: 300, ...S, title: 'Qwen3-VL', sub: 'Surya OCR → VLM 번역 (팀원)', icon: FaImage, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'whisper', detail: '팀원 담당 — VAD로 발화 구간을 끊어 Whisper 한국어 음성 인식', x: 300, y: 40, ...S, title: 'Whisper', sub: '한국어 ASR', icon: FaMicrophone, iconColor: '#C9CFE0', muted: true, label: 'right' },
          { id: 'nllb', detail: '팀원 담당 — NLLB-200 한 → 영 기계 번역', x: 300, y: 170, ...S, title: 'NLLB-200', sub: '한 → 영 번역', icon: FaLanguage, iconColor: '#C9CFE0', muted: true, label: 'right' },
          { id: 'tts', detail: '팀원 담당 — 번역문을 영어 음성으로 합성', x: 300, y: 300, ...S, title: 'TTS', sub: '영어 음성 합성', icon: FaVolumeUp, iconColor: '#C9CFE0', muted: true, label: 'right' },
          /* 수강자 브라우저 — 바닥판 오른쪽 위 */
          { id: 'browser', detail: '팀원 담당 — 자막 · TTS · 번역 슬라이드 · 판서 · 커서 스팟라이트 수신, 회선 품질에 따른 P90 적응형 딜레이', x: 160, y: -150, ...S, title: '수강자 브라우저', sub: '자막 · TTS · 번역 슬라이드', icon: FaGlobe, iconColor: '#C9CFE0', muted: true, label: 'above' },
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
          { pts: [[48, 450], [48, 540]], from: 'tts', to: 'browser', label: '자막 · 음성 · 판서 · 커서 동기화', labelDx: 96, labelDy: 2, acc: true, flow: true },
          /* 2행: 설치 데이터 (본인) */
          { pts: [[328, 60], [328, 150]], from: 'setup', to: 'peruser', label: '17GB 단일 파일', labelDx: 60, labelDy: 2, acc: true, flow: true },
          { pts: [[328, 190], [328, 280]], from: 'peruser', to: 'disk', label: '관리자 권한 불필요', labelDx: 68, labelDy: 2, acc: true, flow: true },
          { pts: [[328, 320], [328, 410]], from: 'disk', to: 'first', label: '용량 사전 체크', labelDx: 58, labelDy: 2, acc: true, flow: true },
          { pts: [[328, 450], [328, 540]], from: 'first', to: 'ready', label: '모델 다운로드 · 설치', labelDx: 64, labelDy: 2, acc: true, flow: true },
        ]}
        boxes={[
          { id: 'mic', detail: '강사 발화 — 마이크 입력을 VAD로 발화 단위로 끊어 처리', step: 1, ...row(20, 0), title: '강사 발화', sub: '마이크 입력', icon: FaMicrophone, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'asr', detail: '팀원 — Whisper 한국어 음성 인식 (partial → final)', step: 2, ...row(20, 1), title: 'Whisper', sub: '한국어 ASR', icon: FaLanguage, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'nmt', detail: '팀원 — NLLB-200 한 → 영 번역', step: 3, ...row(20, 2), title: 'NLLB-200', sub: '한 → 영 번역', icon: FaLanguage, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'tts', detail: '팀원 — 영어 음성 합성', step: 4, ...row(20, 3), title: 'TTS', sub: '영어 음성 합성', icon: FaVolumeUp, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'browser', detail: '팀원 — 자막 · TTS · 판서 · 커서를 수강자 브라우저에 동기화 (발화 → 자막 · 음성 목표 2초 이내)', step: 5, ...row(20, 4), title: '수강자 브라우저', sub: '자막 · 음성 · 슬라이드', icon: FaGlobe, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 'setup', detail: '본인 — AI 모델까지 넣은 17GB 단일 setup.exe (Inno Setup)', step: 1, ...row(300, 0), title: 'setup.exe', sub: '모델 포함 17GB', icon: FaBoxOpen, iconColor: '#F2C94C', mine: true, label: 'left' },
          { id: 'peruser', detail: '본인 — 관리자 권한 없는 강의실 PC에서도 설치되도록 per-user 설치로 전환', step: 2, ...row(300, 1), title: 'per-user 설치', sub: '강의실 PC', icon: FaDesktop, iconColor: '#F2F4FA', mine: true, label: 'left' },
          { id: 'disk', detail: '본인 — 설치 전 디스크 용량 사전 체크', step: 3, ...row(300, 2), title: '디스크 체크', sub: '설치 전 사전 체크', icon: FaHdd, iconColor: '#F2F4FA', mine: true, label: 'left' },
          { id: 'first', detail: '본인 — 첫 실행 시 AI 모델 다운로드 · 설치 사용자 플로우', step: 4, ...row(300, 3), title: '첫 실행', sub: '모델 다운로드 · 설치', icon: FaDownload, iconColor: '#F2F4FA', mine: true, label: 'left' },
          { id: 'ready', detail: '설치 → 첫 실행까지 통과하면 강의 시작', step: 5, ...row(300, 4), title: '강의 시작 가능', sub: '설치 완료', icon: FaCheck, iconColor: '#46BE8C', mine: true, label: 'left' },
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
        { name: '백엔드 exe (FastAPI)', mine: true, icon: 'python' },
        { name: '모델 다운로드', muted: true, icon: FaDatabase, iconColor: '#C9CFE0' },
      ]}
      messages={[
        { from: 0, to: 1, label: '설치 실행 (관리자 권한 없음)' },
        { from: 1, to: 1, label: '디스크 용량 사전 체크', self: true, acc: true },
        { from: 1, to: 0, label: 'per-user 설치 완료 (관리자 권한 불필요)', acc: true },
        { from: 0, to: 2, label: '앱 시작' },
        { from: 2, to: 3, label: '백엔드 exe 실행', acc: true },
        { from: 3, to: 4, label: '모델 다운로드 · 설치 플로우 (본인)', dashed: true, acc: true },
        { from: 4, to: 3, label: '모델 설치 완료', dashed: true },
        { from: 3, to: 2, label: 'localhost 응답', acc: true },
        { from: 2, to: 0, label: '강의 시작 가능' },
      ]}
    />
  )
}
