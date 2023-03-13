import HeadNext from 'next/head'
import { ReactNode } from 'react'

interface HeadProps {
  children: ReactNode
  description?: string
}

export function Head({ children, description = '' }: HeadProps) {
  return (
    <HeadNext>
      <title>{children} | Dogs</title>
      <meta name="description" content={description} />
    </HeadNext>
  )
}
