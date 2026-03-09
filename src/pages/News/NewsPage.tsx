import { useState } from 'react'
import { useNews } from '../../hooks/useNews'
import type { News } from '../../types'

// Colores por categoría para los badges
const CATEGORY_COLORS: Record<string, string> = {
  'Competición':  'bg-red-100 text-red-700',
  'Instalaciones':'bg-blue-100 text-blue-700',
  'Entrenamiento':'bg-green-100 text-green-700',
  'Salud':        'bg-purple-100 text-purple-700',
  'Viajes':       'bg-yellow-100 text-yellow-700',
  'Equipo':       'bg-orange-100 text-orange-700',
  'Entrevistas':  'bg-pink-100 text-pink-700',
}

const DEFAULT_COLOR = 'bg-gray-100 text-gray-700'

export default function NewsPage() {
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('')

  const { news, categories, loading, error } = useNews({
    search: search || undefined,
    categoria: categoria || undefined,
  })

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500 text-lg">Cargando noticias...</p>
    </div>
  )

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📰 Noticias
      </h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Buscar noticias..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las categorías</option>
          {/* Las categorías vienen de la API, no están hardcodeadas */}
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Contador */}
      <p className="text-gray-500 mb-4">{news.length} noticias encontradas</p>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item: News) => (
          <div key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition flex flex-col overflow-hidden">

            {/* Imagen */}
            {item.imagenUrl && (
              <img
                src={item.imagenUrl}
                alt={item.titulo}
                className="w-full h-48 object-cover"
                // Si la imagen falla, la ocultamos en lugar de mostrar icono roto
                onError={e => (e.currentTarget.style.display = 'none')}
              />
            )}

            <div className="p-5 flex flex-col flex-1">
              {/* Categoría + Destacado */}
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  CATEGORY_COLORS[item.categoria] ?? DEFAULT_COLOR
                }`}>
                  {item.categoria}
                </span>
                {item.destacado && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                    ⭐ Destacado
                  </span>
                )}
              </div>

              {/* Título */}
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {item.titulo}
              </h2>

              {/* Resumen */}
              <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-3">
                {item.resumen}
              </p>

              {/* Footer: autor + fecha */}
              <div className="flex justify-between items-center text-xs text-gray-400 border-t pt-3 mt-auto">
                <span>✍️ {item.autor}</span>
                <span>
                  {new Date(item.fechaPublicacion).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}