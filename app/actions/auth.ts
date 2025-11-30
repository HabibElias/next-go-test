'use server'

import { cookies } from 'next/headers'

export async function login(email: string, password: string) {
  // eslint-disable-next-line node/prefer-global/process
  const res = await fetch(`${process.env.BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok)
    throw new Error('Invalid credentials')

  const { token } = await res.json();

  // Set cookie
  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    path: '/',
  })
}
