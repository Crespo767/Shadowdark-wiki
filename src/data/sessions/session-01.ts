import type { Session } from '../../types/session'

export const session01: Session = {
  id: 'sessao-01',
  number: 1,
  title: 'A Tocha que Não Apaga',
  subtitle: 'Onde tudo começou — e onde algo foi deixado para trás',
  date: '2025-03-14',
  coverImage: '/sessions/sessao-01/cover.jpg',
  teaser: 'Os aventureiros chegam à cidade de Umbrath sem um centavo — e partem com uma maldição que ninguém pediu.',
  tags: ['chegada', 'cidade', 'contrato', 'maldição'],
  content: [
    {
      type: 'quote',
      text: 'A chuva chegou antes do pôr do sol. Como sempre em Umbrath — a cidade que esqueceu como é ver a luz durar.',
      attribution: '— O Mestre',
    },
    {
      type: 'paragraph',
      text: 'Os aventureiros desceram a estrada de lama que leva a <em>Umbrath</em> carregando pouco mais do que suas armas e uma história vaga sobre trabalho disponível.',
    },
    { type: 'divider' },
    {
      type: 'paragraph',
      text: 'Na Taverna do Anzol Partido encontraram <strong>Maren Thresh</strong>, um comerciante de meia-idade com olhos de quem deve favores demais.',
    },
    { type: 'npc', npcId: 'maren-thresh' },
    {
      type: 'quote',
      text: '"Não é nada sério. Só uns barulhos. Provavelmente ratos. Ratos grandes. Possivelmente com dentes de ferro."',
      attribution: '— Maren Thresh, mentindo visivelmente',
    },
    { type: 'divider' },
    {
      type: 'paragraph',
      text: 'O porão não tinha ratos. Tinha um altar improvisado, três corpos dispostos em triângulo e uma tocha que ardia sem combustível.',
    },
    {
      type: 'highlight',
      label: 'Revelação',
      text: 'Ao tocar o símbolo, Kael sentiu algo se mover dentro do peito. O Mestre anotou: <em>Marca da Tocha Apagada</em>. Efeitos a definir.',
    },
    {
      type: 'quote',
      text: 'Vocês dormem mal naquela noite. A tocha continua queimando lá embaixo.',
      attribution: '— O Mestre, encerrando a sessão',
    },
  ],
}
