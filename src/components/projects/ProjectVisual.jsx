import { useEffect, useRef } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

/**
 * Illustrated, resolution-independent mockups for each project.
 * Pure inline SVG: no image downloads, crisp on every screen, themable via --accent.
 * They are stylised illustrations of each product's core idea, not screenshots.
 */

const A = 'var(--accent)'
const LINE = 'rgba(255,255,255,0.10)'
const SOFT = 'rgba(255,255,255,0.06)'
const TXT = 'rgba(255,255,255,0.22)'

function Phone({ x = 140, y = 22, w = 120, h = 236, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="18" fill="#0b0d14" stroke="rgba(255,255,255,0.14)" />
      <rect x={x + w / 2 - 18} y={y + 8} width="36" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
      <svg x={x + 7} y={y + 20} width={w - 14} height={h - 28} viewBox={`0 0 ${w - 14} ${h - 28}`}>
        {children}
      </svg>
    </g>
  )
}

function Browser({ x = 40, y = 30, w = 320, h = 210, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill="#0b0d14" stroke="rgba(255,255,255,0.14)" />
      <path d={`M${x} ${y + 24} H${x + w}`} stroke={LINE} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 14 + i * 12} cy={y + 12} r="3.5" fill="rgba(255,255,255,0.16)" />
      ))}
      <rect x={x + 60} y={y + 6} width={w - 120} height="12" rx="6" fill={SOFT} />
      <svg x={x} y={y + 24} width={w} height={h - 24} viewBox={`0 0 ${w} ${h - 24}`}>
        {children}
      </svg>
    </g>
  )
}

const Bar = ({ x, y, w, h = 6, o = 1, fill = TXT }) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={o} />

function Farm() {
  const boundary = 'M24 70 L70 40 L88 86 L78 140 L30 150 L14 110 Z'
  return (
    <>
      <Phone>
        <rect width="106" height="208" fill="#0f1a14" />
        {/* field strips */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={i} d={`M-10 ${30 + i * 26} L120 ${10 + i * 26}`} stroke="rgba(52,211,153,0.10)" strokeWidth="9" />
        ))}
        <path d={boundary} fill="rgba(52,211,153,0.14)" stroke={A} strokeWidth="1.6" strokeDasharray="4 3" className="pv-dash" />
        {[[24, 70], [70, 40], [88, 86], [78, 140], [30, 150], [14, 110]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.2" fill="#0f1a14" stroke={A} strokeWidth="1.6" />
        ))}
        <circle r="4" fill="#fff" className="pv-walker">
          <animateMotion dur="7s" repeatCount="indefinite" path={boundary} />
        </circle>
        <rect x="8" y="166" width="90" height="34" rx="8" fill="rgba(11,13,20,0.92)" stroke={LINE} />
        <Bar x={16} y={175} w={40} fill={A} />
        <Bar x={16} y={187} w={64} o={0.7} />
      </Phone>
      {/* floating marketplace cards */}
      <g className="pv-float">
        <rect x="22" y="70" width="104" height="58" rx="10" fill="rgba(15,18,28,0.95)" stroke={LINE} />
        <rect x="32" y="80" width="26" height="26" rx="6" fill="rgba(52,211,153,0.22)" />
        <Bar x={66} y={84} w={48} />
        <Bar x={66} y={96} w={32} fill={A} />
        <Bar x={32} y={114} w={82} h={5} o={0.6} />
      </g>
      <g className="pv-float pv-float--late">
        <rect x="276" y="128" width="104" height="58" rx="10" fill="rgba(15,18,28,0.95)" stroke={LINE} />
        <circle cx="296" cy="148" r="10" fill="rgba(52,211,153,0.22)" />
        <path d="M291 148 l4 4 l7 -8" stroke={A} strokeWidth="2" fill="none" />
        <Bar x={314} y={142} w={54} />
        <Bar x={314} y={154} w={36} o={0.7} />
        <Bar x={286} y={172} w={82} h={5} o={0.6} />
      </g>
    </>
  )
}

function Safety() {
  const pins = [
    [30, 60, 1],
    [72, 96, 0.6],
    [44, 132, 0.8],
    [84, 40, 0.5],
  ]
  return (
    <>
      <Phone>
        <rect width="106" height="208" fill="#140f12" />
        {[20, 50, 80, 110, 140].map((y) => (
          <path key={y} d={`M0 ${y} L106 ${y + 14}`} stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
        ))}
        <path d="M30 0 L48 208 M80 0 L64 208" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
        {pins.map(([cx, cy, o], i) => (
          <g key={i} opacity={o}>
            <circle cx={cx} cy={cy} r="16" fill={A} opacity="0.18" className="pv-pulse" style={{ animationDelay: `${i * 0.6}s` }} />
            <circle cx={cx} cy={cy} r="4.5" fill={A} />
          </g>
        ))}
        <rect x="8" y="160" width="90" height="40" rx="8" fill="rgba(11,13,20,0.92)" stroke={LINE} />
        <circle cx="20" cy="172" r="4" fill={A} />
        <Bar x={30} y={169} w={54} />
        <Bar x={16} y={184} w={74} o={0.6} />
      </Phone>
      <g className="pv-float">
        <rect x="262" y="58" width="118" height="46" rx="10" fill="rgba(15,18,28,0.95)" stroke={LINE} />
        <rect x="272" y="68" width="26" height="26" rx="7" fill="rgba(248,113,113,0.2)" />
        <path d="M285 74 v8 M285 86 v1" stroke={A} strokeWidth="2.4" strokeLinecap="round" />
        <Bar x={306} y={72} w={60} />
        <Bar x={306} y={84} w={40} o={0.6} />
      </g>
      <g className="pv-float pv-float--late">
        <rect x="24" y="150" width="104" height="50" rx="10" fill="rgba(15,18,28,0.95)" stroke={LINE} />
        {['#f87171', '#fbbf24', '#34d399'].map((c, i) => (
          <rect key={c} x={34 + i * 30} y="162" width="24" height="6" rx="3" fill={c} opacity={i === 0 ? 1 : 0.5} />
        ))}
        <Bar x={34} y={178} w={84} h={5} o={0.6} />
      </g>
    </>
  )
}

function University() {
  return (
    <Browser>
      <rect x="0" y="0" width="70" height="186" fill="rgba(255,255,255,0.025)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Bar key={i} x={14} y={18 + i * 22} w={i === 1 ? 44 : 36} fill={i === 1 ? A : TXT} o={i === 1 ? 1 : 0.7} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={84 + i * 76} y="14" width="66" height="44" rx="8" fill={SOFT} stroke={LINE} />
          <Bar x={94 + i * 76} y={26} w={30} o={0.6} />
          <Bar x={94 + i * 76} y={40} w={42} h={8} fill={i === 0 ? A : 'rgba(255,255,255,0.35)'} />
        </g>
      ))}
      <rect x="84" y="70" width="142" height="104" rx="8" fill={SOFT} stroke={LINE} />
      {[40, 64, 50, 82, 58, 90, 72].map((h, i) => (
        <rect key={i} x={96 + i * 18} y={164 - h} width="10" height={h} rx="3" fill={A} opacity={0.35 + i * 0.09} className="pv-grow" style={{ animationDelay: `${i * 80}ms` }} />
      ))}
      <rect x="236" y="70" width="70" height="104" rx="8" fill={SOFT} stroke={LINE} />
      <circle cx="271" cy="110" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
      <circle cx="271" cy="110" r="22" fill="none" stroke={A} strokeWidth="7" strokeDasharray="100 140" transform="rotate(-90 271 110)" strokeLinecap="round" />
      <Bar x={248} y={148} w={46} o={0.6} />
    </Browser>
  )
}

function Estate() {
  return (
    <Browser>
      <rect x="14" y="12" width="292" height="22" rx="11" fill={SOFT} stroke={LINE} />
      <circle cx="30" cy="23" r="5" fill="none" stroke={A} strokeWidth="1.6" />
      <Bar x={44} y={20} w={90} o={0.6} />
      <rect x="250" y="16" width="50" height="14" rx="7" fill={A} />
      {[0, 1, 2].map((i) => (
        <g key={i} className="pv-float" style={{ animationDelay: `${i * 0.4}s` }}>
          <rect x={14 + i * 100} y="46" width="90" height="128" rx="10" fill={SOFT} stroke={LINE} />
          <rect x={20 + i * 100} y="52" width="78" height="60" rx="7" fill="rgba(251,191,36,0.10)" />
          <path d={`M${36 + i * 100} 98 l23 -20 l23 20 v8 h-46 z`} fill="none" stroke={A} strokeWidth="1.6" opacity="0.8" />
          <Bar x={22 + i * 100} y={122} w={60} />
          <Bar x={22 + i * 100} y={136} w={40} o={0.6} />
          {i === 0 && (
            <g>
              <circle cx={86 + i * 100} cy="62" r="8" fill="#0b0d14" stroke={A} />
              <path d={`M${82 + i * 100} 62 l3 3 l5 -6`} stroke={A} strokeWidth="1.6" fill="none" />
            </g>
          )}
          <Bar x={22 + i * 100} y={154} w={74} h={10} fill={i === 0 ? A : SOFT} o={i === 0 ? 0.9 : 1} />
        </g>
      ))}
    </Browser>
  )
}

function Food() {
  return (
    <>
      <Phone>
        <rect width="106" height="208" fill="#15100c" />
        <rect x="8" y="8" width="90" height="56" rx="10" fill="rgba(251,146,60,0.14)" />
        <circle cx="53" cy="36" r="18" fill="none" stroke={A} strokeWidth="1.6" />
        <circle cx="53" cy="36" r="10" fill={A} opacity="0.35" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="8" y={74 + i * 36} width="90" height="30" rx="8" fill={SOFT} stroke={LINE} />
            <circle cx="22" cy={89 + i * 36} r="7" fill={A} opacity={0.5 - i * 0.1} />
            <Bar x={34} y={83 + i * 36} w={38} />
            <Bar x={34} y={93 + i * 36} w={24} o={0.6} />
            <circle cx="86" cy={89 + i * 36} r="5" fill="none" stroke={A} />
          </g>
        ))}
        <rect x="8" y="184" width="90" height="18" rx="9" fill={A} />
      </Phone>
      <g className="pv-float">
        <rect x="262" y="70" width="118" height="78" rx="10" fill="rgba(15,18,28,0.95)" stroke={LINE} />
        <Bar x={274} y={82} w={50} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx="280" cy={102 + i * 14} r="4" fill={i < 2 ? A : 'rgba(255,255,255,0.2)'} />
            <Bar x={292} y={99 + i * 14} w={70 - i * 10} o={i < 2 ? 0.9 : 0.4} />
          </g>
        ))}
      </g>
    </>
  )
}

function Logistics() {
  const route = 'M40 140 C 90 60, 150 150, 200 90 S 280 40, 290 60'
  return (
    <Browser>
      <rect x="0" y="0" width="320" height="186" fill="rgba(167,139,250,0.03)" />
      {[30, 60, 90, 120, 150].map((y) => (
        <path key={y} d={`M0 ${y} H320`} stroke="rgba(255,255,255,0.03)" />
      ))}
      <path d={route} stroke="rgba(255,255,255,0.12)" strokeWidth="3" fill="none" />
      <path d={route} stroke={A} strokeWidth="2" fill="none" strokeDasharray="6 6" className="pv-dash" />
      <circle cx="40" cy="140" r="6" fill="#0b0d14" stroke={A} strokeWidth="2" />
      <circle cx="290" cy="60" r="6" fill={A} />
      <g>
        <rect x="-9" y="-6" width="18" height="12" rx="3" fill="#fff" />
        <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path={route} />
      </g>
      <rect x="196" y="112" width="112" height="64" rx="8" fill="rgba(15,18,28,0.95)" stroke={LINE} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="206" y={122 + i * 16} width="22" height="8" rx="4" fill={A} opacity={1 - i * 0.3} />
          <Bar x={236} y={123 + i * 16} w={60 - i * 8} o={0.6} />
        </g>
      ))}
    </Browser>
  )
}

const visuals = { farm: Farm, safety: Safety, university: University, estate: Estate, food: Food, logistics: Logistics }

export default function ProjectVisual({ type, accent, className = '' }) {
  const V = visuals[type] || University
  const svgRef = useRef(null)
  const [ref, inView] = useInView({ once: false, threshold: 0, rootMargin: '100px 0px' })
  const reduced = usePrefersReducedMotion()

  // SMIL animations ignore CSS, so pause them for reduced motion and while off-screen
  useEffect(() => {
    const svg = svgRef.current
    if (!svg?.pauseAnimations) return
    if (inView && !reduced) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [inView, reduced])

  return (
    <div ref={ref} className={`pv ${inView ? 'is-playing' : ''} ${className}`} style={{ '--accent': accent }}>
      <svg ref={svgRef} viewBox="0 0 400 280" className="pv__svg" role="presentation" aria-hidden="true" focusable="false">
        <V />
      </svg>
    </div>
  )
}
