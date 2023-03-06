import { ErrorContainer } from './styles'

interface ErrorProps {
  message?: string | null
}

export function Error({ message }: ErrorProps) {
  if (!message) return null
  return <ErrorContainer>{message}</ErrorContainer>
}
