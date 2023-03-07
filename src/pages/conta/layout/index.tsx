import { ReactNode } from 'react'
import { UserHeader } from '../components/UserHeader'

interface AccountProps {
  children: ReactNode
}

export function AccountLayout({ children }: AccountProps) {
  return (
    <section className="container">
      <UserHeader />
      {children}
    </section>
  )
}
