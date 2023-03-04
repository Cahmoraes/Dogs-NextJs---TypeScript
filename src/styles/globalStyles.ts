import { globalCss } from './stitches.config'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
  },

  body: {
    margin: 0,
    color: '#333',
    fontFamily: '$--type-first',
    paddingTop: '4rem',
  },

  'h1, h2, h3, h4, p': {
    margin: 0,
  },

  'ul li': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  img: {
    display: 'block',
    maxWidth: '100%',
  },

  'button, input': {
    display: 'block',
    fontSize: '1rem',
    fontFamily: '$--type-first',
    color: '#333',
  },

  a: {
    textDecoration: 'none',
  },

  '.container': {
    maxWidth: '50rem',
    padding: '0 1rem',
    margin: '0 auto',
  },
})
