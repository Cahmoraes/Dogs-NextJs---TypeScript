import { ReactNode, ComponentProps } from 'react'
import { ButtonContainer } from './styles'

type StyledButtonProps = ComponentProps<typeof ButtonContainer>

interface ButtonProps extends StyledButtonProps {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return <ButtonContainer {...rest}>{children}</ButtonContainer>
}
