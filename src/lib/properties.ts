// Fonte de dados centralizada — futuramente pode ser substituída por chamadas ao Prisma/banco de dados

export type Property = {
  id: number
  code?: string | null
  videoUrl?: string | null
  title: string
  type: 'RURAL' | 'URBANO' | string
  category: 'Venda' | 'Locação' | string
  purpose?: string
  city: string
  neighborhood: string
  state: string
  price: number
  bedrooms: number
  bathrooms: number
  suites: number
  garageSpots: number
  area: number
  areaUnit: 'm²' | 'ha' | 'alq' | string
  builtArea?: number | null   // área construída (opcional)
  builtAreaUnit?: 'm²' | 'ha' | 'alq' | string | null
  imageUrl: string
  images: string[]
  isFeatured: boolean
  isPublished?: boolean
  acceptsExchange?: boolean
  description: string
  features: string[]
  createdAt?: string | Date
  updatedAt?: string | Date
}

export const PROPERTIES: Property[] = [
  {
    "id": 9,
    "code": "CH0042",
    "videoUrl": null,
    "title": "Chacara com Piscina e perto da cidade",
    "description": "Chacara bem estruturada com excelente localização\nProximo a cidade\nCom Piscina",
    "type": "RURAL",
    "category": "Venda",
    "purpose": "Rural",
    "city": "Boa Vista dos Andradas",
    "neighborhood": "Rural",
    "state": "SP",
    "price": 600000,
    "bedrooms": 4,
    "suites": 0,
    "bathrooms": 1,
    "garageSpots": 6,
    "area": 2,
    "areaUnit": "ha",
    "builtArea": 400,
    "builtAreaUnit": null,
    "imageUrl": "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785205272026-874487506-03.jpg",
    "images": [
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785205277356-537128618-04.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785205278587-302127016-05.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785205279413-639646698-06.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785205280287-320071309-07.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785205281121-544947323-08.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785205282271-613741908-09.jpg"
    ],
    "features": [
      "Piscina",
      "Pé no Asfalto"
    ],
    "isFeatured": false,
    "isPublished": true,
    "acceptsExchange": false,
    "createdAt": "2026-07-28T02:21:25.626Z",
    "updatedAt": "2026-07-29T02:09:54.437Z"
  },
  {
    "id": 8,
    "code": null,
    "videoUrl": null,
    "title": "Casa do Joao Pedro no Pozzobon",
    "description": "Casa do Jao\nAcompanha tudo que tem dentro\nVai ate o Jao\nPronto",
    "type": "URBANO",
    "category": "Venda",
    "purpose": "Residencial",
    "city": "Votuporanga",
    "neighborhood": "Pozzobon",
    "state": "SP",
    "price": 500000,
    "bedrooms": 3,
    "suites": 1,
    "bathrooms": 2,
    "garageSpots": 2,
    "area": 300,
    "areaUnit": "m²",
    "builtArea": 230,
    "builtAreaUnit": null,
    "imageUrl": "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199590967-612456027-IMG_0483.jpg",
    "images": [
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199605019-877165024-IMG_0484.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199605933-448498494-IMG_0485.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199606540-932583390-IMG_0486.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199607226-209043344-IMG_0487.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199607834-648490249-IMG_0488.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199608586-292835575-IMG_0489.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199609503-746037402-IMG_0490.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199610382-142537810-IMG_0491.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199611166-139785972-IMG_0492.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199612243-458206826-IMG_0493.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199613183-959144311-IMG_0494.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199613919-363590821-IMG_0495.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199614815-234457443-IMG_0496.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199616127-374958902-IMG_0497.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199616816-789071043-IMG_0498.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199617524-118810957-IMG_0499.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199618214-946409720-IMG_0500.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199618922-581109819-IMG_0501.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199619899-793885073-IMG_0502.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199620680-806820580-IMG_0503.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199621366-149248497-IMG_0505.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199622269-722711959-IMG_0506.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199622977-835810815-IMG_0507.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199623646-381512171-IMG_0508.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199624187-509120966-IMG_0509.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199625178-794700112-IMG_0510.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785199625821-518482354-IMG_0511.jpg"
    ],
    "features": [
      "Piscina",
      "Laje",
      "Area Gourmet"
    ],
    "isFeatured": false,
    "isPublished": true,
    "acceptsExchange": false,
    "createdAt": "2026-07-28T02:15:40.225Z",
    "updatedAt": "2026-07-28T02:15:40.225Z"
  },
  {
    "id": 7,
    "code": null,
    "videoUrl": null,
    "title": "Casa Teste no Centro da Cidade",
    "description": "Descrição deste imóvel Teste aqui no cadastro",
    "type": "URBANO",
    "category": "Venda",
    "purpose": "Residencial",
    "city": "Votuporanga",
    "neighborhood": "Centro",
    "state": "SP",
    "price": 250000,
    "bedrooms": 3,
    "suites": 2,
    "bathrooms": 3,
    "garageSpots": 4,
    "area": 400,
    "areaUnit": "m²",
    "builtArea": 350,
    "builtAreaUnit": null,
    "imageUrl": "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204573106-642639867-1__5_.jpg",
    "images": [
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204586383-194408900-1__1_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204587695-198358495-1__2_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204588594-571798988-1__9_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204589654-689813860-1__10_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204590831-85941459-1__11_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204591952-978136106-1__14_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204592705-920330886-1__15_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204593531-248278401-1__16_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204594285-515509170-1__18_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204595755-127182438-1__22_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204596494-894182835-1__23_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204597461-583107748-1__25_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204598467-945494594-1__28_.jpg",
      "https://grrytymgaenjxwsrkujj.supabase.co/storage/v1/object/public/imoveis/1785204599580-61612178-1__33_.jpg"
    ],
    "features": [
      "Piscina"
    ],
    "isFeatured": false,
    "isPublished": true,
    "acceptsExchange": false,
    "createdAt": "2026-07-28T02:10:12.074Z",
    "updatedAt": "2026-07-28T02:17:37.338Z"
  },
  {
    "id": 6,
    "code": null,
    "videoUrl": null,
    "title": "Terreno de Esquina com a Praça da Matriz no Centro",
    "description": "🏡 OPORTUNIDADE IMPERDÍVEL EM ÁLVARES FLORENCE!\n\n🌟 Este terreno pode ser seu!\n\n🏡 Características do Terreno:\n\nTamanho: 10x26 (260 metros quadrados);\nCom Escritura;\nMelhor localização da cidade, na Praça Central (Matriz)\n🏡 Se você está em busca de um terreno para construir o lar dos seus sonhos, esta é a sua oportunidade! Este lote espaçoso, com escritura, está localizado na acolhedora cidade de Álvares Florence.\n\n🌳 Desfrute da tranquilidade: Aqui, a violência não importuna, as amizades florescem e as portas e janelas estão sempre abertas para a felicidade, para terceira idade então é um Paraíso.\n\n🏡Olhando para outros terrenos? Esqueça-os! Este é o lugar certo para você!✨\n\n🤝 Negócio de Ocasião: Venha viver em um lugar de paz e alegria por um preço que você não pode ignorar.",
    "type": "URBANO",
    "category": "Venda",
    "purpose": "Comercial",
    "city": "Álvares Florence",
    "neighborhood": "Centro",
    "state": "SP",
    "price": 110000,
    "bedrooms": 0,
    "suites": 0,
    "bathrooms": 0,
    "garageSpots": 0,
    "area": 260,
    "areaUnit": "m²",
    "builtArea": null,
    "builtAreaUnit": null,
    "imageUrl": "/uploads/1784772113119-856688192-1__5_.jpg",
    "images": [
      "/uploads/1784772120061-286929977-1__1_.jpg",
      "/uploads/1784772120118-793649953-1__2_.jpg",
      "/uploads/1784772120180-525182607-1__3_.jpg",
      "/uploads/1784772120271-275183087-1__4_.jpg"
    ],
    "features": [],
    "isFeatured": false,
    "isPublished": true,
    "acceptsExchange": false,
    "createdAt": "2026-07-23T02:02:20.094Z",
    "updatedAt": "2026-07-23T02:02:20.094Z"
  },
  {
    "id": 5,
    "code": null,
    "videoUrl": null,
    "title": "Terreno de Esquina com 185m² e Aceita Permuta",
    "description": "$d",
    "type": "URBANO",
    "category": "Venda",
    "purpose": "Residencial",
    "city": "Valentim Gentil",
    "neighborhood": "Chopplândia",
    "state": "SP",
    "price": 55000,
    "bedrooms": 0,
    "suites": 0,
    "bathrooms": 0,
    "garageSpots": 0,
    "area": 185,
    "areaUnit": "m²",
    "builtArea": 0,
    "builtAreaUnit": null,
    "imageUrl": "/uploads/1784772028651-483448842-1__6_.jpg",
    "images": [
      "/uploads/1784772034665-680000979-1__1_.jpg",
      "/uploads/1784772034714-147530310-1__2_.jpg",
      "/uploads/1784772034762-243589486-1__3_.jpg",
      "/uploads/1784772034808-236420292-1__4_.jpg",
      "/uploads/1784772034845-545565788-1__5_.jpg"
    ],
    "features": [],
    "isFeatured": false,
    "isPublished": true,
    "acceptsExchange": false,
    "createdAt": "2026-07-23T02:00:40.025Z",
    "updatedAt": "2026-07-23T02:00:40.025Z"
  },
  {
    "id": 4,
    "code": null,
    "videoUrl": null,
    "title": "Fazenda com 78 alqueires paulista",
    "description": "🏡 Características:\n\nPropriedade Rural topografia semi plana - em Américo de Campos\n28 mil pés de seringueira em produção e 23.500 há produzir;\n100 mil pés de eucalipto;\n10 mil pés de teca;\n12 alqueires de mata nativa APP;\n20 alqueires de pastagem;\n05 tanques para peixes;\nRepresa grande no final dos tanques;\nEmbarcador com tronco - balança com cobertura - curral todo em tabua;\n02 tratores: 275 Massey Ferguson traçado - 265 Massey Ferguson;\n01 carreta e 01 tanque de 4.000 mil litros;\n05 casas de colaboradores;\nSede padrão elite com 04 suítes individuais - WC social - Sauna + Ducha + WC - Sala de Estar - Varanda ampla anexada a 1ª Represa - Cozinha - Área Gourmet - Dispensa para armazenamento de ração, etc - Área de descamar pescados- Piscina berçário dos alevinos - Playgraund\nR$ VINTE MILHÕES DE REAIS - ACEITA 30% A 40% EM PERMUTA!\n\n✨Não perca esta oportunidade única de viver em um paraíso tranquilo e seguro. Venha para Álvares Florence e mude sua vida para melhor!",
    "type": "RURAL",
    "category": "Venda",
    "purpose": "Rural",
    "city": "Américo de Campos",
    "neighborhood": "Rural",
    "state": "SP",
    "price": 20000000,
    "bedrooms": 0,
    "suites": 4,
    "bathrooms": 4,
    "garageSpots": 0,
    "area": 78,
    "areaUnit": "alq",
    "builtArea": null,
    "builtAreaUnit": null,
    "imageUrl": "/uploads/1784771843097-171925495-1__13_.jpg",
    "images": [
      "/uploads/1784771853154-98292599-1__1_.jpg",
      "/uploads/1784771853220-467640908-1__2_.jpg",
      "/uploads/1784771853268-339082983-1__3_.jpg",
      "/uploads/1784771853316-588656511-1__4_.jpg",
      "/uploads/1784771853364-612633748-1__5_.jpg",
      "/uploads/1784771853422-389901568-1__6_.jpg",
      "/uploads/1784771853475-699096716-1__7_.jpg",
      "/uploads/1784771853524-91332051-1__8_.jpg",
      "/uploads/1784771853575-71904387-1__9_.jpg",
      "/uploads/1784771853624-516413987-1__10_.jpg",
      "/uploads/1784771853681-715059654-1__11_.jpg",
      "/uploads/1784771853728-455426488-1__12_.jpg",
      "/uploads/1784771853780-221246479-1__14_.jpg",
      "/uploads/1784771853821-723264212-1__15_.jpg",
      "/uploads/1784771853882-695483947-1__16_.jpg",
      "/uploads/1784771853958-153057715-1__17_.jpg",
      "/uploads/1784771854003-622056489-1__18_.jpg",
      "/uploads/1784771854048-136700-1__19_.jpg",
      "/uploads/1784771854090-731592904-1__20_.jpg",
      "/uploads/1784771854136-390382406-1__21_.jpg",
      "/uploads/1784771854191-194880117-1__22_.jpg",
      "/uploads/1784771854235-858862345-1__23_.jpg",
      "/uploads/1784771854285-452144813-1__24_.jpg"
    ],
    "features": [
      "Represas",
      "Eucalipto",
      "Teca",
      "Seringueira",
      "Tanque de Peixes",
      "Tratores",
      "Carreta e Tanque"
    ],
    "isFeatured": true,
    "isPublished": true,
    "acceptsExchange": true,
    "createdAt": "2026-07-23T01:58:13.554Z",
    "updatedAt": "2026-07-29T16:36:55.333Z"
  },
  {
    "id": 3,
    "code": null,
    "videoUrl": null,
    "title": "Casa no Bairro San Remo com 420m²",
    "description": "🏡 Características da Casa:\n\n01 suíte;\n02 quartos;\n01 banheiro social;\ncozinha; \ndespensa; \nlavanderia e banheiro;\n01 sala separada;\n03 salas integradas;\n02 vagas de garagem coberta;\nedícula ao fundo;\npiscina;\nTerreno: 420 m², sendo 12m de frente e 35m de fundo;\nÁrea Construída de 210 metros;\n🌳Votuporanga, uma das cidades brasileiras que mais se desenvolveu nos últimos anos. A 80 Km da Metrópole Regional São José do Rio Preto, acesso pista dupla sem pedágio, Rodovia Euclides da Cunha e Rodovia Washington Luís.\n\n🚣‍♀️Ótimo lugar para sua moradia e conforto, tem de tudo na cidade, academias, mercados, parques, fórum, clubes e muito mais. O bairro é bem localizado, negócio de ocasião. Casa de puro conforto. ✨ Vai perder essa oportunidade?",
    "type": "URBANO",
    "category": "Venda",
    "purpose": "Residencial",
    "city": "Votuporanga",
    "neighborhood": "San Remo",
    "state": "SP",
    "price": 800000,
    "bedrooms": 2,
    "suites": 1,
    "bathrooms": 2,
    "garageSpots": 2,
    "area": 420,
    "areaUnit": "m²",
    "builtArea": 210,
    "builtAreaUnit": null,
    "imageUrl": "/uploads/1784771611666-110454061-1__12_.jpg",
    "images": [
      "/uploads/1784771617737-657573750-1__1_.jpg",
      "/uploads/1784771617806-934736652-1__2_.jpg",
      "/uploads/1784771617886-152461574-1__3_.jpg",
      "/uploads/1784771617950-160590038-1__4_.jpg",
      "/uploads/1784771618016-189444809-1__5_.jpg",
      "/uploads/1784771618103-319336567-1__6_.jpg",
      "/uploads/1784771618143-353163208-1__7_.jpg",
      "/uploads/1784771618200-477324428-1__8_.jpg",
      "/uploads/1784771618282-433211721-1__9_.jpg",
      "/uploads/1784771618324-315467628-1__10_.jpg",
      "/uploads/1784771618371-784540172-1__11_.jpg",
      "/uploads/1784771618445-638766197-1__13_.jpg",
      "/uploads/1784771618509-216320796-1__14_.jpg",
      "/uploads/1784771618558-980462364-1__15_.jpg",
      "/uploads/1784771618633-12956477-1__16_.jpg",
      "/uploads/1784771618682-601240918-1__17_.jpg",
      "/uploads/1784771618736-737343925-1__18_.jpg",
      "/uploads/1784771618792-420501984-1__19_.jpg",
      "/uploads/1784771618850-426493016-1__20_.jpg",
      "/uploads/1784771618908-543402380-1__21_.jpg",
      "/uploads/1784771618958-660815514-1__22_.jpg",
      "/uploads/1784771619001-611744254-1__23_.jpg",
      "/uploads/1784771619085-384991090-1__24_.jpg",
      "/uploads/1784771619144-900527131-1__25_.jpg"
    ],
    "features": [
      "Piscina",
      "Edícula ao Fundo"
    ],
    "isFeatured": true,
    "isPublished": true,
    "acceptsExchange": false,
    "createdAt": "2026-07-23T01:53:44.934Z",
    "updatedAt": "2026-07-23T02:11:07.597Z"
  },
  {
    "id": 2,
    "code": null,
    "videoUrl": "https://www.youtube.com/watch?v=toDYAtLPdq0",
    "title": "Sobrado de 425.m²",
    "description": "",
    "type": "URBANO",
    "category": "Venda",
    "purpose": "Residencial",
    "city": "Américo de Campos",
    "neighborhood": "Centro",
    "state": "SP",
    "price": 1000000,
    "bedrooms": 5,
    "suites": 1,
    "bathrooms": 2,
    "garageSpots": 2,
    "area": 425,
    "areaUnit": "m²",
    "builtArea": 370,
    "builtAreaUnit": null,
    "imageUrl": "/uploads/1784771007876-436019903-A__7_.jpg",
    "images": [
      "/uploads/1784771014828-896631340-A__1_.jpg",
      "/uploads/1784771015464-390974513-A__1_.png",
      "/uploads/1784771015629-109310818-A__2_.jpg",
      "/uploads/1784771015734-201887285-A__3_.jpg",
      "/uploads/1784771015805-538448290-A__4_.jpg",
      "/uploads/1784771015925-150821044-A__5_.jpg",
      "/uploads/1784771015976-365304583-A__6_.jpg",
      "/uploads/1784771016028-306665565-A__8_.jpg",
      "/uploads/1784771016091-278907219-A__9_.jpg",
      "/uploads/1784771016133-526052542-A__10_.jpg",
      "/uploads/1784771016229-520835074-A__11_.jpg",
      "/uploads/1784771016271-322827973-A__12_.jpg",
      "/uploads/1784771016324-929853705-A__13_.jpg",
      "/uploads/1784771016384-706840281-A__14_.jpg",
      "/uploads/1784771016436-856829465-A__15_.jpg",
      "/uploads/1784771016495-539157617-A__16_.jpg",
      "/uploads/1784771016556-917406885-A__17_.jpg",
      "/uploads/1784771016608-787471254-A__18_.jpg",
      "/uploads/1784771016659-989911302-A__19_.jpg",
      "/uploads/1784771016720-393085875-A__20_.jpg",
      "/uploads/1784771016779-19266679-A__21_.jpg",
      "/uploads/1784771016836-765074568-A__22_.jpg",
      "/uploads/1784771016892-33400394-A__23_.jpg",
      "/uploads/1784771016952-791845084-A__24_.jpg",
      "/uploads/1784771017036-656368544-A__25_.jpg"
    ],
    "features": [
      "Quiosque Gourmet"
    ],
    "isFeatured": false,
    "isPublished": true,
    "acceptsExchange": false,
    "createdAt": "2026-07-23T01:39:49.402Z",
    "updatedAt": "2026-07-29T02:00:00.658Z"
  },
  {
    "id": 1,
    "code": null,
    "videoUrl": null,
    "title": "Casa de Alto Padrão no Interior do Estado de São Paulo",
    "description": "1.000 M² - 3 SUÍTES - 5 BANHEIROS - PISCINA - GARAGEM 4 VAGAS\nCOMPRE ESTA CASA MARAVILHOSA EM ÁLVARES FLORENCE!\n\n04 dormitórios luxuosos, sendo 03 suítes (com armários e climatizadas);\n02 vestiários (masculino e feminino);\nSauna com Ducha;\nSala de Estar;\nVaranda Gourmet Completa;\nPiscina Suspensa, grande e aquecida com bar molhado e balcão refrigerado;\nLavanderia Completa;\nPiso em Porcelanato;\nTelhado Carpintaria de Primeiro Mundo com Madeira Aparente Trabalhada;\nDe Laje;\nEnergia solar para atender as necessidades da casa;\nPoço artesiano.\nMelhor Localização da Cidade\nCLIQUE NO LINK: https://maps.app.goo.gl/JraG5FrfUJebkqTg9  \nNegócio de OCASIÃO. Venha mudar de vida, não perca esta oportunidade.\n\nIMÓVEL IMPERDÍVEL, VENHA VIVER NO DESFRUTE.\n\nDINHEIRO CHAMA DINHEIRO (LEI DA ATRAÇÃO).",
    "type": "URBANO",
    "category": "Venda",
    "purpose": "Residencial",
    "city": "Álvares Florence",
    "neighborhood": "Centro",
    "state": "SP",
    "price": 1300000,
    "bedrooms": 0,
    "suites": 3,
    "bathrooms": 5,
    "garageSpots": 4,
    "area": 1000,
    "areaUnit": "m²",
    "builtArea": 700,
    "builtAreaUnit": null,
    "imageUrl": "/uploads/1784770798387-848970201-4.jpg",
    "images": [
      "/uploads/1784770806518-512630570-1.jpg",
      "/uploads/1784770806576-56350270-2.jpg",
      "/uploads/1784770806630-15255398-3.jpg",
      "/uploads/1784770806685-636690937-5.jpg",
      "/uploads/1784770806730-523520130-6.jpg",
      "/uploads/1784770806776-980292304-7.jpg",
      "/uploads/1784770806821-942549772-8.jpg",
      "/uploads/1784770806869-98238238-9.jpg",
      "/uploads/1784770806920-7680167-10.jpg",
      "/uploads/1784770806951-922954316-11.jpg",
      "/uploads/1784770806988-321598858-12.jpg",
      "/uploads/1784770807022-125744893-13.jpg",
      "/uploads/1784770807055-436611785-14.jpg",
      "/uploads/1784770807087-658835161-15.jpg",
      "/uploads/1784770807119-298298662-16.jpg",
      "/uploads/1784770807151-477409914-17.jpg",
      "/uploads/1784770807201-362071802-18.jpg",
      "/uploads/1784770807245-34948371-19.jpg",
      "/uploads/1784770807291-864657704-20.jpg",
      "/uploads/1784770807336-297597361-21.jpg",
      "/uploads/1784770807379-130730234-22.jpg",
      "/uploads/1784770807430-873358691-23.jpg",
      "/uploads/1784770807467-886007322-24.jpg",
      "/uploads/1784770807503-318820170-25.jpg",
      "/uploads/1784770807546-262413256-26.jpg",
      "/uploads/1784770807587-612695457-27.jpg",
      "/uploads/1784770807639-235940889-28.jpg",
      "/uploads/1784770807691-372471094-29.jpg"
    ],
    "features": [
      "Piscina",
      "Bar Molhado",
      "Poço Artesiano"
    ],
    "isFeatured": true,
    "isPublished": true,
    "acceptsExchange": false,
    "createdAt": "2026-07-23T01:24:01.682Z",
    "updatedAt": "2026-07-23T01:50:19.513Z"
  }
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
    console.error('Error fetching properties from DB, using fallback mock data:', error)
    return PROPERTIES
  }
}

export async function getPropertyById(id: number): Promise<Property | undefined> {
  try {
    const p = await prisma.property.findUnique({
      where: { id }
    })
    
    if (!p || !p.isPublished) {
      const fallback = PROPERTIES.find(item => item.id === id)
      return fallback
    }
    
    return {
      ...p,
      price: Number(p.price),
      images: JSON.parse(p.images as string),
      features: JSON.parse(p.features as string),
    } as Property
  } catch (error) {
    console.error('Error fetching property from DB, using fallback mock data:', error)
    return PROPERTIES.find(item => item.id === id)
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
    
    if (dbProps.length === 0) {
      return PROPERTIES.filter(p => p.id !== currentId).slice(0, limit)
    }

    return dbProps.map(p => ({
      ...p,
      price: Number(p.price),
      images: JSON.parse(p.images as string),
      features: JSON.parse(p.features as string),
    })) as Property[]
  } catch (error) {
    console.error('Error fetching suggested properties, using fallback mock data:', error)
    return PROPERTIES.filter(p => p.id !== currentId).slice(0, limit)
  }
}
