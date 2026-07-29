'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PropertyInput, propertySchema } from '@/lib/validations'
import { Save, AlertCircle, X, Plus, Upload, Trash2, Loader2 } from 'lucide-react'

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Props = {
  initialData?: PropertyInput & { id?: number }
}

type SelectOption = {
  id?: number
  label: string
  value: string
  isDefault: boolean
}

type OptionsMap = {
  category: SelectOption[]
  type: SelectOption[]
  purpose: SelectOption[]
}

type FieldKey = keyof OptionsMap

const FIELD_LABELS: Record<FieldKey, string> = {
  category: 'Categoria',
  type: 'Tipo',
  purpose: 'Finalidade',
}

// ─── Modal para adicionar nova opção ─────────────────────────────────────────

function AddOptionModal({
  field,
  onClose,
  onSaved,
}: {
  field: FieldKey
  onClose: () => void
  onSaved: (opt: SelectOption) => void
}) {
  const [label, setLabel]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!label.trim()) { setError('Informe o nome da opção.'); return }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/property-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          field,
          label: label.trim(),
          value: label.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro ao salvar.')
        setLoading(false)
        return
      }

      onSaved({ id: data.option.id, label: data.option.label, value: data.option.value, isDefault: false })
      onClose()
    } catch {
      setError('Erro de conexão.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-gray-900">Nova opção — {FIELD_LABELS[field]}</h3>
            <p className="text-gray-400 text-xs mt-0.5">Será adicionada ao formulário e aos filtros do site</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Nome da opção
            </label>
            <input
              autoFocus
              type="text"
              value={label}
              onChange={e => setLabel(e.target.value)}
              onKeyDown={e => e.key === 'Escape' && onClose()}
              maxLength={100}
              placeholder={
                field === 'category' ? 'Ex: Temporada' :
                field === 'type'     ? 'Ex: Industrial' :
                'Ex: Misto'
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs flex items-center gap-1.5">
              <AlertCircle size={12} /> {error}
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:border-gray-300 transition-all">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function PropertyForm({ initialData }: Props) {
  const router = useRouter()
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [newImage, setNewImage] = useState('')
  const [newFeature, setNewFeature] = useState('')

  // Estado de opções dinâmicas
  const [options, setOptions] = useState<OptionsMap>({
    category: [
      { label: 'Venda',   value: 'Venda',   isDefault: true },
      { label: 'Locação', value: 'Locação', isDefault: true },
    ],
    type: [
      { label: 'Urbano', value: 'URBANO', isDefault: true },
      { label: 'Rural',  value: 'RURAL',  isDefault: true },
    ],
    purpose: [
      { label: 'Residencial', value: 'Residencial', isDefault: true },
      { label: 'Comercial',   value: 'Comercial',   isDefault: true },
      { label: 'Rural',       value: 'Rural',       isDefault: true },
    ],
  })
  const [addModalField, setAddModalField] = useState<FieldKey | null>(null)

  // Busca as opções customizadas do banco ao montar
  useEffect(() => {
    fetch('/api/property-options')
      .then(r => r.json())
      .then((data: OptionsMap) => {
        if (data.category && data.type && data.purpose) {
          setOptions(data)
        }
      })
      .catch(() => { /* usa defaults hardcoded */ })
  }, [])

  const [formData, setFormData] = useState<PropertyInput>(
    initialData || {
      title: '',
      code: '',
      videoUrl: '',
      description: '',
      type: 'URBANO',
      category: 'Venda',
      purpose: 'Residencial',
      city: '',
      neighborhood: '',
      state: 'SP',
      price: 0,
      bedrooms: 0,
      suites: 0,
      bathrooms: 0,
      garageSpots: 0,
      area: 0,
      areaUnit: 'm²',
      builtArea: null,
      builtAreaUnit: null,
      imageUrl: '',
      images: [],
      features: [],
      isFeatured: false,
      isPublished: true,
      acceptsExchange: false,
    }
  )

  // Quando uma nova opção é salva, adiciona ao estado local e seleciona ela
  const handleOptionSaved = (field: FieldKey, opt: SelectOption) => {
    setOptions(prev => ({
      ...prev,
      [field]: [...prev[field], opt],
    }))
    setFormData(prev => ({ ...prev, [field]: opt.value }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const parsedData = {
        ...formData,
        price:       Number(formData.price),
        bedrooms:    Number(formData.bedrooms),
        suites:      Number(formData.suites),
        bathrooms:   Number(formData.bathrooms),
        garageSpots: Number(formData.garageSpots),
        area:        Number(formData.area),
        builtArea:   formData.builtArea ? Number(formData.builtArea) : null,
      }

      const result = propertySchema.safeParse(parsedData)

      if (!result.success) {
        const issues = result.error.issues.map(i => i.message).join(' | ')
        throw new Error(`Validação falhou: ${issues}`)
      }

      const url    = initialData?.id ? `/api/admin/properties/${initialData.id}` : `/api/admin/properties`
      const method = initialData?.id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro ao salvar imóvel')
      }

      router.push('/admin/imoveis')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      window.scrollTo(0, 0)
    } finally {
      setLoading(false)
    }
  }

  const handleAddImage = () => {
    if (!newImage) return
    setFormData({ ...formData, images: [...formData.images, newImage] })
    setNewImage('')
  }

  const handleRemoveImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })
  }

  const handleAddFeature = () => {
    if (!newFeature) return
    setFormData({ ...formData, features: [...formData.features, newFeature] })
    setNewFeature('')
  }

  const handleRemoveFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) })
  }

  const [uploadingCover,   setUploadingCover]   = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)

  const uploadFile = async (file: File) => {
    const data = new FormData()
    data.append('file', file)
    const res  = await fetch('/api/admin/upload', { method: 'POST', body: data })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Erro no upload')
    return json.url
  }

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingCover(true)
    setError(null)
    try {
      const url = await uploadFile(file)
      setFormData(prev => ({ ...prev, imageUrl: url }))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro no upload')
    } finally {
      setUploadingCover(false)
    }
  }

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploadingGallery(true)
    setError(null)
    try {
      const urls: string[] = []
      for (let i = 0; i < files.length; i++) {
        urls.push(await uploadFile(files[i]))
      }
      setFormData(prev => ({ ...prev, images: [...prev.images, ...urls] }))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro no upload')
    } finally {
      setUploadingGallery(false)
    }
  }

  // ─── Componente auxiliar: Select com botão + ──────────────────────────────
  const SelectWithAdd = ({
    field,
    value,
    onChange,
  }: {
    field: FieldKey
    value: string
    onChange: (v: string) => void
  }) => (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-bold text-gray-700">{FIELD_LABELS[field]}</label>
        <button
          type="button"
          onClick={() => setAddModalField(field)}
          title={`Adicionar nova opção de ${FIELD_LABELS[field]}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-2 py-0.5 rounded-lg transition-all"
        >
          <Plus size={11} /> nova
        </button>
      </div>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none"
      >
        {options[field].map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )

  return (
    <>
      <form onSubmit={handleSave} className="space-y-8 pb-20">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} className="shrink-0" />
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}

        {/* ── Status ── */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
            />
            <span className="font-bold text-gray-700">Imóvel Publicado (visível no site)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
            />
            <span className="font-bold text-gray-700">Imóvel em Destaque</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.acceptsExchange}
              onChange={e => setFormData({ ...formData, acceptsExchange: e.target.checked })}
              className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
            />
            <span className="font-bold text-gray-700">Aceita Permuta</span>
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">
            {/* ── Info Principal ── */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Informações Principais</h2>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Título do Imóvel</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none transition-all"
                  placeholder="Ex: Sítio Santa Rita - Oportunidade"
                />
              </div>

              {/* Selects dinâmicos com botão + */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectWithAdd
                  field="category"
                  value={formData.category}
                  onChange={v => setFormData({ ...formData, category: v })}
                />
                <SelectWithAdd
                  field="type"
                  value={formData.type}
                  onChange={v => setFormData({ ...formData, type: v })}
                />
                <SelectWithAdd
                  field="purpose"
                  value={formData.purpose}
                  onChange={v => setFormData({ ...formData, purpose: v })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preço (Contábil)</label>
                  <input
                    type="text"
                    required
                    value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(formData.price) || 0)}
                    onChange={e => {
                      const raw = e.target.value.replace(/[^0-9]/g, '')
                      setFormData({ ...formData, price: raw ? parseFloat(raw) / 100 : 0 })
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Código do Imóvel</label>
                  <input
                    type="text"
                    value={formData.code || ''}
                    onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none transition-all font-mono uppercase"
                    placeholder="Ex: CA001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Descrição Completa</label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none transition-all resize-none"
                  placeholder="Descreva o imóvel em detalhes..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">URL do Vídeo (Opcional)</label>
                <input
                  type="url"
                  value={formData.videoUrl || ''}
                  onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none transition-all"
                  placeholder="Link do YouTube, TikTok ou Instagram..."
                />
              </div>
            </div>

            {/* ── Localização ── */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Localização</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Bairro / Região</label>
                  <input
                    type="text"
                    required
                    value={formData.neighborhood}
                    onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Cidade</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none"
                    />
                  </div>
                  <div className="w-24 shrink-0">
                    <label className="block text-sm font-bold text-gray-700 mb-2">UF</label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none text-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Imagens ── */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Imagens do Imóvel</h2>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Foto de Capa (Principal)</label>
                <label className="flex-1 cursor-pointer">
                  <div className={`w-full px-4 py-3 rounded-xl border-2 border-dashed transition-all text-center flex items-center justify-center gap-2 ${uploadingCover ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-300 hover:border-brand-500 hover:bg-gray-50 text-gray-600'}`}>
                    <Upload size={20} />
                    <span className="font-medium">{uploadingCover ? 'Enviando...' : 'Selecionar Imagem do Computador'}</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploadingCover} className="hidden" />
                </label>
                {formData.imageUrl && (
                  <div className="mt-4 relative aspect-video w-full md:w-1/2 rounded-lg overflow-hidden border border-gray-200">
                    <img src={formData.imageUrl} alt="Capa" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Galeria de Fotos Adicionais</label>
                <label className="cursor-pointer">
                  <div className={`w-full px-4 py-3 rounded-xl border-2 border-dashed transition-all text-center flex items-center justify-center gap-2 ${uploadingGallery ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-300 hover:border-brand-500 hover:bg-gray-50 text-gray-600'}`}>
                    <Upload size={20} />
                    <span className="font-medium">{uploadingGallery ? 'Enviando Imagens...' : 'Selecionar Múltiplas Imagens (Galeria)'}</span>
                  </div>
                  <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} disabled={uploadingGallery} className="hidden" />
                </label>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    {formData.images.map((img, i) => (
                      <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => handleRemoveImage(i)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                          <Trash2 size={24} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Coluna Lateral Direita ── */}
          <div className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Características</h2>

              <div className="grid grid-cols-2 gap-4">
                {(['bedrooms', 'suites', 'bathrooms', 'garageSpots'] as const).map(field => (
                  <div key={field}>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      {field === 'bedrooms' ? 'Quartos' : field === 'suites' ? 'Suítes' : field === 'bathrooms' ? 'Banheiros' : 'Vagas'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData[field]}
                      onChange={e => setFormData({ ...formData, [field]: e.target.value as unknown as number })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none"
                    />
                  </div>
                ))}
              </div>

              <hr className="border-gray-100" />

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Área Total</label>
                    <input type="number" min="0" step="0.01" required value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value as unknown as number })} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none" />
                  </div>
                  <div className="w-24 shrink-0">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Unid.</label>
                    <select value={formData.areaUnit} onChange={e => setFormData({ ...formData, areaUnit: e.target.value as 'm²' | 'ha' | 'alq' })} className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none">
                      <option value="m²">m²</option>
                      <option value="ha">ha</option>
                      <option value="alq">alq</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Área Const. (Opcional)</label>
                    <input type="number" min="0" step="0.01" value={formData.builtArea || ''} onChange={e => setFormData({ ...formData, builtArea: e.target.value ? e.target.value as unknown as number : null })} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none" />
                  </div>
                  <div className="w-24 shrink-0">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Unid.</label>
                    <select value={formData.builtAreaUnit || 'm²'} onChange={e => setFormData({ ...formData, builtAreaUnit: e.target.value as 'm²' | 'ha' | 'alq' })} className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none">
                      <option value="m²">m²</option>
                      <option value="ha">ha</option>
                      <option value="alq">alq</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Diferenciais (Tags)</label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={e => setNewFeature(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-500 outline-none text-sm"
                    placeholder="Ex: Piscina"
                  />
                  <button type="button" onClick={handleAddFeature} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors">
                    <Plus size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 border border-brand-100 rounded-lg text-sm font-medium">
                      {f}
                      <button type="button" onClick={() => handleRemoveFeature(i)} className="hover:text-red-500">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky top-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-brand-200 transition-all disabled:opacity-70 flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={24} />
                    {initialData?.id ? 'Salvar Alterações' : 'Publicar Imóvel'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Modal de adicionar nova opção */}
      {addModalField && (
        <AddOptionModal
          field={addModalField}
          onClose={() => setAddModalField(null)}
          onSaved={opt => handleOptionSaved(addModalField, opt)}
        />
      )}
    </>
  )
}
