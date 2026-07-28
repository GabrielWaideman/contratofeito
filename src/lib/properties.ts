// Fonte de dados centralizada — futuramente pode ser substituída por chamadas ao Prisma/banco de dados

export type Property = {
  id: number
  title: string
  type: 'RURAL' | 'URBANO'
  category: 'Venda' | 'Locação'
  city: string
  neighborhood: string
  state: string
  price: number
  bedrooms: number
  bathrooms: number
  suites: number
  garageSpots: number
  area: number
  areaUnit: 'm²' | 'ha' | 'alq'
  builtArea?: number          // área construída (opcional)
  builtAreaUnit?: 'm²' | 'ha' | 'alq'
  imageUrl: string
  images: string[]
  isFeatured: boolean
  description: string
  features: string[]
}

export const PROPERTIES: Property[] = [
  {
    id: 1,
    title: 'Sítio Santa Rita - Oportunidade',
    type: 'RURAL',
    category: 'Venda',
    city: 'Álvares Florence',
    neighborhood: 'Zona Rural',
    state: 'SP',
    price: 850000,
    bedrooms: 3,
    bathrooms: 2,
    suites: 1,
    garageSpots: 2,
    area: 24000,
    areaUnit: 'm²',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=2028&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
    ],
    isFeatured: true,
    description: 'Excelente sítio com 24.000m² localizado em Álvares Florence, região tranquila e de fácil acesso. Propriedade completa com casa sede, pomar diversificado, poço artesiano e área para lazer. Ideal para quem busca qualidade de vida no campo sem abrir mão da praticidade. A apenas 10 minutos da cidade, oferece toda a estrutura para moradia permanente ou lazer nos fins de semana.',
    features: ['Poço Artesiano', 'Pomar Diversificado', 'Casa Sede', 'Curral', 'Energia Elétrica', 'Açude', 'Área de Lazer', 'Escritura Regularizada'],
  },
  {
    id: 2,
    title: 'Casa Moderna no Centro',
    type: 'URBANO',
    category: 'Venda',
    city: 'Álvares Florence',
    neighborhood: 'Centro',
    state: 'SP',
    price: 420000,
    bedrooms: 4,
    bathrooms: 3,
    suites: 1,
    garageSpots: 2,
    area: 250,
    areaUnit: 'm²',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    ],
    isFeatured: false,
    description: 'Residência moderna e ampla localizada no coração da cidade de Álvares Florence. Acabamentos de alto padrão, ambientes bem integrados e design contemporâneo. A casa conta com sala de estar e jantar integradas, cozinha gourmet planejada, suíte master com closet, e varanda gourmet com churrasqueira. Garagem coberta para 2 veículos.',
    features: ['Varanda Gourmet', 'Churrasqueira', 'Garagem para 2 Carros', 'Cozinha Planejada', 'Suíte Master com Closet', 'Piscina', 'Portão Eletrônico', 'Alarme'],
  },
  {
    id: 3,
    title: 'Fazenda Produtiva Rio Grande',
    type: 'RURAL',
    category: 'Venda',
    city: 'Votuporanga',
    neighborhood: 'Zona Rural',
    state: 'SP',
    price: 3200000,
    bedrooms: 5,
    bathrooms: 4,
    suites: 2,
    garageSpots: 4,
    area: 150,
    areaUnit: 'alq',
    imageUrl: 'https://images.unsplash.com/photo-1590130983656-7ef2662cde2a?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1590130983656-7ef2662cde2a?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2052&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop',
    ],
    isFeatured: true,
    description: 'Fazenda de alto padrão com 150 alqueires de terra produtiva, localizada em Votuporanga/SP. Propriedade completa com infraestrutura para pecuária e agricultura. Casa sede ampla com 5 quartos, alojamentos para funcionários, 2 silos para armazenagem, curral moderno, bretes e balança. Toda a área cercada e dividida em piquetes. Documentação regularizada e sem pendências.',
    features: ['Casa Sede de Alto Padrão', 'Alojamento para Funcionários', '2 Silos de Armazenagem', 'Curral Moderno com Bretes', 'Balança Eletrônica', 'Poço Artesiano', 'Energia Trifásica', 'Toda Documentada e Regularizada'],
  },
  {
    id: 4,
    title: 'Terreno Comercial em Avenida',
    type: 'URBANO',
    category: 'Venda',
    city: 'Álvares Florence',
    neighborhood: 'Centro',
    state: 'SP',
    price: 180000,
    bedrooms: 0,
    bathrooms: 0,
    suites: 0,
    garageSpots: 0,
    area: 450,
    areaUnit: 'm²',
    imageUrl: 'https://images.unsplash.com/photo-1510313028292-6f29fb4f9715?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1510313028292-6f29fb4f9715?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1444768267458-ede5c3a162d5?q=80&w=2070&auto=format&fit=crop',
    ],
    isFeatured: false,
    description: 'Terreno comercial de excelente localização na principal avenida de Álvares Florence. Medindo 450m² (15m x 30m), com topografia plana e total aproveitamento. Ideal para construção de comércio, galpão logístico, clínicas ou qualquer empreendimento comercial. Frente para avenida de grande movimento, alta visibilidade e fácil acesso. Toda a infraestrutura urbana disponível: água, esgoto, energia e asfalto.',
    features: ['Frente para Avenida Principal', 'Topografia Plana', 'Escritura Regularizada', 'Água e Esgoto', 'Energia Elétrica', 'Asfalto', 'Alta Visibilidade', 'Ótima Localização Comercial'],
  },
  {
    id: 5,
    title: 'Chácara com Represa e Lazer',
    type: 'RURAL',
    category: 'Venda',
    city: 'Álvares Florence',
    neighborhood: 'Zona Rural',
    state: 'SP',
    price: 560000,
    bedrooms: 4,
    bathrooms: 2,
    suites: 1,
    garageSpots: 2,
    area: 48000,
    areaUnit: 'm²',
    imageUrl: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1974&auto=format&fit=crop',
    ],
    isFeatured: false,
    description: 'Chácara deslumbrante com represa particular para lazer aquático. 48.000m² de área verde com casa confortável, área de churrasco coberta, pomar e jardim. A represa possibilita pesca esportiva, caiaque e banho. Ambiente perfeito para descanso e contato com a natureza, a poucos minutos da cidade.',
    features: ['Represa Particular', 'Casa com 4 Quartos', 'Churrasqueira Coberta', 'Pomar', 'Jardim Paisagístico', 'Poço Artesiano', 'Energia Elétrica', 'Cerca Elétrica'],
  },
  {
    id: 6,
    title: 'Apartamento Amplo - Centro',
    type: 'URBANO',
    category: 'Locação',
    city: 'Álvares Florence',
    neighborhood: 'Centro',
    state: 'SP',
    price: 1800,
    bedrooms: 3,
    bathrooms: 2,
    suites: 1,
    garageSpots: 1,
    area: 110,
    areaUnit: 'm²',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=2070&auto=format&fit=crop',
    ],
    isFeatured: false,
    description: 'Apartamento espaçoso e bem localizado no centro da cidade. Recém reformado, com 3 quartos sendo uma suíte, sala ampla, cozinha moderna e área de serviço. Piso porcelanato em todos os ambientes, janelas com vidro duplo e ar condicionado na suíte. Ideal para famílias que buscam conforto e praticidade.',
    features: ['Reformado', 'Suíte com Ar-Condicionado', 'Piso Porcelanato', 'Cozinha Moderna', 'Área de Serviço', 'Vaga de Garagem', 'Portaria 24h', 'Próximo ao Comércio'],
  },
  {
    id: 7,
    title: 'Casa Residencial Bairro Jardim',
    type: 'URBANO',
    category: 'Venda',
    city: 'Álvares Florence',
    neighborhood: 'Jardim das Flores',
    state: 'SP',
    price: 290000,
    bedrooms: 3,
    bathrooms: 2,
    suites: 0,
    garageSpots: 1,
    area: 160,
    areaUnit: 'm²',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=1978&auto=format&fit=crop',
    ],
    isFeatured: false,
    description: 'Residência bem localizada no Jardim das Flores, bairro tranquilo com boa infraestrutura. Imóvel com 3 quartos, sala, cozinha ampla, área de serviço e quintal grande. Ótima oportunidade para família ou investimento.',
    features: ['Quintal Amplo', 'Garagem Coberta', 'Portão Eletrônico', 'Bairro Tranquilo', 'Próximo a Escolas', 'Água e Esgoto', 'Asfalto', 'Escritura Regularizada'],
  },
  {
    id: 8,
    title: 'Kitnet para Locação - Próx. Comércio',
    type: 'URBANO',
    category: 'Locação',
    city: 'Votuporanga',
    neighborhood: 'Centro',
    state: 'SP',
    price: 900,
    bedrooms: 1,
    bathrooms: 1,
    suites: 0,
    garageSpots: 0,
    area: 35,
    areaUnit: 'm²',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop',
    ],
    isFeatured: false,
    description: 'Kitnet compacta e funcional, ideal para estudantes ou profissionais autônomos. Localizada a poucos metros do centro comercial de Votuporanga. Inclui mobília básica, Wi-Fi e água inclusa no aluguel.',
    features: ['Semi-Mobiliada', 'Wi-Fi Incluso', 'Água Inclusa', 'Próximo ao Comércio', 'Segurança 24h', 'Sem Fiador'],
  },
]

import { prisma } from './prismaClient'

export async function getAllProperties(filters?: any): Promise<Property[]> {
  try {
    const whereClause: any = { isPublished: true }
    
    // Add filters logic here later if needed
    
    const dbProps = await prisma.property.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    })
    
    return dbProps.map(p => ({
      ...p,
      price: Number(p.price),
      images: JSON.parse(p.images as string),
      features: JSON.parse(p.features as string),
    })) as Property[]
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

export async function getPropertyById(id: number): Promise<Property | undefined> {
  try {
    const p = await prisma.property.findUnique({
      where: { id }
    })
    
    if (!p || !p.isPublished) return undefined
    
    return {
      ...p,
      price: Number(p.price),
      images: JSON.parse(p.images as string),
      features: JSON.parse(p.features as string),
    } as Property
  } catch (error) {
    console.error('Error fetching property:', error)
    return undefined
  }
}

export async function getSuggestedProperties(currentId: number, limit = 6): Promise<Property[]> {
  try {
    const dbProps = await prisma.property.findMany({
      where: { 
        isPublished: true,
        id: { not: currentId }
      },
      take: limit,
      orderBy: { createdAt: 'desc' }
    })
    
    return dbProps.map(p => ({
      ...p,
      price: Number(p.price),
      images: JSON.parse(p.images as string),
      features: JSON.parse(p.features as string),
    })) as Property[]
  } catch (error) {
    console.error('Error fetching suggested properties:', error)
    return []
  }
}
