import type { QuoteBlock as QuoteBlockType } from '../../types/session'
import styles from './Blocks.module.css'

export function QuoteBlock({ block }: { block: QuoteBlockType }) {
  return <blockquote className={styles.quote}><p>{block.text}</p>{block.attribution && <cite>{block.attribution}</cite>}</blockquote>
}
