import { styled } from '@stitches/react'
import Link from 'next/link'

export const Form = styled('form', {
  marginBottom: '2rem',
})

export const RegisterContainer = styled('div', {
  marginTop: '2rem',
})

export const Subtitle = styled('h2', {
  fontFamily: '$--type-second',
  lineHeight: 1,
  fontSize: '2rem',
  marginBottom: '1rem',

  '&::after': {
    content: '',
    display: 'block',
    background: '#ddd',
    height: '.5rem',
    width: '3rem',
    borderRadius: '0.2rem',
  },
})

export const LinkLost = styled(Link, {
  display: 'inline-block',
  color: '#666',
  padding: '0.5rem',
  lineHeight: 1,

  '&::after': {
    content: '',
    height: 2,
    width: '100%',
    background: 'CurrentColor',
    display: 'block',
  },
})

export const LinkCreate = styled(Link, {
  marginTop: '4rem',
  display: 'inline-block',

  fontSize: '1rem',
  fontFamily: '$--type-first',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '0.4rem',
  background: '#fb1',
  color: '#764701',
  padding: '.8rem 1.2rem',
  boxSizing: 'border-box',
  transition: '.1s',
  minWidth: '8rem',

  '&:hover, &:focus': {
    outline: 'none',
    boxShadow: '0 0 3px #fea, 0 0 0 4px #fb1',
  },
})
