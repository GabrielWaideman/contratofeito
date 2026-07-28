import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'
import AdminClientLayout from './AdminClientLayout'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const headerList = headers()
  const pathname = headerList.get('x-pathname') || ''

  // A rota de login não precisa do shell do painel e nem da validação rigorosa
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const cookieStore = cookies()
  const token = cookieStore.get('cf_admin_token')?.value

  if (!token) {
    redirect('/admin/login')
  }

  // Validação criptográfica rigorosa executada de forma segura no Servidor (Node Runtime)
  // Isso blinda o painel contra Layout Leak: um token falso nunca chegará a renderizar o Client Component
  const payload = verifyToken(token)
  
  if (!payload) {
    redirect('/admin/login')
  }

  return (
    <AdminClientLayout>
      {children}
    </AdminClientLayout>
  )
}
