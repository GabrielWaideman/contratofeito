'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Save,
  Loader2,
  Upload,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Info,
  Target,
  Eye,
  Shield,
  MapPin,
  User,
  Trash2,
  Plus,
  X,
} from 'lucide-react'

// ─── Tipos ────────────────────────────────────────────────────────────────────
type ValueItem = { title: string; text: string }

type FormData = {
  heroTitle: string
  heroSubtitle: string
  bannerImageUrl: string
  historyText: string
  historyImageUrl: string
  missionText: string
  visionText: string
  valuesText: ValueItem[]
  cityName: string
  cityText: string
  cityImageUrl: string
  agentName: string
  agentCreci: string
  agentPhone: string
  agentWhatsapp: string
  agentImageUrl: string
  agentBio: string
}

const emptyForm: FormData = {
  heroTitle: '',
  heroSubtitle: '',
  bannerImageUrl: '',
  historyText: '',
  historyImageUrl: '',
  missionText: '',
  visionText: '',
  valuesText: [],
  cityName: '',
  cityText: '',
  cityImageUrl: '',
  agentName: '',
  agentCreci: '',
  agentPhone: '',
  agentWhatsapp: '',
  agentImageUrl: '',
  agentBio: '',
}

// ─── Toast interno ────────────────────────────────────────────────────────────
function Toast({
  type,
  message,
  onClose,
}: {
  type: 'success' | 'error'
  message: string
  onClose: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl text-white text-sm font-semibold animate-fade-in-down ${
        type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
      }`}
    >
      {type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  )
}

// ─── Seção accordion ─────────────────────────────────────────────────────────
function Section({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center">
            <Icon size={17} className="text-brand-600" />
          </div>
          <span className="font-bold text-gray-900 text-base">{title}</span>
        </div>
        {open ? (
          <ChevronUp size={18} className="text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-400" />
        )}
      </button>
      {open && <div className="px-6 pb-6 space-y-5 border-t border-gray-100 pt-5">{children}</div>}
    </div>
  )
}

// ─── Campo de texto ────────────────────────────────────────────────────────────
function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

// ─── Upload de imagem ─────────────────────────────────────────────────────────
function ImageUploader({
  label,
  value,
  onChange,
  hint,
  recommended,
}: {
  label: string
  value: string
  onChange: (url: string) => void
  hint?: string
  recommended?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/about/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro no upload')
      onChange(data.url)
    } catch (err: unknown) {
      const e = err as Error
      setError(e.message)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
          {label}
        </label>
        {recommended && (
          <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Ideal: {recommended}
          </span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        {value && (
          <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <X size={10} />
            </button>
          </div>
        )}
        <div className="flex-1 space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... (cole uma URL ou faça upload)"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <><Loader2 size={13} className="animate-spin" /> Enviando...</>
            ) : (
              <><Upload size={13} /> Fazer Upload</>
            )}
          </button>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          {!value && (
            <div className="w-full h-20 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
              <ImageIcon size={20} />
            </div>
          )}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {hint && <p className="text-xs text-gray-400 mt-2">{hint}</p>}
    </div>
  )
}

// ─── Editor de Valores ────────────────────────────────────────────────────────
function ValuesEditor({
  values,
  onChange,
}: {
  values: ValueItem[]
  onChange: (v: ValueItem[]) => void
}) {
  const update = (idx: number, field: 'title' | 'text', val: string) => {
    const next = [...values]
    next[idx] = { ...next[idx], [field]: val }
    onChange(next)
  }

  const remove = (idx: number) => {
    onChange(values.filter((_, i) => i !== idx))
  }

  const add = () => {
    onChange([...values, { title: '', text: '' }])
  }

  return (
    <div className="space-y-4">
      {values.map((v, idx) => (
        <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative">
          <button
            type="button"
            onClick={() => remove(idx)}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={14} />
          </button>
          <div className="space-y-3 pr-8">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Título do Valor #{idx + 1}
              </label>
              <input
                type="text"
                value={v.title}
                onChange={(e) => update(idx, 'title', e.target.value)}
                placeholder="Ex: Ética e Transparência"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Descrição
              </label>
              <textarea
                value={v.text}
                onChange={(e) => update(idx, 'text', e.target.value)}
                rows={3}
                placeholder="Descreva este princípio..."
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="w-full border-2 border-dashed border-gray-300 hover:border-brand-500 text-gray-400 hover:text-brand-600 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <Plus size={15} /> Adicionar Valor / Princípio
      </button>
    </div>
  )
}

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function AdminSobrePage() {
  const [form, setForm] = useState<FormData>(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const set = (key: keyof FormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }))

  const showToast = (type: 'success' | 'error', message: string) =>
    setToast({ type, message })

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/about')
      if (res.ok) {
        const d = await res.json()
        if (d) {
          setForm({
            ...d,
            valuesText:
              typeof d.valuesText === 'string' ? JSON.parse(d.valuesText) : d.valuesText || [],
            bannerImageUrl: d.bannerImageUrl || '',
            historyImageUrl: d.historyImageUrl || '',
            cityImageUrl: d.cityImageUrl || '',
            agentImageUrl: d.agentImageUrl || '',
            agentBio: d.agentBio || '',
          })
        }
      }
    } catch (err) {
      console.error(err)
      showToast('error', 'Erro ao carregar dados.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        valuesText: JSON.stringify(form.valuesText),
      }
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Erro ao salvar')
      }
      showToast('success', 'Página Sobre Nós atualizada com sucesso!')
    } catch (err: unknown) {
      const e = err as Error
      showToast('error', e.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-brand-600" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Sobre Nós</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Gerencie o conteúdo da página Sobre Nós do site público.
        </p>
        <a
          href="/sobre"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 text-xs font-semibold mt-2 underline underline-offset-2"
        >
          Ver página pública →
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hero */}
        <Section title="Hero / Cabeçalho" icon={Info} defaultOpen>
          <Field label="Título Principal" hint="Aparece como o título grande da página">
            <input
              type="text"
              value={form.heroTitle}
              onChange={(e) => setForm((p) => ({ ...p, heroTitle: e.target.value }))}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </Field>
          <Field label="Subtítulo" hint="Frase descritiva abaixo do título">
            <textarea
              value={form.heroSubtitle}
              onChange={(e) => setForm((p) => ({ ...p, heroSubtitle: e.target.value }))}
              required
              rows={2}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            />
          </Field>
          <ImageUploader
            label="Imagem de Fundo do Hero"
            value={form.bannerImageUrl}
            onChange={set('bannerImageUrl')}
            recommended="1920 × 650 px (landscape)"
            hint="Opcional — se não houver imagem, um gradiente escuro é usado como fundo"
          />
        </Section>

        {/* História */}
        <Section title="Nossa História" icon={Info}>
          <Field
            label="Texto de História"
            hint="Separe os parágrafos com uma linha em branco (tecle Enter duas vezes)"
          >
            <textarea
              value={form.historyText}
              onChange={(e) => setForm((p) => ({ ...p, historyText: e.target.value }))}
              required
              rows={14}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y font-mono"
            />
          </Field>
          <div className="pt-2">
            <ImageUploader
              label="Imagem da Seção"
              value={form.historyImageUrl}
              onChange={set('historyImageUrl')}
              recommended="600 × 800 px (portrait)"
              hint="Opcional — imagem vertical que preenche o espaço ao lado dos quadros de Missão/Visão"
            />
          </div>
        </Section>

        {/* Missão e Visão */}
        <Section title="Missão e Visão" icon={Target}>
          <Field label="Missão">
            <textarea
              value={form.missionText}
              onChange={(e) => setForm((p) => ({ ...p, missionText: e.target.value }))}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            />
          </Field>
          <Field label="Visão">
            <textarea
              value={form.visionText}
              onChange={(e) => setForm((p) => ({ ...p, visionText: e.target.value }))}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            />
          </Field>
        </Section>

        {/* Valores e Princípios */}
        <Section title="Valores e Princípios" icon={Shield}>
          <ValuesEditor
            values={form.valuesText}
            onChange={(v) => setForm((p) => ({ ...p, valuesText: v }))}
          />
        </Section>

        {/* Álvares Florence */}
        <Section title="Álvares Florence" icon={MapPin}>
          <Field label="Nome da Cidade">
            <input
              type="text"
              value={form.cityName}
              onChange={(e) => setForm((p) => ({ ...p, cityName: e.target.value }))}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </Field>
          <Field label="Texto sobre a Cidade">
            <textarea
              value={form.cityText}
              onChange={(e) => setForm((p) => ({ ...p, cityText: e.target.value }))}
              required
              rows={6}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
            />
          </Field>
          <ImageUploader
            label="Foto da Cidade"
            value={form.cityImageUrl}
            onChange={set('cityImageUrl')}
            recommended="1200 × 700 px (landscape)"
            hint="Recomendado: fotografia horizontal da cidade ou região"
          />
        </Section>

        {/* Corretor */}
        <Section title="Corretor Responsável" icon={User}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Nome Completo">
              <input
                type="text"
                value={form.agentName}
                onChange={(e) => setForm((p) => ({ ...p, agentName: e.target.value }))}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </Field>
            <Field label="CRECI" hint="Ex: CRECI SP 246817 F">
              <input
                type="text"
                value={form.agentCreci}
                onChange={(e) => setForm((p) => ({ ...p, agentCreci: e.target.value }))}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </Field>
            <Field label="Telefone / Celular">
              <input
                type="text"
                value={form.agentPhone}
                onChange={(e) => setForm((p) => ({ ...p, agentPhone: e.target.value }))}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </Field>
            <Field label="Link do WhatsApp" hint="URL completa do link de contato">
              <input
                type="url"
                value={form.agentWhatsapp}
                onChange={(e) => setForm((p) => ({ ...p, agentWhatsapp: e.target.value }))}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </Field>
          </div>

          <Field label="Biografia / Apresentação" hint="Texto curto de apresentação do corretor">
            <textarea
              value={form.agentBio}
              onChange={(e) => setForm((p) => ({ ...p, agentBio: e.target.value }))}
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            />
          </Field>

          <ImageUploader
            label="Foto do Corretor"
            value={form.agentImageUrl}
            onChange={set('agentImageUrl')}
            recommended="600 × 600 px (quadrado 1:1)"
            hint="Recomendado: foto com rosto visível, enquadramento neutro"
          />
        </Section>

        {/* Salvar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm"
          >
            {saving ? (
              <><Loader2 size={16} className="animate-spin" /> Salvando...</>
            ) : (
              <><Save size={16} /> Salvar Alterações</>
            )}
          </button>
        </div>
      </form>

      {/* Toast */}
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
