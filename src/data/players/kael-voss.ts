import type { Player } from '../../types/player'

export const kaelVoss: Player = {
  id: 'kael-voss',
  playerName: 'João',
  characterName: 'Kael Voss',
  race: 'Humano',
  class: 'Guerreiro',
  level: 1,
  portrait: '/players/kael-voss.jpg',
  background: 'Ex-soldado de uma guerra que terminou sem vencedores. Carrega uma cicatriz no rosto e um nome que prefere não mencionar.',
  inventory: ['Espada longa', 'Escudo de madeira reforçada', 'Mochila de couro surrada', 'Carta selada (destinatário desconhecido)'],
  bonds: ['Desconfia de Maren Thresh desde o primeiro encontro', 'Sente que a Marca da Tocha Apagada é familiar de alguma forma'],
  alive: true,
  sessionIds: ['sessao-01'],
}
