import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório').trim(),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export const propertySchema = z.object({
  title: z.string().min(5, 'Título deve ter pelo menos 5 caracteres').max(255).trim(),
  code: z.string().max(50, 'Código muito longo').optional().nullable().transform(val => val?.trim() === '' ? null : val),
  videoUrl: z.string().url('URL de vídeo inválida').max(500, 'URL muito longa').optional().nullable().transform(val => val?.trim() === '' ? null : val),
  description: z.string().min(10, 'Descrição muito curta').trim(),
  type: z.string().min(1, 'Tipo obrigatório').max(100),
  category: z.string().min(1, 'Categoria obrigatória').max(100),
  purpose: z.string().min(1, 'Finalidade obrigatória').max(100),
  city: z.string().min(2, 'Cidade obrigatória').max(100).trim(),
  neighborhood: z.string().min(2, 'Bairro obrigatório').max(100).trim(),
  state: z.string().length(2, 'Estado deve ter 2 letras').toUpperCase(),
  price: z.coerce.number().positive('Preço deve ser maior que zero'),
  bedrooms: z.coerce.number().int().nonnegative().default(0),
  suites: z.coerce.number().int().nonnegative().default(0),
  bathrooms: z.coerce.number().int().nonnegative().default(0),
  garageSpots: z.coerce.number().int().nonnegative().default(0),
  area: z.coerce.number().positive('Área deve ser maior que zero'),
  areaUnit: z.enum(['m²', 'ha', 'alq']),
  builtArea: z.coerce.number().nonnegative().optional().nullable(),
  builtAreaUnit: z.enum(['m²', 'ha', 'alq']).optional().nullable(),
  imageUrl: z.string().min(1, 'A imagem de capa é obrigatória').max(500),
  images: z.array(z.string().min(1, 'Caminho da imagem inválido')).default([]),
  features: z.array(z.string().trim()).default([]),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  acceptsExchange: z.boolean().default(false),
})

export type PropertyInput = z.infer<typeof propertySchema>
