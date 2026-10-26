import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'
import { hashPassword } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Verifica se já existe o usuário adm
    const adminExists = await prisma.adminUser.findUnique({
      where: { username: 'adm' },
    })
    
    if (adminExists) {
      if (adminExists.role !== 'MASTER') {
        await prisma.adminUser.update({
          where: { id: adminExists.id },
          data: { role: 'MASTER' },
        })
      }
      return NextResponse.json({ message: 'Seed já foi executado. Admin master existe.' })
    }

    // Cria o admin master
    const passwordHash = await hashPassword('123')
    
    await prisma.adminUser.create({
      data: {
        username: 'adm',
        passwordHash,
        role: 'MASTER',
      },
    })

    return NextResponse.json({ success: true, message: 'Usuário master "adm" criado com sucesso.' })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Erro ao executar seed' }, { status: 500 })
  }
}
