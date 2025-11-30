'use client'
import type { LoginSchema } from '@/lib/schema/login_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '@/lib/schema/login_schema'
import { useAuthStore } from '@/store/useAuthStore'

function login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } }
    = useForm<LoginSchema>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: '', password: '' },
    })

  const router = useRouter()
  const { setUser, setToken } = useAuthStore()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSubmit(data: LoginSchema) {
    try {
      const res = await fetch(`http://localhost:8000/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })

      const payload = await res.json()

      if (!res.ok) {
        throw new Error(payload.error ?? 'Somethings Wrong')
      }

      setToken(payload.token)
      setUser(payload.user)

      // Backend should set an HttpOnly cookie via Set-Cookie; we don't receive token in JS.
      setErrorMessage(null)
      router.push('/')
    }
    catch (err) {
      console.error(err)
      setErrorMessage(err instanceof Error ? err.message : String(err))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center min-h-[80vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-base">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" {...register('email')} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" {...register('password')} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

        <Link href="/auth/sign-up" className="link text-center mt-2 text-primary">Doesn't have an account? click here</Link>

        <button
          disabled={isSubmitting}
          className="btn btn-primary mt-4"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        {errorMessage && <p style={{ color: 'red', marginTop: 8 }}>{errorMessage}</p>}
      </fieldset>
    </form>
  )
}

export default login
