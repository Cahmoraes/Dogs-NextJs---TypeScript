import { animeLeft } from './animations'
import { globalCss } from './stitches.config'
import 'react-loading-skeleton/dist/skeleton.css'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
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
    color: '#333',
  },

  '.container': {
    maxWidth: '50rem',
    padding: '0 1rem',
    margin: '0 auto',
  },

  'main-container': {
    marginTop: '4rem',
  },

  '.animeLeft': {
    opacity: 1,
    transform: 'translateX(-20px)',
    animation: `${animeLeft} 0.3s forwards`,
  },

  '@media (prefers-reduced-motion)': {
    '.react-loading-skeleton': {
      '--pseudo-element-display': 'block!important',
    },
  },

  '.VictoryContainer': {
    height: 'initial !import',
  },
})
