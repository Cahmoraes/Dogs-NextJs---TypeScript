import { AccountLayout } from '@/pages/conta/layout'
import { ElementType } from 'react'

function withLayout(LayoutComponent: ElementType) {
  return function Wrapper(ComponentPage: ElementType) {
    return function Props(props: {}) {
      return (
        <LayoutComponent>
          <ComponentPage {...props} />
        </LayoutComponent>
      )
    }
  }
}

export const withAccountLayout = withLayout(AccountLayout)
