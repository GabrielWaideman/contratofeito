import { NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: Request) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Apenas imagens são permitidas.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `sobre/${uniqueSuffix}-${cleanName}`

    const { data, error } = await supabase
      .storage
      .from('imoveis')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error('Supabase upload erro:', error)
      return NextResponse.json({ error: 'Erro ao fazer upload da imagem.' }, { status: 500 })
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('imoveis')
      .getPublicUrl(filename)

    return NextResponse.json({ url: publicUrlData.publicUrl }, { status: 201 })
  } catch (error: unknown) {
    const err = error as Error
    console.error('Upload sobre erro:', error)
    return NextResponse.json(
      { error: 'Erro interno ao fazer upload.', details: err.message },
      { status: 500 }
    )
  }
}
