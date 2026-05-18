import type { HighlightBlock as HighlightBlockType } from '../../types/session'
import styles from './Blocks.module.css'

export function HighlightBlock({ block }: { block: HighlightBlockType }) {
  return <div className={styles.highlight}>{block.label && <span className={styles.highlightLabel}>{block.label}</span>}<p dangerouslySetInnerHTML={{ __html: block.text }} /></div>
}
