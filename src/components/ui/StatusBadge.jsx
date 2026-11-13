const tone = {
  concept: 'concept',
  planning: 'concept',
  development: 'dev',
  completed: 'done',
}

export default function StatusBadge({ stage, label }) {
  return (
    <span className={`status status--${tone[stage] || 'dev'}`}>
      <span className="status__dot" aria-hidden="true" />
      <span className="visually-hidden">Status: </span>
      {label}
    </span>
  )
}
