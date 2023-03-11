import { styled } from '@stitches/react'

export const PhotoDeleteContainer = styled('div', {})

export const DeleteButton = styled('button', {
  background: '#ddd',
  padding: '.3rem .6rem',
  lineHeight: 1,
  border: '1px solid transparent',
  fontSize: '.875rem',
  fontFamily: '$--type-first',
  cursor: 'pointer',
  borderRadius: '.4rem',
  transition: '.1s',

  '&:hover, &:focus': {
    outline: 'none',
    background: '#fff',
    boxShadow: '0 0 0 3px #eee',
    borderColor: '#333',
  },
})
