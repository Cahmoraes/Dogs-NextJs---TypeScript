import { ReactNode } from 'react'
import { FormsContainer, LayoutContainer } from './styles'

interface LoginLayoutProps {
  children: ReactNode
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <LayoutContainer>
      <FormsContainer>{children}</FormsContainer>
    </LayoutContainer>
  )
}
