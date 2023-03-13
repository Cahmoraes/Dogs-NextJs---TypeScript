import { Head } from '@/components/Head'
import { useUserStorage } from '@/hooks/useUserStorage'
import { ReactNode } from 'react'
import { UserHeader } from '../components/UserHeader'

interface AccountProps {
  children: ReactNode
}

export function AccountLayout({ children }: AccountProps) {
  const { user } = useUserStorage()

  return (
    <section className="container">
      <Head>{user?.nome}</Head>
      <UserHeader />
      <br />
      {children}
    </section>
  )
}
