import { ComponentProps, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type LinkProps = ComponentProps<typeof Link>

interface ActiveLinkProps extends LinkProps {
  children: ReactNode
}

export function ActiveLink({ href, children, ...rest }: ActiveLinkProps) {
  const router = useRouter()
  function isActiveLink(path: string) {
    return (
      router.pathname === path && {
        className: 'active',
      }
    )
  }
  return (
    <Link href={href} {...isActiveLink(href.toString())}>
      {children}
    </Link>
  )
}
