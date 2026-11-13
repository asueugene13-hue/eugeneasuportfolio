import { Braces, BrainCircuit, Code2, Cpu, ShieldCheck, Smartphone } from 'lucide-react'
import { useInView } from '../../hooks/useInView'
import { useTilt } from '../../hooks/useTilt'

// One developer-themed icon per face of the cube
const faces = [
  { side: 'front', icon: Code2 },
  { side: 'back', icon: Braces },
  { side: 'right', icon: Smartphone },
  { side: 'left', icon: ShieldCheck },
  { side: 'top', icon: BrainCircuit },
  { side: 'bottom', icon: Cpu },
]

/**
 * "Tech core": a glass 3D cube with a glowing core and two orbit rings.
 * Pure CSS 3D (no WebGL, no extra download). It tilts toward the cursor on
 * fine pointers, and its animations pause while off-screen. Reduced-motion
 * users get a still frame (see about.css).
 */
export default function TechCore() {
  const [ref, inView] = useInView({ once: false, threshold: 0, rootMargin: '80px 0px' })
  const tilt = useTilt(16)

  return (
    <div ref={ref} className={`core ${inView ? 'is-playing' : ''}`} aria-hidden="true" {...tilt}>
      <div className="core__glow" />
      <div className="core__stage">
        <div className="core__orbit core__orbit--a">
          <span className="core__sat" />
        </div>
        <div className="core__orbit core__orbit--b">
          <span className="core__sat" />
        </div>
        <div className="core__cube">
          {faces.map(({ side, icon: Icon }) => (
            <div key={side} className={`core__face core__face--${side}`}>
              <Icon strokeWidth={1.4} />
            </div>
          ))}
          <div className="core__heart" />
        </div>
      </div>
      <div className="core__floor" />
    </div>
  )
}
