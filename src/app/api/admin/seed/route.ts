import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { hashPassword } from '@/lib/auth'

export async function GET() {
  try {
    // Verifica se já existe um usuário
    const count = await prisma.adminUser.count()
    
    if (count > 0) {
      return NextResponse.json({ message: 'Seed já foi executado. Admin existe.' })
    }

    // Cria o admin master
    const passwordHash = await hashPassword('123')
    
    await prisma.adminUser.create({
      data: {
        username: 'adm',
        passwordHash,
      },
    })

    return NextResponse.json({ success: true, message: 'Usuário adm criado com sucesso.' })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Erro ao executar seed' }, { status: 500 })
  }
}
