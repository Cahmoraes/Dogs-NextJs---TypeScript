import { Title } from '@/components/Title'
import { UserHeaderNav } from '../UserHeaderNav'
import { UserHeaderContainer } from './styles'

export function UserHeader() {
  return (
    <UserHeaderContainer>
      <Title>Título</Title>
      <UserHeaderNav />
    </UserHeaderContainer>
  )
}
