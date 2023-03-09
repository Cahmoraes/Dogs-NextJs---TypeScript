import { ElementType } from 'react'

export function applyDecorators(
  component: ElementType,
  ...decorators: CallableFunction[]
) {
  return decorators.reduce(
    (componentDecorated, decorator) => decorator(componentDecorated),
    component,
  )
}
