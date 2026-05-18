import type { EnemyThreat } from '../../types/enemy'
import type { NpcStatus } from '../../types/npc'

export function StatusBadge({ status }: { status: NpcStatus | 'alive' | 'dead' }) {
  const colors = {
    alive: { bg: 'var(--teal-muted)', color: '#2a9d7a' },
    dead: { bg: 'var(--red-muted)', color: '#c44444' },
    unknown: { bg: 'var(--bg-elevated)', color: 'var(--text-muted)' },
    missing: { bg: '#2a2010', color: '#c8a030' },
  }
  const color = colors[status]
  return <span className="badge" style={{ background: color.bg, color: color.color }}>{status}</span>
}

export function ThreatBadge({ threat }: { threat: EnemyThreat }) {
  const colors = {
    baixa: '#a89880',
    média: '#d09a3a',
    alta: '#e06f45',
    letal: '#e13b3b',
  }
  return <span className="badge" style={{ color: colors[threat] }}>{threat}</span>
}
