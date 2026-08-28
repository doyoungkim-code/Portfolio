const ITEMS = [
  { sec: 'about', href: '#cv-about', label: 'ABOUT' },
  { sec: 'journey', href: '#cv-journey', label: 'JOURNEY' },
  { sec: 'skills', href: '#cv-skills', label: 'SKILLS' },
  { sec: 'p1', href: '#cv-p1', label: 'PROJECT 01' },
  { sec: 'p2', href: '#cv-p2', label: 'PROJECT 02' },
  { sec: 'contact', href: '#cv-contact', label: 'CONTACT' },
]

/** 좌측 세로 내비 (corp 스타일: 불릿 + 텍스트) */
export function SideNav({ active }: { active: string }) {
  return (
    <nav className="pf-sidenav" aria-label="섹션">
      {ITEMS.map((item) => (
        <a key={item.sec} href={item.href} className={active === item.sec ? 'on' : undefined}>
          <i />
          {item.label}
        </a>
      ))}
    </nav>
  )
}
