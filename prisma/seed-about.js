// Seed script para a Página Sobre Nós
// Execute: node prisma/seed-about.js

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const valuesData = JSON.stringify([
  {
    title: 'Ética e Transparência',
    text: 'Priorizar a honestidade e a transparência em todas as transações imobiliárias, agindo com integridade e respeito pelos clientes e parceiros.',
  },
  {
    title: 'Profissionalismo',
    text: 'Buscar constantemente a excelência no atendimento ao cliente, na prestação de serviços e na representação dos interesses dos envolvidos nas transações imobiliárias.',
  },
  {
    title: 'Inovação',
    text: 'Estar aberto a novas tecnologias e práticas que melhorem a experiência do cliente e otimizem os processos internos da imobiliária.',
  },
  {
    title: 'Compromisso com o Cliente',
    text: 'Colocar as necessidades e interesses dos clientes em primeiro lugar, buscando sempre superar suas expectativas e oferecer um serviço de alta qualidade.',
  },
  {
    title: 'Responsabilidade Social e Ambiental',
    text: 'Contribuir para o desenvolvimento sustentável das comunidades onde atua, respeitando o meio ambiente e apoiando iniciativas sociais relevantes.',
  },
])

const historyText = `A história da Imobiliária Digital Contrato Feito é uma jornada de determinação, paixão e comprometimento com a missão de facilitar a mudança de vida das pessoas por meio de oportunidades imobiliárias excepcionais. Tudo começou com nossa experiência de vida, onde aprendemos a valorizar a importância da dedicação, do respeito mútuo e da busca pela excelência.

Nosso marco zero foi em um ambiente simples, mas rico em valores e esforço. Com estudo e dedicação, cultivamos a visão de oferecer não apenas imóveis, mas sim novas perspectivas e qualidade de vida para nossos clientes. Com a presença de Deus como guia e a comunhão com as pessoas ao nosso redor, construímos os alicerces da nossa empresa.

Através do comprometimento em oferecer o melhor da terra para viver, tanto em ambientes urbanos quanto rurais, buscamos encorajar o desenvolvimento humano bem-sucedido. Cada passo dado foi impulsionado pelo desejo genuíno de impactar positivamente a vida das pessoas, proporcionando oportunidades que transcendem simples transações imobiliárias.

Hoje, orgulhamo-nos em compartilhar uma história de sucesso que nasceu em casa, evoluiu com base em princípios sólidos e floresceu para servir aos consumidores com excelência. A Imobiliária Contrato Feito Digital está aqui para ser mais do que uma intermediária de negócios imobiliários; estamos aqui para ser facilitadores de sonhos e transformações.

Nossa jornada é marcada por um compromisso inabalável com o benefício e a qualidade de vida dos nossos clientes, e estamos ansiosos para continuar essa trajetória ao seu lado, trazendo as melhores oportunidades imobiliárias diretamente até você. Obrigado por fazer parte dessa história conosco.`

const cityText = `Essa é a Maior cidadezinha do Mundo, aproximadamente 4 mil habitantes. Aqui tem Qualidade de Vida, Saúde Mental, Saúde Espiritual e Social, Amizades, Portas e Janelas abertas sem medo da violência, sua Família segura e feliz, para a terceira idade então, é um Paraíso. A 40 km dos rios Turvo e Marinheiro, de alto padrão de pesca. A 10 km de Votuporanga, uma das cidades brasileiras que mais se desenvolveu nos últimos anos. A 100 Km da Metrópole Regional São José do Rio Preto, acesso por pista dupla sem pedágio, Rodovia Euclides da Cunha e Rodovia Washington Luís. Álvares Florence tem índice de criminalidade praticamente zero, é um município amplo em território, com uma natureza exuberante e várias propriedades rurais.`

async function main() {
  const existing = await prisma.aboutPage.findFirst()

  if (existing) {
    console.log('Dados da Página Sobre já existem. Pulando seed.')
    return
  }

  await prisma.aboutPage.create({
    data: {
      heroTitle: 'Nossa História',
      heroSubtitle: 'Conheça a Contrato Feito — sua imobiliária digital em Álvares Florence e região.',
      bannerImageUrl: null,
      historyText,
      missionText: 'Facilitar e intermediar a compra e venda de imóveis, proporcionando um serviço de qualidade que atenda às necessidades dos clientes. Oferecer suporte especializado, orientação durante o processo de transação imobiliária e garantir a satisfação do cliente.',
      visionText: 'Se tornar uma referência no mercado digital, inovando constantemente para oferecer as melhores soluções imobiliárias, expandindo sua atuação para novas regiões e mantendo um padrão de excelência no atendimento ao cliente.',
      valuesText: valuesData,
      cityName: 'Álvares Florence',
      cityText,
      cityImageUrl: null,
      agentName: 'Emerson de Mendonça',
      agentCreci: 'CRECI SP 246817 F',
      agentPhone: '(17) 99722-5062',
      agentWhatsapp: 'https://bit.ly/falecomcorretorimobiliario',
      agentImageUrl: null,
      agentBio: 'Corretor de imóveis com ampla experiência no mercado regional de Álvares Florence e Votuporanga. Especialista em imóveis urbanos e rurais, comprometido em encontrar as melhores oportunidades para você e sua família.',
    },
  })

  console.log('Dados iniciais da Página Sobre criados com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
