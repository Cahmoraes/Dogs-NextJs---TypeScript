import { ReactNode } from 'react'
import Link from 'next/link'
import { LoginLayout } from '../layout'

export default function LoginCreate() {
  return (
    <LoginLayout>
      <p>
        Login criar
        <Link href="/login">Login form</Link>
      </p>
    </LoginLayout>
  )
}

LoginCreate.getLayout = function getLayout(component: ReactNode) {
  return <LoginLayout>{component}</LoginLayout>
}
