import { styled, CSSProperties } from '@/styles/stitches.config'

const baseButton: CSSProperties = {
  background: '#eee',
  borderRadius: '.2rem',
  height: 40,
  width: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '1px solid transparent',
}

export const UserHeaderNavContainer = styled('nav', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1rem',

  '& > a, & > button': {
    ...baseButton,
  },

  '& > a:hover, & > a:focus, & > button:hover, & > button:focus': {
    background: '#fff',
    boxShadow: '0 0 0 3px #eee',
    borderColor: '#333',
    outline: 'none',
  },

  '& > a.active': {
    background: '#fff',
    boxShadow: '0 0 0 3px #fea',
    borderColor: '#fb1',
  },

  '& > a.active svg > *': {
    fill: '#fb1',
  },

  '&[data-ismobile=true]': {
    display: 'block',
    position: 'absolute',
    top: 70,
    background: '#fff',
    right: 0,
    padding: '0 1rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, .2)',
    borderRadius: '.2rem',
    transform: 'translateX(-10px)',
    opacity: 0,
    pointerEvents: 'none',
  },

  '&[data-mobile-active=true]': {
    transition: '0.1s',
    transform: 'initial',
    opacity: 1,
    zIndex: 100,
    pointerEvents: 'initial',

    '& > a, & > button': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: 'none',
      width: '100%',
      border: 'none',
      borderBottom: '1px solid #eee',
      padding: '0.5rem 0',
      cursor: 'pointer',
    },

    '& a:hover svg > *, & button:hover svg > *': {
      fill: '#fb1',
    },

    '& button': {
      borderBottom: 'none',
    },

    '& svg': {
      marginRight: '.5rem',
    },
  },
})

export const MobileButton = styled('button', {
  ...baseButton,
  padding: 0,

  '&::after': {
    content: '',
    display: 'block',
    width: '1.2rem',
    height: 2,
    borderRadius: 2,
    background: 'CurrentColor',
    boxShadow: '0 6px CurrentColor, 0 -6px CurrentColor',
    transition: '.2s',
  },

  '&:focus, &:hover, &.active': {
    outline: 'none',
    background: '#fff',
    boxShadow: '0 0 0 3px #fea',
    borderColor: '#fb1',
    color: '#fb1',
  },

  '&.active::after': {
    transform: 'rotate(90deg)',
    width: 4,
    height: 4,
    boxShadow: '0 8px CurrentColor, 0 -8px CurrentColor',
  },
})
