import { create } from 'zustand'

export interface User {
  id: number
  email: string
  name: string
}

interface AuthState {
  token: string | null
  user: User | null
  setUser: (v: User) => void
  setToken: (v: string) => void
}

export const useAuthStore = create<AuthState>(set => ({
  token: '',
  setToken: (v: string) => set({ token: v }),
  user: null,
  setUser: (v: User) => set({ user: v }),
}))
