// import { cookies } from 'next/headers'
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
  // init: () => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
  token: '',
  setToken: (v: string) => set({ token: v }),
  user: null,
  setUser: (v: User) => set({ user: v }),
  // init: async () => {
  //   'use server'
  //   const cookieStore = await cookies()

  //   const token = cookieStore.get('token')

  //   const res = await fetch('http://localhost:8000/me', {headers: })

  //   const payload = res.json()
  // },
}))
