import { NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: Request) {
  try {
    // 1. Verificar autenticação
    const session = getSessionFromRequest(request)
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // 2. Extrair form data
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 })
    }

    // 3. Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Apenas imagens são permitidas.' }, { status: 400 })
    }

    // 4. Preparar buffer e nome de arquivo
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    // Limpar o nome do arquivo para remover espaços e caracteres estranhos
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${uniqueSuffix}-${cleanName}`

    // 5. Upload para o Supabase Storage (Bucket "imoveis")
    const { data, error } = await supabase
      .storage
      .from('imoveis')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false
      })

    if (error) {
      console.error('Supabase upload erro:', error)
      return NextResponse.json({ error: 'Erro ao fazer upload da imagem no Supabase.' }, { status: 500 })
    }

    // 6. Pegar a URL pública gerada pelo Supabase
    const { data: publicUrlData } = supabase
      .storage
      .from('imoveis')
      .getPublicUrl(filename)

    const publicUrl = publicUrlData.publicUrl

    // 7. Retornar a URL pública do arquivo
    return NextResponse.json({ url: publicUrl }, { status: 201 })
  } catch (error: any) {
    console.error('Upload erro:', error)
    return NextResponse.json(
      { error: 'Erro interno ao fazer upload da imagem.', details: error.message },
      { status: 500 }
    )
  }
}
