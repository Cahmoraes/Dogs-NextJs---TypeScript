import { MethodNotPermittedException } from './MethodNotPermittedException'

export type MethodTypes = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

function isUndefined(anValue: unknown): anValue is undefined {
  return typeof anValue === 'undefined'
}

export function assertsMethod(
  method: string | undefined,
  methodsPermitted: MethodTypes[],
): asserts method is Partial<MethodTypes> {
  if (isUndefined(method)) {
    throw new Error(`Method: [${method}] not permitted in this route.`)
  }

  if (!checkMethodExists()) {
    throw new MethodNotPermittedException(method)
  }

  function checkMethodExists() {
    return methodsPermitted.some((methodsPermitted) =>
      methodsPermitted!.includes(method!),
    )
  }
}
