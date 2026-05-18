import type { Enemy } from '../../types/enemy'

export const goblinSombras: Enemy = {
  id: 'goblin-sombras',
  name: 'Goblin das Sombras',
  type: 'criatura',
  threat: 'baixa',
  image: '/enemies/goblin-sombras.jpg',
  description: 'Menor que um goblin comum, com olhos que brilham no escuro absoluto. Age em grupos e usa becos e esgotos para emboscar.',
  tactics: 'Ataca de flancos e recua quando perde um aliado. Jamais luta sozinho.',
  outcome: 'derrotado',
  loot: ['3 moedas de cobre', 'Faca enferrujada', 'Nota ilegível em goblin'],
  sessionIds: ['sessao-01'],
}
