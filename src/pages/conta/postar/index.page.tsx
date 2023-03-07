import { createGetServerSidePropsWithAuth } from '@/utils/withAuth'
import { AccountLayout } from '../layout'

interface UserPhotoPostProps {
  session: string | null
}

export default function UserPhotoPost({ session }: UserPhotoPostProps) {
  console.log(session)

  return (
    <AccountLayout>
      <div>UserPhotoPost</div>
    </AccountLayout>
  )
}

export const getServerSideProps = createGetServerSidePropsWithAuth()
