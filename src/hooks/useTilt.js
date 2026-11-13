import { useCallback, useRef } from 'react'
import { useFinePointer, usePrefersReducedMotion } from './useMedia'

/**
 * Subtle 3D depth + cursor spotlight for cards.
 * Writes CSS custom properties (--rx, --ry, --mx, --my) instead of re-rendering,
 * and is disabled on touch devices and for reduced-motion users.
 */
export function useTilt(max = 6) {
  const finePointer = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const frame = useRef(0)
  const enabled = finePointer && !reduced

  const onPointerMove = useCallback(
    (e) => {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${x * 100}%`)
        el.style.setProperty('--my', `${y * 100}%`)
        if (enabled) {
          el.style.setProperty('--rx', `${(0.5 - y) * max}deg`)
          el.style.setProperty('--ry', `${(x - 0.5) * max}deg`)
        }
      })
    },
    [enabled, max],
  )

  const onPointerLeave = useCallback((e) => {
    const el = e.currentTarget
    cancelAnimationFrame(frame.current)
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }, [])

  return { onPointerMove, onPointerLeave }
}
