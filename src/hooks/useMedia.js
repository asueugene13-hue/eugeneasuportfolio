import { useSyncExternalStore } from 'react'

/** Subscribe to a CSS media query. */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

export const useFinePointer = () =>
  useMediaQuery('(hover: hover) and (pointer: fine)')

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

let webglSupport
/** True when the browser can create a WebGL context (cached). */
export function hasWebGL() {
  if (webglSupport !== undefined) return webglSupport
  try {
    const canvas = document.createElement('canvas')
    webglSupport = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    )
  } catch {
    webglSupport = false
  }
  return webglSupport
}

/** Heuristic for devices/connections where a full 3D scene is too heavy. */
export function isConstrainedDevice() {
  const nav = navigator
  const saveData = nav.connection?.saveData
  const slowNet = /(^|-)2g$/.test(nav.connection?.effectiveType || '')
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2
  const fewCores = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2
  return Boolean(saveData || slowNet || lowMemory || fewCores)
}
