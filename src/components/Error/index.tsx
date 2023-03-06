import { ErrorContainer } from './styles'

interface ErrorProps {
  message?: string | null
}
export function Error({ message: error }: ErrorProps) {
  if (!error) return null
  return <ErrorContainer>{error}</ErrorContainer>
}
