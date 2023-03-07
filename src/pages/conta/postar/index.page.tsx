import { withClientSession } from '@/utils/withClientSession'
import { AccountLayout } from '../layout'

interface UserPhotoPostProps {
  session: string | null
}

function UserPhotoPost({ session }: UserPhotoPostProps) {
  console.log(session)

  return (
    <AccountLayout>
      <div>UserPhotoPost</div>
    </AccountLayout>
  )
}

export default withClientSession(UserPhotoPost)
