import type { NpcReferenceBlock as NpcReferenceBlockType } from '../../types/session'
import { getNpcs } from '../../store/campaignStore'
import { StatusBadge } from '../common/Badges'
import styles from './Blocks.module.css'

export function NpcReferenceBlock({ block }: { block: NpcReferenceBlockType }) {
  const npc = getNpcs().find((item) => item.id === block.npcId)
  if (!npc) return null
  return (
    <div className={styles.npcInline}>
      <div className={styles.npcPortrait}>{npc.portrait ? <img src={npc.portrait} alt={npc.name} /> : npc.name.slice(0, 1)}</div>
      <div>
        <div className={styles.npcName}>{npc.name}</div>
        <p>{npc.role}</p>
        <div className="metaList"><StatusBadge status={npc.status} /><span className="badge">{npc.disposition}</span></div>
      </div>
    </div>
  )
}
