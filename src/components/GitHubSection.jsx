import { useEffect, useState } from 'react'
import { GitFork, Plug, Star } from 'lucide-react'
import { profile } from '../data/profile'
import { useInView } from '../hooks/useInView'
import Button from './ui/Button'
import { BrandIcon } from './ui/BrandIcon'
import { brandIcons } from '../data/brandIcons'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const GithubIcon = (props) => <BrandIcon icon={brandIcons.github} {...props} />
const CACHE_KEY = 'gh-activity-v1'
const CACHE_MS = 60 * 60 * 1000

/** Fetches real public data from the GitHub REST API (cached for an hour per visitor). */
async function fetchGitHub(username) {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null')
    if (cached && cached.username === username && Date.now() - cached.at < CACHE_MS) return cached.data
  } catch {
    /* storage unavailable — fetch fresh */
  }
  const [userRes, repoRes] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`),
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12`),
  ])
  if (!userRes.ok || !repoRes.ok) throw new Error('GitHub request failed')
  const user = await userRes.json()
  const repos = (await repoRes.json())
    .filter((r) => !r.fork)
    .slice(0, 6)
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      updated: r.pushed_at,
    }))
  const data = {
    user: { login: user.login, name: user.name, avatar: user.avatar_url, url: user.html_url, publicRepos: user.public_repos, bio: user.bio },
    repos,
  }
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ username, at: Date.now(), data }))
  } catch {
    /* ignore */
  }
  return data
}

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })

function NotConnected() {
  return (
    <Reveal className="gh-empty glass">
      <span className="gh-empty__icon" aria-hidden="true">
        <Plug size={26} />
      </span>
      <h3>Connect GitHub to display live development activity.</h3>
      <p>
        Repositories and contribution activity will appear here automatically once a GitHub profile is connected.
      </p>
      <div className="gh-empty__skeleton" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="gh-skel">
            <span />
            <span />
            <span />
          </div>
        ))}
      </div>
      <Button variant="ghost" href={profile.social.github} icon={GithubIcon}>
        GitHub Profile
      </Button>
    </Reveal>
  )
}

function Connected({ username }) {
  const [ref, inView] = useInView({ rootMargin: '300px 0px' })
  const [state, setState] = useState({ status: 'loading' })

  useEffect(() => {
    if (!inView) return
    let cancelled = false
    fetchGitHub(username)
      .then((data) => !cancelled && setState({ status: 'ready', data }))
      .catch(() => !cancelled && setState({ status: 'error' }))
    return () => {
      cancelled = true
    }
  }, [inView, username])

  const profileUrl = profile.social.github || `https://github.com/${username}`

  return (
    <div ref={ref} className="gh">
      {state.status === 'ready' ? (
        <>
          <Reveal className="gh-profile glass">
            <img src={state.data.user.avatar} alt="" width="64" height="64" loading="lazy" decoding="async" />
            <div>
              <h3>{state.data.user.name || state.data.user.login}</h3>
              <p>
                @{state.data.user.login} · {state.data.user.publicRepos} public{' '}
                {state.data.user.publicRepos === 1 ? 'repository' : 'repositories'}
              </p>
            </div>
            <Button variant="ghost" href={profileUrl} icon={GithubIcon}>
              View GitHub
            </Button>
          </Reveal>

          <Reveal className="gh-chart glass" delay={80}>
            <p className="project__label">Contribution activity</p>
            <img
              src={`https://ghchart.rshah.org/4f8cff/${encodeURIComponent(username)}`}
              alt={`GitHub contribution chart for ${username}`}
              loading="lazy"
              decoding="async"
            />
          </Reveal>

          <ul className="gh-repos">
            {state.data.repos.map((r, i) => (
              <Reveal as="li" key={r.id} className="gh-repo glass" delay={(i % 3) * 70}>
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  <h3>{r.name}</h3>
                  <p>{r.description || 'No description provided.'}</p>
                  <div className="gh-repo__meta">
                    {r.language && <span className="gh-repo__lang">{r.language}</span>}
                    <span>
                      <Star size={14} aria-hidden="true" /> {r.stars}
                      <span className="visually-hidden"> stars</span>
                    </span>
                    <span>
                      <GitFork size={14} aria-hidden="true" /> {r.forks}
                      <span className="visually-hidden"> forks</span>
                    </span>
                    <span>Updated {fmtDate(r.updated)}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </ul>
        </>
      ) : state.status === 'error' ? (
        <div className="gh-empty glass">
          <h3>GitHub activity couldn’t be loaded right now.</h3>
          <Button variant="ghost" href={profileUrl} icon={GithubIcon}>
            Visit GitHub profile
          </Button>
        </div>
      ) : (
        <div className="gh-repos" aria-busy="true" aria-label="Loading GitHub activity">
          {[0, 1, 2].map((i) => (
            <div key={i} className="gh-skel glass">
              <span />
              <span />
              <span />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function GitHubSection() {
  return (
    <section id="github" className="section section--tight" aria-labelledby="github-title">
      <div className="container">
        <SectionHeading
          eyebrow="06 — Code"
          title="Developer Activity"
          id="github-title"
          intro="Where the building happens — repositories and ongoing work."
        />
        {profile.githubUsername ? <Connected username={profile.githubUsername} /> : <NotConnected />}
      </div>
    </section>
  )
}
