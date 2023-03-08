import { useUserStorage } from '@/hooks/useUserStorage'
import { MobileButton, UserHeaderNavContainer } from './styles'
import { FeedIcon } from '@/assets/images/feed'
import { StatsIcon } from '@/assets/images/estatisticas'
import { AddIcon } from '@/assets/images/adicionar'
import { ExitIcon } from '@/assets/images/sair'
import { ActiveLink } from '@/components/ActiveLink'
import { useMatchMedia } from '@/hooks/useMatchMedia'
import { useState } from 'react'

export function UserHeaderNav() {
  const { logout } = useUserStorage()
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)
  const isMobile = useMatchMedia('(max-width: 40rem)')

  function renderOnlyIsMobile(text: string) {
    return isMobile && text
  }

  function toggleMobileMenu() {
    setIsMobileMenuActive((state) => !state)
  }

  function renderButtonToggleMobileMenu() {
    return (
      isMobile && (
        <MobileButton
          aria-label="Menu"
          onClick={toggleMobileMenu}
          className={isMobileMenuActive ? 'active' : ''}
        ></MobileButton>
      )
    )
  }

  return (
    <>
      {renderButtonToggleMobileMenu()}

      <UserHeaderNavContainer
        data-ismobile={isMobile}
        data-mobile-active={isMobileMenuActive}
      >
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

        <button onClick={logout}>
          <ExitIcon />
          {renderOnlyIsMobile('Sair')}
        </button>
      </UserHeaderNavContainer>
    </>
  )
}
