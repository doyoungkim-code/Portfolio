import { FaTrophy } from 'react-icons/fa'
import { SiAndroid, SiApple, SiFirebase, SiMattermost, SiReact } from 'react-icons/si'
import { Diagram, Edge, Group, Node, Seq } from './primitives'
import { IsoScene } from './iso'

/** 시스템 아키텍처 (아이소메트릭) — EC2 한 장 위의 Docker 컨테이너 4개, 클라이언트 3종, 외부 연동 3개 */
export function SsabreeArch() {
  const S = { w: 56, d: 40, h: 28 }
  const C = { w: 56, d: 40, h: 20 }
  return (
    <Diagram w={760} h={500}>
      <IsoScene
        origin={[380, 140]}
        plates={[{ x: 0, y: 0, w: 320, d: 320, label: 'AWS EC2 · DOCKER COMPOSE — 본인 구축 · 운영' }]}
        paths={[
          /* 클라이언트 3종 → 한 갈래로 모여 Nginx (HTTPS · WSS) */
          { pts: [[-94, 40], [-40, 40], [-40, 60], [40, 60]], flow: true },
          { pts: [[-94, 140], [-40, 140], [-40, 60]], label: 'HTTPS · WSS', seg: 1, labelDx: -46, labelDy: 4, noArrow: true },
          { pts: [[-94, 240], [-40, 240], [-40, 60]], noArrow: true },
          /* 내부 */
          { pts: [[68, 80], [68, 162], [130, 162]], label: 'proxy_pass', seg: 0, labelDx: -40, labelDy: 4 },
          { pts: [[175, 194], [175, 260], [116, 260]], label: 'JPA', seg: 1, labelDy: 16 },
          { pts: [[220, 162], [268, 162], [268, 100]], label: 'Lettuce', seg: 0, labelDx: 24, labelDy: 18 },
          /* 외부 연동 — Spring 뒤쪽에서 나가 오른쪽 상단 카드로 */
          { pts: [[150, 130], [150, -40], [48, -40], [48, -110]], label: '로그인 검증', seg: 1, labelDx: -30, labelDy: 40, dashed: true },
          { pts: [[175, 130], [175, -60], [148, -60], [148, -110]], label: 'FCM 푸시', seg: 0, labelDx: 44, labelDy: -6, acc: true, flow: true },
          { pts: [[200, 130], [200, -80], [248, -80], [248, -110]], dashed: true },
        ]}
        boxes={[
          /* 클라이언트 (팀원) — 바닥판 왼쪽 위 대각선 */
          { id: 'android', x: -150, y: 20, ...C, title: 'Android 앱', sub: 'Kotlin · Compose (팀원)', icon: SiAndroid, iconColor: '#3DDC84', muted: true, label: 'above' },
          { id: 'ios', x: -150, y: 120, ...C, title: 'iOS 앱', sub: 'SwiftUI (팀원)', icon: SiApple, iconColor: '#E8EAF0', muted: true, label: 'above' },
          { id: 'web', x: -150, y: 220, ...C, title: 'Web', sub: 'React (팀원)', icon: SiReact, iconColor: '#61DAFB', muted: true, label: 'above' },
          /* EC2 위 컨테이너 (본인) */
          { id: 'nginx', x: 40, y: 40, ...S, title: 'Nginx', sub: '리버스 프록시 · WebSocket Upgrade', icon: 'nginx', mine: true, label: 'above' },
          { id: 'spring', x: 130, y: 130, w: 90, d: 64, h: 36, title: 'Spring Boot API', sub: 'Security(JWT) · JPA · STOMP · FCM', icon: 'spring', mine: true, label: 'below' },
          { id: 'postgres', x: 60, y: 240, ...S, title: 'PostgreSQL', sub: '15+ 엔티티 · Soft Delete', icon: 'postgres', mine: true, label: 'left' },
          { id: 'redis', x: 240, y: 60, ...S, title: 'Redis', sub: 'HOT 캐시 · Sorted Set', icon: 'redis', mine: true, label: 'right' },
          /* 외부 연동 (본인) — 바닥판 오른쪽 위 대각선 */
          { id: 'mattermost', x: 20, y: -150, ...C, title: 'Mattermost', sub: 'SSAFY 본인 인증', icon: SiMattermost, iconColor: '#4A8CFF', mine: true, label: 'above' },
          { id: 'fcm', x: 120, y: -150, ...C, title: 'Firebase FCM', sub: '푸시 알림', icon: SiFirebase, iconColor: '#FFCA28', mine: true, label: 'above' },
          { id: 'solvedac', x: 220, y: -150, ...C, title: 'solved.ac', sub: '포트폴리오 연동', icon: FaTrophy, iconColor: '#FFB020', mine: true, label: 'above' },
        ]}
      />
    </Diagram>
  )
}

/** 데이터 플로우 — HOT 게시판 캐시 & 인기 검색어 */
export function SsabreeFlow() {
  return (
    <Diagram w={760} h={330}>
      <Group x={20} y={14} w={720} h={160} label="HOT 게시판 조회 — LOOK-ASIDE 캐시 (TTL 3분)" />
      <Node x={40} y={60} w={120} h={48} title="클라이언트" sub="GET /hot" muted />
      <Node x={200} y={60} w={130} h={48} title="Spring API" mine />
      <Node x={370} y={60} w={120} h={48} title="Redis" sub="캐시 확인" mine />
      <Node x={540} y={60} w={180} h={48} title="PostgreSQL" sub="좋아요·조회수 집계 쿼리" mine />
      <Edge points={[[160, 84], [200, 84]]} />
      <Edge points={[[330, 84], [370, 84]]} label="GET hot" />
      <Edge points={[[490, 84], [540, 84]]} label="miss" dashed />
      <Edge points={[[630, 108], [630, 140], [430, 140]]} label="SETEX 3분 후 응답" labelDy={12} dashed />
      <Edge points={[[430, 108], [430, 126], [265, 126], [265, 108]]} label="hit → 즉시 응답" labelDy={12} acc />

      <Group x={20} y={192} w={720} h={124} label="인기 검색어 — REDIS SORTED SET" />
      <Node x={40} y={236} w={120} h={48} title="검색 요청" sub="q=키워드" muted />
      <Node x={200} y={236} w={130} h={48} title="Spring API" mine />
      <Node x={370} y={236} w={170} h={48} title="ZINCRBY trending" sub="O(log N) 점수 증가" mine />
      <Node x={580} y={236} w={140} h={48} title="ZREVRANGE 0 9" sub="상위 10개 랭킹" mine />
      <Edge points={[[160, 260], [200, 260]]} />
      <Edge points={[[330, 260], [370, 260]]} />
      <Edge points={[[540, 260], [580, 260]]} label="조회 시" />
    </Diagram>
  )
}

/** 시퀀스 — 실시간 쪽지 (WebSocket STOMP) */
export function SsabreeSeq() {
  return (
    <Seq
      w={760}
      actors={[
        { name: '폰 A', muted: true },
        { name: 'Nginx', mine: true },
        { name: 'Spring · STOMP', mine: true },
        { name: '폰 B', muted: true },
        { name: 'FCM', muted: true },
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
