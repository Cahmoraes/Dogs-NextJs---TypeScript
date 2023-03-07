import { useUserStorage } from '@/hooks/useUserStorage'
import { UserHeaderNavContainer } from './styles'
import { useState } from 'react'
import { FeedIcon } from '@/assets/images/feed'
import { StatsIcon } from '@/assets/images/estatisticas'
import { AddIcon } from '@/assets/images/adicionar'
import { ExitIcon } from '@/assets/images/sair'
import { ActiveLink } from '@/components/ActiveLink'

export function UserHeaderNav() {
  const { userLogout } = useUserStorage()
  const [isMobile, setIsMobile] = useState(false)

  function renderOnlyIsMobile(text: string) {
    return isMobile && text
  }

  return (
    <UserHeaderNavContainer>
      <ActiveLink href="/conta">
        <FeedIcon />
        {renderOnlyIsMobile('Minhas Fotos')}
      </ActiveLink>

      <ActiveLink href="/conta/estatisticas">
        <StatsIcon />
        {renderOnlyIsMobile('Estatísticas')}
      </ActiveLink>

      <ActiveLink href="/conta/postar">
        <AddIcon />
        {renderOnlyIsMobile('Adicionar Foto')}
      </ActiveLink>

      <button onClick={userLogout}>
        <ExitIcon />
        {renderOnlyIsMobile('Sair')}
      </button>
    </UserHeaderNavContainer>
  )
}
