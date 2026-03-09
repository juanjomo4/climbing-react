import axios from 'axios'

// Equivalente a HttpClient con una baseURL configurada
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api