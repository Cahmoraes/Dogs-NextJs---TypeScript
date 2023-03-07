import { NextPageContext } from 'next'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

export enum CookieTypes {
  'TOKEN' = '@Dogs:token',
  'USER' = '@Dogs:user',
}
interface ICookieDTO {
  name: CookieTypes
  ctx?: NextPageContext | {}
}

interface ISetCookieDTO extends ICookieDTO {
  value: string
}

export class CookieService {
  static set({ name, value, ctx = {} }: ISetCookieDTO) {
    setCookie(ctx, name, value, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
  }

  static get({ name, ctx = {} }: ICookieDTO) {
    return parseCookies(ctx)[name]
  }

  static has({ name, ctx = {} }: ICookieDTO): boolean {
    return Boolean(this.get({ name, ctx }))
  }

  static destroy({ name, ctx = {} }: ICookieDTO) {
    destroyCookie(ctx, name, {
      path: '/',
    })
  }
}
