/** Renders a simple-icons entry (or any {path}) as an inline SVG. */
export function BrandIcon({ icon, size = 20, className = '', title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
    >
      {title && <title>{title}</title>}
      <path d={icon.path} />
    </svg>
  )
}
