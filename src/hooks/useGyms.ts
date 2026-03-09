import { useState, useEffect } from 'react'
import { getGyms } from '../services/gymService'
import type { Gym } from '../types'

// Estos son los filtros que acepta el hook, equivalente
// a los @Input() de un componente Angular
interface GymFilters {
  country?: string
  city?: string
  type?: string
  name?: string
}

interface UseGymsResult {
  gyms: Gym[]
  loading: boolean
  error: string | null
}

export const useGyms = (filters?: GymFilters): UseGymsResult => {
  const [gyms, setGyms] = useState<Gym[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Esto es tu ngOnInit: se ejecuta al montar el componente
    const fetchGyms = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getGyms(filters)
        setGyms(response.data)
      } catch (err) {
        setError('Error al cargar los rocódromos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchGyms()
  // El array de dependencias es clave: el efecto se re-ejecuta
  // cuando cambian los filtros, equivalente a ngOnChanges
  }, [filters?.country, filters?.city, filters?.type, filters?.name])

  return { gyms, loading, error }
}