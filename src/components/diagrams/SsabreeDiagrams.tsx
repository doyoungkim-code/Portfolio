import { Diagram, Edge, Group, Node, Seq } from './primitives'

/** 시스템 아키텍처 — EC2 한 대에 Docker로 전부, 본인 담당은 강조 */
export function SsabreeArch() {
  return (
    <Diagram w={760} h={430}>
      {/* 클라이언트 */}
      <Node x={40} y={16} w={150} h={50} title="Android 앱" sub="Kotlin · Compose (팀원)" muted />
      <Node x={210} y={16} w={150} h={50} title="iOS 앱" sub="SwiftUI (팀원)" muted />
      <Node x={380} y={16} w={150} h={50} title="Web" sub="React (팀원)" muted />

      {/* 서버 그룹 */}
      <Group x={110} y={110} w={470} h={304} label="AWS EC2 · DOCKER COMPOSE" />
      <Node x={250} y={134} w={190} h={52} title="Nginx" sub="리버스 프록시 · WebSocket Upgrade" mine />
      <Node x={200} y={228} w={290} h={60} title="Spring Boot API" sub="Security(JWT) · JPA · STOMP · FCM" mine />
      <Node x={140} y={340} w={170} h={52} title="PostgreSQL" sub="15+ 엔티티 · Soft Delete" mine />
      <Node x={380} y={340} w={170} h={52} title="Redis" sub="HOT 캐시 · Sorted Set" mine />

      {/* 외부 */}
      <Node x={610} y={134} w={130} h={48} title="Mattermost" sub="본인 인증" muted />
      <Node x={610} y={234} w={130} h={48} title="Firebase FCM" sub="푸시" muted />
      <Node x={610} y={342} w={130} h={48} title="solved.ac" sub="포트폴리오 연동" muted />

      {/* 흐름 */}
      <Edge points={[[115, 66], [115, 100], [300, 100], [300, 134]]} label="HTTPS · WSS" labelDy={-6} />
      <Edge points={[[285, 66], [285, 134]]} noArrow />
      <Edge points={[[455, 66], [455, 100], [390, 100], [390, 134]]} noArrow />
      <Edge points={[[345, 186], [345, 228]]} label="proxy_pass" labelDx={44} labelDy={4} />
      <Edge points={[[270, 288], [225, 340]]} label="JPA" labelDx={-22} labelDy={0} />
      <Edge points={[[420, 288], [465, 340]]} label="Lettuce" labelDx={30} labelDy={0} />
      <Edge points={[[490, 244], [610, 244]]} label="REST" labelDy={-6} />
      <Edge points={[[490, 258], [560, 258], [560, 158], [610, 158]]} label="로그인 검증" labelDx={-40} labelDy={-6} dashed />
      <Edge points={[[490, 270], [580, 270], [580, 366], [610, 366]]} dashed />
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
