/**
 * Button / link styled as a button.
 * - `href` renders an <a>; external links open in a new tab safely.
 * - `href === ''` (a link that doesn't exist yet) renders a disabled
 *   "Coming soon" control instead of a broken link.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  children,
  className = '',
  comingSoonLabel = 'Coming soon',
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`

  const content = (
    <>
      {Icon && <Icon className="btn__icon" aria-hidden="true" size={18} />}
      <span>{children}</span>
      {IconRight && <IconRight className="btn__icon btn__icon--right" aria-hidden="true" size={18} />}
    </>
  )

  if (href === '') {
    return (
      <span className={`${classes} is-disabled`} aria-disabled="true" title={comingSoonLabel}>
        {Icon && <Icon className="btn__icon" aria-hidden="true" size={18} />}
        <span>{children}</span>
        <span className="btn__soon">{comingSoonLabel}</span>
      </span>
    )
  }

  if (href !== undefined) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
