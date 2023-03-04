import { ReactNode } from 'react'

interface LoginLayoutProps {
  children: ReactNode
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div>
      <p>Layout Login</p>
      {children}
    </div>
  )
}
