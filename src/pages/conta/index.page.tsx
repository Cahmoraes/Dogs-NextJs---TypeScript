import { Feed } from '@/components/Feed'
import { useUserStorage } from '@/hooks/useUserStorage'
import { applyDecorators } from '@/utils/decorators/applyDecorators'
import { withClientSession } from '@/utils/decorators/withClientSession'
import { withAccountLayout } from '@/utils/decorators/withLayout'
import { UserContainer } from './styles'

function Account() {
  const { user } = useUserStorage()

  return (
    <UserContainer>
      <Feed userId={user?.id} />
    </UserContainer>
  )
}

export default applyDecorators(Account, withAccountLayout, withClientSession)
