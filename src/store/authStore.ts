// src/store/authStore.ts
import { defineStore } from 'pinia'

interface User {
  id: number
  email: string
  name: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),
  actions: {
    async login(credentials: { email: string; password: string }) {
      this.loading = true
      this.error = null

      // Simulamos una base de datos local
      const fakeUsers = [
        { id: 1, email: 'admin@example.com', name: 'Admin', password: '123456' },
        { id: 2, email: 'user@example.com', name: 'User', password: 'password' }
      ]

      // Simular tiempo de espera de API (1s)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const foundUser = fakeUsers.find(
        (user) => user.email === credentials.email && user.password === credentials.password
      )

      if (foundUser) {
        this.user = { id: foundUser.id, email: foundUser.email, name: foundUser.name }
        this.token = 'fake-token-' + foundUser.id

        localStorage.setItem('token', this.token)
      } else {
        this.error = 'Correo o contraseña incorrectos'
      }

      this.loading = false
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
