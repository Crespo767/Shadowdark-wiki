import type { ParagraphBlock as ParagraphBlockType } from '../../types/session'
import styles from './Blocks.module.css'

export function ParagraphBlock({ block }: { block: ParagraphBlockType }) {
  return <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: block.text }} />
}
