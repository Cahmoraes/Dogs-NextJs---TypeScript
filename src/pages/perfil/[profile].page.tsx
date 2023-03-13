import { Feed } from '@/components/Feed'
import { Title } from '@/components/Title'
import { useRouter } from 'next/router'

export default function ProfilePage() {
  const router = useRouter()
  const { profile } = router.query

  return (
    <section className="container main-section">
      <Title>{profile}</Title>
      <Feed userId={profile?.toString()} />
    </section>
  )
}
