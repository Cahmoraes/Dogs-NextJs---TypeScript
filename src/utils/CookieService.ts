import { NextPageContext } from 'next'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

interface ICookieDTO {
  name: string
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

  static destroy({ name, ctx = {} }: ICookieDTO) {
    destroyCookie(ctx, name)
  }
}
