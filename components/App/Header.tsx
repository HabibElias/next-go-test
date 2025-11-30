'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import ColorMode from './ColorMode'

function Header() {
  const pathname = usePathname()
  const { token, user } = useAuthStore()

  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">Todo App</Link>
      <div className="space-x-4">

        {user !== null && (
          <div className="dropdown dropdown-hover dropdown-center">
            <div tabIndex={0} role="button" className="mb-2">
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                  <span className="text-xl">{user.name.slice(0, 1).toUpperCase()}</span>
                </div>
              </div>
            </div>
            <div tabIndex={-1} className="dropdown-content menu bg-base-300 rounded-box z-1 w-42 p-2 space-y-5 shadow-sm">
              <div>
                Name:
                {` ${user.name}`}
              </div>
              <div className="btn btn-primary">Logout</div>
            </div>
          </div>
        )}

        {
          token === '' && (
            <div className="inline">
              {
                pathname !== '/auth/login'
                  ? (
                      <Link href="/auth/login" className="btn btn-primary">
                        Login
                      </Link>
                    )
                  : (
                      <Link href="/auth/sign-up" className="btn btn-primary">
                        Sign Up
                      </Link>
                    )
              }
            </div>
          )
        }

        {/* COLOR MODE CONTROLLER */}
        <ColorMode />
      </div>
    </div>
  )
}

export default Header
