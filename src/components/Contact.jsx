import { useState } from 'react'
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { profile } from '../data/profile'
import Reveal from './ui/Reveal'
import SocialLinks from './ui/SocialLinks'

const fields = [
  { name: 'name', label: 'Full Name', type: 'text', autoComplete: 'name', placeholder: 'Your full name' },
  { name: 'email', label: 'Email Address', type: 'email', autoComplete: 'email', placeholder: 'you@example.com' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', placeholder: 'What is this about?', optional: true },
]

const empty = { name: '', email: '', subject: '', message: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (v.message.trim().length < 2) e.message = 'Please write a message.'
  return e
}

// Where messages go: a custom endpoint from .env if set, otherwise
// FormSubmit, which emails each message straight to profile.email.
const endpoint =
  profile.contactEndpoint || (profile.email ? `https://formsubmit.co/ajax/${profile.email}` : '')

function payload(values) {
  const subject = values.subject.trim() || `New message from ${values.name.trim()}`
  if (profile.contactEndpoint) return { ...values, subject }
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
    _subject: `Portfolio: ${subject}`,
    _replyto: values.email.trim(),
    _template: 'table',
  }
}

export default function Contact() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (touched[e.target.name]) setErrors(validate(next))
  }

  const onBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
    setErrors(validate(values))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    // Honeypot: real visitors never fill this hidden field
    if (form.elements.company?.value) return

    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(errs).length) {
      form.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus()
      return
    }

    if (endpoint) {
      setStatus({ type: 'sending', message: 'Sending your message…' })
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload(values)),
        })
        const data = await res.json().catch(() => ({}))
        // FormSubmit answers 200 with success "false" when something is wrong
        if (!res.ok || String(data.success) === 'false') throw new Error(data.message || String(res.status))
        setValues(empty)
        setTouched({})
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent — I’ll get back to you soon.' })
      } catch (err) {
        if (/activat/i.test(err.message) && profile.email) {
          // Not activated yet: hand the message to the visitor's email app instead
          if (import.meta.env.DEV) console.warn('[contact] FormSubmit:', err.message)
          const subject = values.subject.trim() || `New message from ${values.name.trim()}`
          const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
          window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
          setStatus({
            type: 'success',
            message: `Your email app should open with the message ready — just press send. Or email me at ${profile.email}.`,
          })
          return
        }
        setStatus({
          type: 'error',
          message: profile.email
            ? `Sorry, the message couldn’t be sent right now. Please email me directly at ${profile.email}.`
            : 'Sorry, the message couldn’t be sent right now. Please try again in a moment.',
        })
      }
      return
    }

    setStatus({
      type: 'error',
      message: 'The contact form isn’t connected yet. Please reach out through one of the links on this page soon.',
    })
  }

  const fieldError = (name) => touched[name] && errors[name]
  const sending = status.type === 'sending'

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <div className="contact__grid">
          <div className="contact__intro">
            <Reveal>
              <p className="eyebrow">07 — Contact</p>
              <h2 id="contact-title" className="contact__title">
                Let&apos;s Build Something <span className="text-gradient">Meaningful.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead">
                Have an interesting project, collaboration, internship opportunity, or technology idea? Feel free to
                reach out.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <SocialLinks withLabels className="contact__socials" />
            </Reveal>
          </div>

          <Reveal className="contact__card glass" delay={120}>
            <form className="form" noValidate onSubmit={onSubmit} aria-describedby="form-status">
              <div className="form__hp" aria-hidden="true">
                <label>
                  Company
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="form__row">
                {fields.slice(0, 2).map((f) => (
                  <Field key={f.name} f={f} value={values[f.name]} error={fieldError(f.name)} onChange={onChange} onBlur={onBlur} />
                ))}
              </div>
              <Field f={fields[2]} value={values.subject} error={fieldError('subject')} onChange={onChange} onBlur={onBlur} />

              <div className={`field ${fieldError('message') ? 'has-error' : ''}`}>
                <label htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your idea, project or opportunity…"
                  value={values.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  required
                  aria-invalid={Boolean(fieldError('message'))}
                  aria-describedby={fieldError('message') ? 'cf-message-err' : undefined}
                />
                {fieldError('message') && (
                  <p className="field__error" id="cf-message-err">
                    {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn--primary btn--lg form__submit" disabled={sending}>
                {sending ? <LoaderCircle className="btn__icon spin" size={18} aria-hidden="true" /> : null}
                <span>{sending ? 'Sending…' : 'Send Message'}</span>
                {!sending && <Send className="btn__icon btn__icon--right" size={18} aria-hidden="true" />}
              </button>

              <div id="form-status" role="status" aria-live="polite" className="form__status-wrap">
                {status.message && status.type !== 'sending' && (
                  <p className={`form__status is-${status.type}`}>
                    {status.type === 'success' ? <CircleCheck size={18} aria-hidden="true" /> : <CircleAlert size={18} aria-hidden="true" />}
                    {status.message}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ f, value, error, onChange, onBlur }) {
  const id = `cf-${f.name}`
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>
        {f.label}
        {f.optional && <span className="field__optional"> (optional)</span>}
      </label>
      <input
        id={id}
        name={f.name}
        type={f.type}
        autoComplete={f.autoComplete}
        placeholder={f.placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={!f.optional}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error && (
        <p className="field__error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  )
}
