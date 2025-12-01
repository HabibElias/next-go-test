'use server'
import type { LoginSchema } from '@/lib/schema/login_schema'
import { cookies } from 'next/headers'

export async function onLogin(data: LoginSchema) {
  try {
    const cookieStore = await cookies()
    const res = await fetch(`http://localhost:8000/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, password: data.password }),
    })

    const payload = await res.json()

    if (!res.ok) {
      throw new Error(payload.error ?? 'Somethings Wrong')
    }

    cookieStore.set('token', payload.token)
    return payload
  }
  catch (err) {
    console.error(err)
  }
}
