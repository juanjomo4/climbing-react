export interface Gym {
  id: number
  name: string
  city: string
  country: string
  address: string
  type: 'BOULDER' | 'ROUTES' | 'MIXED'
  website: string
  latitude: number
  longitude: number
}

export interface ClimbingShoe {
  id: number
  marca: string
  modelo: string
  precio: number
  descripcion: string
  imagenUrl: string
  tallaMinima: number
  tallaMaxima: number
  tipoCierre: string
  rigidez: string
  destacado: boolean
  fechaCreacion: string
}

export interface News {
  id: number
  titulo: string
  resumen: string
  contenido: string
  imagenUrl: string
  autor: string
  fechaPublicacion: string
  destacado: boolean
  categoria: string
  fechaCreacion: string
}