import { ElementType } from 'react'
import Skeleton from 'react-loading-skeleton'

export function withSkeleton(Component: ElementType) {
  return function Wrapper(props: {}) {
    return <Skeleton wrapper={() => <Component {...props} />} />
  }
}
