import { Title } from '@/components/Title'
import { useAccountTitle } from '@/hooks/useAccountTitle'
import { UserHeaderNav } from '../UserHeaderNav'
import { UserHeaderContainer } from './styles'

export function UserHeader() {
  const title = useAccountTitle()

  return (
    <UserHeaderContainer>
      <Title>{title}</Title>
      <UserHeaderNav />
    </UserHeaderContainer>
  )
}
