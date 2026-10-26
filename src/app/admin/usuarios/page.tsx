'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users, Plus, Pencil, Trash2, Shield, ShieldCheck, X,
  Eye, EyeOff, Loader2, AlertTriangle, Check, UserPlus,
} from 'lucide-react'

// ─── Tipos ────────────────────────────────────────────────────────────────────
type AdminUser = {
  id: number
  username: string
  role: string
  isActive: boolean
  createdAt: string
  lastLoginAt: string | null
}

type FormData = {
  username: string
  password: string
  role: 'MASTER' | 'STANDARD'
  isActive: boolean
}

const emptyForm: FormData = {
  username: '',
  password: '',
  role: 'STANDARD',
  isActive: true,
}

// ─── Componente de Badge ──────────────────────────────────────────────────────
function RoleBadge({ role }: { role: string }) {
  if (role === 'MASTER') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">
        <ShieldCheck size={13} />
        Master
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
      <Shield size={13} />
      Padrão
    </span>
  )
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  if (isActive) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-bold">
        <Check size={13} />
        Ativo
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-bold">
      <EyeOff size={13} />
      Inativo
    </span>
  )
}

// ─── Página de Gerenciamento ──────────────────────────────────────────────────
export default function AdminUsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null)
  const [deleting, setDeleting] = useState(false)

  // ─── Buscar dados ───────────────────────────────────────────────────────────
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      if (res.status === 403) {
        router.push('/admin')
        return
      }
      const data = await res.json()
      if (Array.isArray(data)) setUsers(data)
    } catch {
      // silencioso
    } finally {
      setLoading(false)
    }
  }

  const fetchMe = async () => {
    try {
      const res = await fetch('/api/admin/me')
      const data = await res.json()
      if (data.userId) setCurrentUserId(data.userId)
      if (data.role !== 'MASTER') {
        router.push('/admin')
      }
    } catch {
      router.push('/admin')
    }
  }

  useEffect(() => {
    fetchMe()
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── Modal handlers ─────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setEditingUser(null)
    setForm(emptyForm)
    setError('')
    setShowPassword(false)
    setModalOpen(true)
  }

  const openEditModal = (user: AdminUser) => {
    setEditingUser(user)
    setForm({
      username: user.username,
      password: '',
      role: user.role as 'MASTER' | 'STANDARD',
      isActive: user.isActive,
    })
    setError('')
    setShowPassword(false)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingUser(null)
    setForm(emptyForm)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const isEditing = editingUser !== null
      const url = isEditing ? `/api/admin/users/${editingUser.id}` : '/api/admin/users'
      const method = isEditing ? 'PUT' : 'POST'

      const payload: Record<string, unknown> = {
        username: form.username,
        role: form.role,
        isActive: form.isActive,
      }

      // Só envia senha se preenchida (no edit) ou sempre (no create)
      if (!isEditing || (form.password && form.password.length > 0)) {
        payload.password = form.password
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro ao salvar.')
        setSaving(false)
        return
      }

      closeModal()
      await fetchUsers()
    } catch {
      setError('Erro de rede.')
    } finally {
      setSaving(false)
    }
  }

  // ─── Delete handler ─────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)

    try {
      const res = await fetch(`/api/admin/users/${deleteTarget.id}`, { method: 'DELETE' })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro ao excluir.')
        setDeleteTarget(null)
        setDeleting(false)
        return
      }

      setDeleteTarget(null)
      await fetchUsers()
    } catch {
      setError('Erro de rede.')
    } finally {
      setDeleting(false)
    }
  }

  // ─── Formatar data ──────────────────────────────────────────────────────────
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—'
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }).format(new Date(dateStr))
  }

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
              <Users size={22} />
            </div>
            Usuários
          </h1>
          <p className="text-gray-500 mt-1">Gerencie os acessos ao painel administrativo.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
        >
          <UserPlus size={18} />
          Novo Usuário
        </button>
      </div>

      {/* Error toast */}
      {error && !modalOpen && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-semibold">
          <AlertTriangle size={18} className="shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tabela */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-20 text-gray-400">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm font-medium">Carregando usuários...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <Users size={40} className="text-gray-200" />
            <p className="text-sm font-medium">Nenhum usuário encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Usuário</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Permissão</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Criado em</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Último Login</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => {
                  const isSelf = user.id === currentUserId
                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${
                            user.role === 'MASTER'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-brand-50 text-brand-600'
                          }`}>
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 text-sm">{user.username}</span>
                            {isSelf && (
                              <span className="ml-2 text-[10px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-md">
                                Você
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge isActive={user.isActive} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                        {formatDate(user.lastLoginAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(user)}
                            title="Editar"
                            className="p-2 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
                          >
                            <Pencil size={16} />
                          </button>
                          {!isSelf && (
                            <button
                              onClick={() => setDeleteTarget(user)}
                              title="Excluir"
                              className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─── Modal Criar / Editar ──────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
                  {editingUser ? <Pencil size={18} /> : <UserPlus size={18} />}
                </div>
                <div>
                  <h2 className="font-black text-gray-900">
                    {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {editingUser ? `Editando: ${editingUser.username}` : 'Preencha os dados abaixo'}
                  </p>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-semibold">
                  <AlertTriangle size={16} className="shrink-0" />
                  {error}
                </div>
              )}

              {/* Username */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nome de Usuário</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="ex: corretor_joao"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm font-medium"
                />
                <p className="text-xs text-gray-400 mt-1">Apenas letras, números e underscore (_)</p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Senha {editingUser && <span className="font-normal text-gray-400">(deixe vazio para manter a atual)</span>}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder={editingUser ? '••••••••' : 'Mínimo 4 caracteres'}
                    required={!editingUser}
                    minLength={editingUser ? 0 : 4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm font-medium pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nível de Acesso</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, role: 'STANDARD' })}
                    className={`flex items-center gap-2 p-3.5 rounded-xl border-2 transition-all text-left ${
                      form.role === 'STANDARD'
                        ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <Shield size={18} className={form.role === 'STANDARD' ? 'text-brand-600' : 'text-gray-400'} />
                    <div>
                      <p className={`text-sm font-bold ${form.role === 'STANDARD' ? 'text-brand-700' : 'text-gray-700'}`}>
                        Padrão
                      </p>
                      <p className="text-[10px] text-gray-400">Acesso ao painel</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, role: 'MASTER' })}
                    className={`flex items-center gap-2 p-3.5 rounded-xl border-2 transition-all text-left ${
                      form.role === 'MASTER'
                        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-500/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <ShieldCheck size={18} className={form.role === 'MASTER' ? 'text-amber-600' : 'text-gray-400'} />
                    <div>
                      <p className={`text-sm font-bold ${form.role === 'MASTER' ? 'text-amber-700' : 'text-gray-700'}`}>
                        Master
                      </p>
                      <p className="text-[10px] text-gray-400">Acesso pleno</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Active toggle */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-gray-700">Conta ativa</p>
                  <p className="text-xs text-gray-400">Contas inativas não conseguem fazer login</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, isActive: !form.isActive })}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    form.isActive ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    form.isActive ? 'left-[22px]' : 'left-0.5'
                  }`} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      {editingUser ? 'Salvar Alterações' : 'Criar Usuário'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Modal Confirmação de Exclusão ─────────────────────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto p-6 text-center space-y-5">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle size={32} />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">Excluir Usuário</h3>
              <p className="text-sm text-gray-500 mt-1">
                Tem certeza que deseja excluir <strong className="text-gray-900">{deleteTarget.username}</strong>?
              </p>
              <p className="text-xs text-red-500 font-semibold mt-2">Esta ação não pode ser desfeita.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Excluir
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
