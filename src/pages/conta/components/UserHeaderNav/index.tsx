import { useUserStorage } from '@/hooks/useUserStorage'
import Link from 'next/link'
import { UserHeaderNavContainer } from './styles'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { FeedIcon } from '@/assets/images/feed'
import { StatsIcon } from '@/assets/images/estatisticas'
import { AddIcon } from '@/assets/images/adicionar'
import { ExitIcon } from '@/assets/images/sair'

export function UserHeaderNav() {
  const { userLogout } = useUserStorage()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  function renderOnlyIsMobile(text: string) {
    return isMobile && text
  }

  function isActiveLink(path: string) {
    return (
      router.pathname === path && {
        className: 'active',
      }
    )
  }

  return (
    <UserHeaderNavContainer>
      <Link href="/conta" {...isActiveLink('/conta')}>
        <FeedIcon />
        {renderOnlyIsMobile('Minhas Fotos')}
      </Link>

      <Link href="/conta/estatisticas" {...isActiveLink('/conta/estatisticas')}>
        <StatsIcon />
        {renderOnlyIsMobile('Estatísticas')}
      </Link>

      <Link href="/conta/postar" {...isActiveLink('/conta/postar')}>
        <AddIcon />
        {renderOnlyIsMobile('Adicionar Foto')}
      </Link>

      <button onClick={userLogout}>
        <ExitIcon />
        {renderOnlyIsMobile('Sair')}
      </button>
    </UserHeaderNavContainer>
  )
}
