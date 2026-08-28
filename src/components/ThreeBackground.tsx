import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Points, Mesh } from 'three'

interface CloudProps {
  count: number
  color: string
  size: number
  opacity: number
  spread: number
  rotSpeed: number
}

/** 은하수 파티클 — z는 카메라(z=9)에 붙지 않게 뒤쪽으로 */
function Cloud({ count, color, size, opacity, spread, rotSpeed }: CloudProps) {
  const ref = useRef<Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.7
      arr[i * 3 + 2] = (Math.random() - 0.5) * 9 - 3
    }
    return arr
  }, [count, spread])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * rotSpeed
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={size} transparent opacity={opacity} depthWrite={false} sizeAttenuation />
    </points>
  )
}

/** 느리게 회전하는 와이어프레임 다면체 */
function Ico() {
  const ref = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.elapsedTime * 0.016
    ref.current.rotation.y = clock.elapsedTime * 0.022
  })
  return (
    <mesh ref={ref} position={[4.2, -0.6, -2]}>
      <icosahedronGeometry args={[2.6, 1]} />
      <meshBasicMaterial color="#4664E6" wireframe transparent opacity={0.1} />
    </mesh>
  )
}

/** 스크롤에 따라 카메라가 아주 미세하게 상하 이동 (커서 반응 없음) */
function CameraRig() {
  useFrame(({ camera }) => {
    camera.position.y += (window.scrollY * -0.00012 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })
  return null
}

/** 다크 커버 뒤 3D 배경 — 라이트 페이지에선 페이드아웃, 모바일/모션 축소 시 미렌더 */
export default function ThreeBackground({ dimmed }: { dimmed: boolean }) {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    setEnabled(
      window.innerWidth > 860 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])
  if (!enabled) return null

  return (
    <div className={`pf-3d${dimmed ? ' pf-3d--dim' : ''}`} aria-hidden>
      <Canvas camera={{ position: [0, 0, 9], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Cloud count={420} color="#4664E6" size={0.045} opacity={0.55} spread={22} rotSpeed={0.005} />
        <Cloud count={520} color="#8A93B0" size={0.03} opacity={0.3} spread={26} rotSpeed={-0.0035} />
        <Ico />
        <CameraRig />
      </Canvas>
    </div>
  )
}
