import { useState, useEffect } from 'react'
import { getShoes } from '../services/shoeService'
import type { ClimbingShoe } from '../types'

// Estos son los filtros que acepta el hook, equivalente
// a los @Input() de un componente Angular
interface ShoeFilters {
  search?: string
  minPrice?: number
  maxPrice?: number
}

interface UseShoesResult {
  shoes: ClimbingShoe[]
  loading: boolean
  error: string | null
}

export const useShoes = (filters?: ShoeFilters): UseShoesResult => {
  const [shoes, setShoes] = useState<ClimbingShoe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Esto es tu ngOnInit: se ejecuta al montar el componente
    const fetchShoes = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getShoes(filters)
        setShoes(response.data)
      } catch (err) {
        setError('Error al cargar los zapatos de escalada')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchShoes()
  // El array de dependencias es clave: el efecto se re-ejecuta
  // cuando cambian los filtros, equivalente a ngOnChanges
  }, [filters?.search, filters?.minPrice, filters?.maxPrice])

  return { shoes, loading, error }
}