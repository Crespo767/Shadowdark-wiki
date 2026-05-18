import { Link } from 'react-router-dom'
import { getSessions } from '../store/campaignStore'
import { formatDate } from '../utils/format'
import styles from './Pages.module.css'

export function Home() {
  const sessions = getSessions().sort((a, b) => b.number - a.number)
  const latest = sessions[0]

  return (
    <>
      <section className={styles.hero}>
        <h1>Campanha ShadowDark</h1>
        <p>Um grimório privado de sessões, rostos, lugares e perigos que ainda respiram no escuro.</p>
      </section>
      <section className={styles.chapterGrid}>
        {sessions.map((session) => (
          <Link key={session.id} to={`/sessoes/${session.id}`} className={`${styles.chapterCard} ${latest?.id === session.id ? styles.featured : ''}`}>
            <span className={styles.chapterNum}>Capítulo {session.number}</span>
            <h2 className={styles.chapterTitle}>{session.title}</h2>
            <div className={styles.sessionMeta}><time>{formatDate(session.date)}</time>{session.tags?.map((tag) => <span className={styles.tag} key={tag}>{tag}</span>)}</div>
            <p className={styles.teaser}>{session.teaser}</p>
          </Link>
        ))}
      </section>
    </>
  )
}
