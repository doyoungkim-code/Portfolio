export interface EtcProject {
  name: string
  desc: string
  stack: string
  url: string
}

/** GitHub 프로필 README의 Etc. 목록 (원문 기준) */
export const etcProjects: EtcProject[] = [
  {
    name: 'Cube Scheduler',
    desc: '3D 방 컨셉의 데스크탑 스케줄러',
    stack: 'Electron · React · Three.js',
    url: 'https://github.com/doyoungkim-code/cube_scheduler',
  },
  {
    name: 'Participatory Audiobook',
    desc: '웹캠 동작 인식 기반 아동용 참여형 오디오북',
    stack: 'MediaPipe · OpenCV',
    url: 'https://github.com/doyoungkim-code/Participatory_Audiobook_Project',
  },
  {
    name: 'MyTistorySkin',
    desc: '자체 제작 데스크탑 스타일 블로그 스킨',
    stack: 'HTML · CSS · JavaScript',
    url: 'https://github.com/doyoungkim-code/MyTistorySkin',
  },
  {
    name: 'newYearMessageBot',
    desc: '새해 메시지를 생성하는 챗봇',
    stack: 'JavaScript',
    url: 'https://github.com/doyoungkim-code/newYearMessageBot',
  },
]
