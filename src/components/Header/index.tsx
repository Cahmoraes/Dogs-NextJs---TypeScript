import { HeaderContainer, LinkLogin, LinkLogo, Navigation } from './styles'
import Dogs from '../../assets/images/dogs.svg'
import Image from 'next/image'
import { useUserStorage } from '@/hooks/useUserStorage'

export function Header() {
  const { user, userLogout } = useUserStorage()

  function renderMenuLink() {
    return user ? (
      <>
        <LinkLogin href="/conta">{user.nome}</LinkLogin>
        <button onClick={userLogout}>Sair</button>
      </>
    ) : (
      <LinkLogin href="/login">Login / Criar</LinkLogin>
    )
  }

  return (
    <HeaderContainer>
      <Navigation className="container">
        <LinkLogo href="/" aria-label="Dogs - Home">
          <Image src={Dogs} alt="Dogs" width={28} height={22} />
        </LinkLogo>
        {renderMenuLink()}
      </Navigation>
    </HeaderContainer>
  )
}
