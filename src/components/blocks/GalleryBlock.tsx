import type { GalleryBlock as GalleryBlockType } from '../../types/session'
import { ImageBlock } from './ImageBlock'
import styles from './Blocks.module.css'

export function GalleryBlock({ block }: { block: GalleryBlockType }) {
  return <div className={styles.gallery}>{block.images.map((image) => <ImageBlock key={`${image.src}-${image.alt}`} block={{ type: 'image', ...image }} />)}</div>
}
