import { Link, useParams } from 'react-router-dom'
import type { Block } from '../types/session'
import { getSessions } from '../store/campaignStore'
import { formatDate } from '../utils/format'
import { ParagraphBlock } from '../components/blocks/ParagraphBlock'
import { QuoteBlock } from '../components/blocks/QuoteBlock'
import { ImageBlock } from '../components/blocks/ImageBlock'
import { GalleryBlock } from '../components/blocks/GalleryBlock'
import { NpcReferenceBlock } from '../components/blocks/NpcReferenceBlock'
import { HighlightBlock } from '../components/blocks/HighlightBlock'
import { DividerBlock } from '../components/blocks/DividerBlock'
import styles from './Pages.module.css'

function renderBlock(block: Block, index: number) {
  if (block.type === 'paragraph') return <ParagraphBlock key={index} block={block} />
  if (block.type === 'quote') return <QuoteBlock key={index} block={block} />
  if (block.type === 'image') return <ImageBlock key={index} block={block} />
  if (block.type === 'gallery') return <GalleryBlock key={index} block={block} />
  if (block.type === 'npc') return <NpcReferenceBlock key={index} block={block} />
  if (block.type === 'highlight') return <HighlightBlock key={index} block={block} />
  return <DividerBlock key={index} />
}

export function SessionPage() {
  const { id } = useParams()
  const sessions = getSessions().sort((a, b) => a.number - b.number)
  const session = sessions.find((item) => item.id === id)
  if (!session) return <p className={styles.notFound}>Sessão não encontrada.</p>
  const current = sessions.findIndex((item) => item.id === session.id)
  const prev = sessions[current - 1]
  const next = sessions[current + 1]

  return (
    <article>
      <header className={styles.sessionHeader}>
        <span className={styles.chapterNum}>Capítulo {session.number}</span>
        <h1 className={styles.sessionTitle}>{session.title}</h1>
        {session.subtitle && <p className={styles.sessionSubtitle}>{session.subtitle}</p>}
        <div className={styles.sessionMeta}>
          <time>{formatDate(session.date)}</time>
          {session.tags?.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>
      </header>
      {session.content.map(renderBlock)}
      <nav className={styles.sessionNav}>
        <span>{prev && <Link to={`/sessoes/${prev.id}`}>← Cap. {prev.number}</Link>}</span>
        <span>{next && <Link to={`/sessoes/${next.id}`}>Cap. {next.number} →</Link>}</span>
      </nav>
    </article>
  )
}
