import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react'
import './SplineScene.css'

// The Spline runtime is large. React.lazy keeps it out of the main bundle,
// so the page renders and becomes interactive before any 3D code downloads.
const Spline = lazy(() => import('@splinetool/react-spline'))

class SceneErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('[SplineScene] Failed to load scene:', error)
    this.props.onError?.(error)
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}

function Spinner({ label }) {
  return (
    <div className="spline-scene__overlay" role="status">
      <span className="spline-scene__spinner" aria-hidden="true" />
      <span className="spline-scene__label">{label}</span>
    </div>
  )
}

/**
 * Responsive, lazily-loaded Spline 3D scene.
 *
 * - Runtime code is split into its own chunk (React.lazy).
 * - The scene isn't requested until the container is near the viewport
 *   (unless `eager`).
 * - Rendering pauses while scrolled off-screen (saves battery on mobile).
 * - `fallback` (default: a spinner) stays visible until the scene has
 *   actually loaded — and remains if loading fails.
 */
export default function SplineScene({
  scene,
  title = '3D scene',
  className = '',
  eager = false,
  fallback,
  onLoad,
  onError,
}) {
  const containerRef = useRef(null)
  const appRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(eager)
  const [isLoaded, setIsLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [showFallback, setShowFallback] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          appRef.current?.play?.()
        } else {
          appRef.current?.stop?.()
        }
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Unmount the fallback after the cross-fade so it stops using CPU
  useEffect(() => {
    if (!isLoaded) return
    const t = setTimeout(() => setShowFallback(false), 900)
    return () => clearTimeout(t)
  }, [isLoaded])

  const handleLoad = (app) => {
    appRef.current = app
    setIsLoaded(true)
    onLoad?.(app)
  }

  const handleError = (error) => {
    setFailed(true)
    onError?.(error)
  }

  const classes = ['spline-scene', isLoaded && 'is-loaded', className].filter(Boolean).join(' ')

  return (
    <div className={classes} ref={containerRef} aria-busy={!isLoaded && !failed}>
      {(showFallback || failed) && (
        <div className="spline-scene__fallback">{fallback ?? <Spinner label="Loading 3D scene…" />}</div>
      )}
      {scene && shouldLoad && !failed && (
        <SceneErrorBoundary onError={handleError}>
          <Suspense fallback={null}>
            <div className="spline-scene__canvas" role="img" aria-label={title}>
              <Spline scene={scene} onLoad={handleLoad} />
            </div>
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  )
}
