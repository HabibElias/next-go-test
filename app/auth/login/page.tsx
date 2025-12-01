'use client'

import type { LoginSchema } from '@/lib/schema/login_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { onLogin } from '@/app/actions/auth'
import { loginSchema } from '@/lib/schema/login_schema'
import { useAuthStore } from '@/store/useAuthStore'

function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } }
    = useForm<LoginSchema>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: '', password: '' },
    })

  const router = useRouter()
  const { setUser, setToken } = useAuthStore()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSubmit(data: LoginSchema) {
    const result = await onLogin(data)

    if (result.token) {
      setToken(result.user) // 🔥 update Zustand on client
    }
    if (result.user) {
      setUser(result.user) // 🔥 update Zustand on client
      router.push('/')
    }
    else {
      setErrorMessage('Something went wrong')
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

export default Login
