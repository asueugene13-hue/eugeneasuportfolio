import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, inView]. With `once` (default) it stops observing after the
 * element first enters the viewport — cheap enough to use on every section.
 */
export function useInView({ rootMargin = '0px 0px -10% 0px', threshold = 0.12, once = true } = {}) {
  const ref = useRef(null)
  // Without IntersectionObserver support, everything simply counts as visible
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, threshold, once])

  return [ref, inView]
}
