import type { NPC } from '../../types/npc'

export const marenThresh: NPC = {
  id: 'maren-thresh',
  name: 'Maren Thresh',
  role: 'Comerciante — possível aliado, provável problema',
  faction: 'Guilda dos Mercadores de Umbrath',
  status: 'alive',
  disposition: 'neutro',
  portrait: '/npcs/maren-thresh.jpg',
  description: 'Homem de uns 50 anos, barba mal-feita, anel de sinete que não condiz com as roupas surradas. Suou durante toda a conversa com os aventureiros.',
  masterNotes: 'Sabe sobre o culto do porão. Pagou para que abrissem o selo — não esperava que algo saísse. Está com medo e vai tentar contratar o grupo novamente na sessão 3.',
  sessionIds: ['sessao-01'],
  locationIds: ['umbrath'],
}
