import { FaMobileAlt, FaSearch, FaTrophy } from 'react-icons/fa'
import { SiAndroid, SiApple, SiFirebase, SiMattermost, SiReact } from 'react-icons/si'
import { Diagram, Seq } from './primitives'
import { IsoScene } from './iso'

/** 시스템 아키텍처 (아이소메트릭) — EC2 한 장 위의 Docker 컨테이너 4개, 클라이언트 3종, 외부 연동 3개 */
export function SsabreeArch() {
  const S = { w: 56, d: 40, h: 28 }
  const C = { w: 56, d: 40, h: 20 }
  return (
    <Diagram w={760} h={526}>
      <IsoScene
        origin={[380, 140]}
        plates={[{ x: 0, y: 0, w: 320, d: 320, label: 'AWS EC2 · DOCKER COMPOSE — 본인 구축 · 운영' }]}
        paths={[
          /* 클라이언트 3종 → 한 갈래로 모여 Nginx (HTTPS · WSS) */
          { pts: [[-94, 40], [-40, 40], [-40, 60], [40, 60]], from: 'android', to: 'nginx', flow: true },
          { pts: [[-94, 140], [-40, 140], [-40, 60]], from: 'ios', to: 'nginx', label: 'HTTPS · WSS', seg: 1, labelDx: -46, labelDy: 4, noArrow: true },
          { pts: [[-94, 240], [-40, 240], [-40, 60]], from: 'web', to: 'nginx', noArrow: true },
          /* 내부 */
          { pts: [[68, 80], [68, 162], [130, 162]], from: 'nginx', to: 'spring', label: 'proxy_pass', seg: 0, labelDx: -40, labelDy: 4 },
          { pts: [[175, 194], [175, 260], [116, 260]], from: 'spring', to: 'postgres', label: 'JPA', seg: 1, labelDy: 16 },
          { pts: [[220, 162], [268, 162], [268, 100]], from: 'spring', to: 'redis', label: 'Lettuce', seg: 0, labelDx: 24, labelDy: 18 },
          /* 외부 연동 — Spring 뒤쪽에서 나가 오른쪽 상단 카드로 */
          { pts: [[150, 130], [150, -40], [48, -40], [48, -110]], from: 'spring', to: 'mattermost', label: '로그인 검증', seg: 1, labelDx: -30, labelDy: 40, dashed: true },
          { pts: [[175, 130], [175, -60], [148, -60], [148, -110]], from: 'spring', to: 'fcm', label: 'FCM 푸시', seg: 0, labelDx: 44, labelDy: -6, acc: true, flow: true },
          { pts: [[200, 130], [200, -80], [248, -80], [248, -110]], from: 'spring', to: 'solvedac', dashed: true },
        ]}
        boxes={[
          /* 클라이언트 (팀원) — 바닥판 왼쪽 위 대각선 */
          { id: 'android', detail: '팀원 담당 — Kotlin · Compose. 세 클라이언트가 같은 REST · WebSocket API를 사용', x: -150, y: 20, ...C, title: 'Android 앱', sub: 'Kotlin · Compose (팀원)', icon: SiAndroid, iconColor: '#3DDC84', muted: true, label: 'above' },
          { id: 'ios', detail: '팀원 담당 — SwiftUI. 원스토어 · 앱스토어 출시 후 150명 이상 사용', x: -150, y: 120, ...C, title: 'iOS 앱', sub: 'SwiftUI (팀원)', icon: SiApple, iconColor: '#E8EAF0', muted: true, label: 'above' },
          { id: 'web', detail: '팀원 담당 — React 웹 클라이언트', x: -150, y: 220, ...C, title: 'Web', sub: 'React (팀원)', icon: SiReact, iconColor: '#61DAFB', muted: true, label: 'above' },
          /* EC2 위 컨테이너 (본인) */
          { id: 'nginx', detail: '본인 — Docker 컨테이너. 리버스 프록시 · HTTPS 종단 · WebSocket Upgrade 헤더 전달', x: 40, y: 40, ...S, title: 'Nginx', sub: '리버스 프록시 · WebSocket Upgrade', icon: 'nginx', mine: true, label: 'above' },
          { id: 'spring', detail: '본인 — Spring Boot · Security(JWT Access 30분 + Refresh 1년) · JPA · STOMP 채팅 · FCM — 20+ 도메인 API', x: 130, y: 130, w: 90, d: 64, h: 36, title: 'Spring Boot API', sub: 'Security(JWT) · JPA · STOMP · FCM', icon: 'spring', mine: true, label: 'below' },
          { id: 'postgres', detail: '본인(공동 설계) — 15+ 엔티티, 댓글 트리 Soft Delete, 커서 기반 페이지네이션', x: 60, y: 240, ...S, title: 'PostgreSQL', sub: '15+ 엔티티 · Soft Delete', icon: 'postgres', mine: true, label: 'left' },
          { id: 'redis', detail: '본인 — HOT 게시판 look-aside 캐시(TTL 3분), 인기 검색어 Sorted Set 랭킹', x: 240, y: 60, ...S, title: 'Redis', sub: 'HOT 캐시 · Sorted Set', icon: 'redis', mine: true, label: 'right' },
          /* 외부 연동 (본인) — 바닥판 오른쪽 위 대각선 */
          { id: 'mattermost', detail: '본인 — SSAFY Mattermost 로그인으로 교육생 본인 인증', x: 20, y: -150, ...C, title: 'Mattermost', sub: 'SSAFY 본인 인증', icon: SiMattermost, iconColor: '#4A8CFF', mine: true, label: 'above' },
          { id: 'fcm', detail: '본인 — Firebase Admin SDK, 이벤트별 푸시를 @Async로 비동기 전송', x: 120, y: -150, ...C, title: 'Firebase FCM', sub: '푸시 알림', icon: SiFirebase, iconColor: '#FFCA28', mine: true, label: 'above' },
          { id: 'solvedac', detail: '본인 — solved.ac 티어 · 문제 수를 포트폴리오에 연동', x: 220, y: -150, ...C, title: 'solved.ac', sub: '포트폴리오 연동', icon: FaTrophy, iconColor: '#FFB020', mine: true, label: 'above' },
        ]}
        captionAt={[-360, 372]}
      />
    </Diagram>
  )
}

/** 데이터 플로우 (아이소메트릭) — 한 바닥판 위 두 줄: HOT 게시판 look-aside 캐시 / 인기 검색어 Sorted Set */
export function SsabreeFlow() {
  const S = { w: 56, d: 40, h: 26 }
  /* 두 줄이 y축(왼쪽 아래 방향)으로 흐른다 — 상자 라벨은 왼쪽(빈 공간), 경로 라벨은 오른쪽 */
  const row = (x: number, i: number) => ({ x, y: 20 + i * 130, ...S })
  return (
    <Diagram w={880} h={480}>
      <IsoScene
        origin={[520, 30]}
        plates={[{ x: 0, y: 0, w: 360, d: 470, label: '' }]}
        paths={[
          /* 1행: HOT 게시판 조회 — look-aside */
          { pts: [[48, 60], [48, 150]], from: 'c1', to: 's1', label: 'GET /hot', labelDx: 42, labelDy: 2 },
          { pts: [[48, 190], [48, 280]], from: 's1', to: 'r1', label: '캐시 확인', labelDx: 44, labelDy: 2 },
          { pts: [[48, 320], [48, 410]], from: 'r1', to: 'p1', label: 'miss → 집계 쿼리', labelDx: 64, labelDy: 2, dashed: true },
          { pts: [[76, 432], [98, 432], [98, 302], [76, 302]], from: 'p1', to: 'r1', label: 'SETEX · TTL 3분', seg: 1, labelDx: 54, labelDy: 2, dashed: true },
          { pts: [[76, 308], [114, 308], [114, 172], [76, 172]], from: 'r1', to: 's1', label: 'hit → 즉시 응답', seg: 1, labelDx: 62, labelDy: 2, acc: true, flow: true },
          /* 2행: 인기 검색어 — Sorted Set */
          { pts: [[328, 60], [328, 150]], from: 'c2', to: 's2', label: 'q=키워드', labelDx: 42, labelDy: 2 },
          { pts: [[328, 190], [328, 280]], from: 's2', to: 'z1', label: 'ZINCRBY trending', labelDx: 66, labelDy: 2, acc: true, flow: true },
          { pts: [[328, 320], [328, 410]], from: 'z1', to: 'z2', label: 'ZREVRANGE 0 9', labelDx: 60, labelDy: 2 },
        ]}
        boxes={[
          { id: 'c1', detail: 'HOT 게시판을 열면 GET /hot 요청', step: 1, ...row(20, 0), title: '클라이언트', sub: 'HOT 게시판 진입', icon: FaMobileAlt, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 's1', detail: '본인 — 캐시를 먼저 보고(look-aside), 없을 때만 DB 집계', step: 2, ...row(20, 1), title: 'Spring API', sub: 'look-aside 캐시', icon: 'spring', mine: true, label: 'left' },
          { id: 'r1', detail: '본인 — 3분 TTL. hit면 DB를 건드리지 않고 즉시 응답', step: 3, ...row(20, 2), title: 'Redis', sub: '캐시 hit / miss', icon: 'redis', mine: true, label: 'left' },
          { id: 'p1', detail: '본인 — miss일 때만 좋아요 · 조회수 집계 쿼리 → 결과를 SETEX', step: 4, ...row(20, 3), title: 'PostgreSQL', sub: '좋아요 · 조회수 집계', icon: 'postgres', mine: true, label: 'left' },
          { id: 'c2', detail: '게시판 검색 요청 q=키워드', step: 1, ...row(300, 0), title: '검색 요청', sub: '게시판 검색', icon: FaSearch, iconColor: '#C9CFE0', muted: true, label: 'left' },
          { id: 's2', detail: '본인 — 검색 처리 후 키워드 점수를 1 올림', step: 2, ...row(300, 1), title: 'Spring API', sub: '검색 + 점수 증가', icon: 'spring', mine: true, label: 'left' },
          { id: 'z1', detail: '본인 — Redis Sorted Set: ZINCRBY O(log N), 순위 유지', step: 3, ...row(300, 2), title: 'Redis Sorted Set', sub: 'O(log N) 점수 증가', icon: 'redis', mine: true, label: 'left' },
          { id: 'z2', detail: '본인 — ZREVRANGE 0 9로 상위 10개를 실시간 반환', step: 4, ...row(300, 3), title: '인기 검색어 TOP 10', sub: '실시간 랭킹 응답', icon: FaTrophy, iconColor: '#FFB020', mine: true, label: 'left' },
        ]}
        captionAt={[-500, 434]}
      />
      {/* 행 태그 — 각 줄의 앞쪽(왼쪽 아래) 끝 */}
      <text className="iso-plate__label" x={520 + (48 - 470) * 0.866} y={30 + (48 + 470) * 0.5 + 4} textAnchor="middle">HOT 게시판 캐시 · TTL 3분</text>
      <text className="iso-plate__label" x={520 + (328 - 470) * 0.866} y={30 + (328 + 470) * 0.5 + 4} textAnchor="middle">인기 검색어 랭킹 · SORTED SET</text>
    </Diagram>
  )
}

/** 시퀀스 — 실시간 쪽지 (WebSocket STOMP) */
export function SsabreeSeq() {
  return (
    <Seq
      w={760}
      actors={[
        { name: '폰 A', muted: true, icon: FaMobileAlt, iconColor: '#C9CFE0' },
        { name: 'Nginx', mine: true, icon: 'nginx' },
        { name: 'Spring · STOMP', mine: true, icon: 'spring' },
        { name: '폰 B', muted: true, icon: FaMobileAlt, iconColor: '#C9CFE0' },
        { name: 'FCM', muted: true, icon: SiFirebase, iconColor: '#FFCA28' },
      ]}
      messages={[
        { from: 0, to: 1, label: 'HTTP Upgrade: websocket' },
        { from: 1, to: 2, label: 'proxy_pass (Upgrade · Connection 헤더 전달)' },
        { from: 0, to: 2, label: 'CONNECT { Authorization: Bearer JWT }' },
        { from: 2, to: 2, label: 'ChannelInterceptor — JWT 검증 · 사용자 바인딩', self: true, acc: true },
        { from: 0, to: 2, label: 'SUBSCRIBE /topic/room.7' },
        { from: 3, to: 2, label: 'SUBSCRIBE /topic/room.7', dashed: true },
        { from: 0, to: 2, label: 'SEND /app/chat.7 { text }' },
        { from: 2, to: 2, label: '메시지 저장 (PostgreSQL)', self: true },
        { from: 2, to: 3, label: 'MESSAGE /topic/room.7 → 즉시 동기화', acc: true },
        { from: 2, to: 4, label: '@Async 푸시 (B 오프라인 시)', dashed: true },
        { from: 4, to: 3, label: '헤드업 알림', dashed: true },
      ]}
    />
  )
}
