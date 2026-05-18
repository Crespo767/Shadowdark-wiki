import styles from './Blocks.module.css'

export function DividerBlock() {
  return <div className={styles.divider}><span className={styles.dividerLine} /><span className={styles.dividerGlyph}>✦</span><span className={styles.dividerLine} /></div>
}
