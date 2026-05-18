import type { ImageBlock as ImageBlockType } from '../../types/session'
import styles from './Blocks.module.css'

export function ImageBlock({ block }: { block: ImageBlockType }) {
  return <figure className={styles.figure}><img src={block.src} alt={block.alt} onError={(event) => { event.currentTarget.style.display = 'none' }} />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>
}
