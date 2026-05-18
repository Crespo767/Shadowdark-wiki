import type { Location } from '../../types/location'

export const umbrath: Location = {
  id: 'umbrath',
  name: 'Umbrath',
  type: 'cidade',
  status: 'parcial',
  mapImage: '/locations/umbrath/mapa.jpg',
  images: ['/locations/umbrath/entrada.jpg', '/locations/umbrath/taverna.jpg'],
  description: 'Cidade cinza e úmida no vale das névoas. Conhecida pelo comércio de relíquias e pela ausência de autoridade real.',
  atmosphere: 'A chuva chegou antes do pôr do sol. As ruas de pedra irregular guardam lama entre as pedras como segredo entre os dentes. Aqui, as lanternas nunca alumiam o suficiente — e ninguém reclama disso.',
  notableNpcIds: ['maren-thresh'],
  sessionIds: ['sessao-01'],
  dangerLevel: 'arriscado',
}
