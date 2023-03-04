export class MethodNotPermittedException extends Error {
  constructor(method: string) {
    super(`Method: [${method}] not permitted in this route.`)
    this.name = this.constructor.name
  }
}
