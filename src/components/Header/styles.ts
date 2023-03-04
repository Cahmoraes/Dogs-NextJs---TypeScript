import { styled } from '@/styles/stitches.config'
import Link from 'next/link'
import usuarioSVG from '../../assets/images/usuario.svg'

export const HeaderContainer = styled('header', {
  boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  width: '100%',
  zIndex: 100,
  background: '#fff',
  top: 0,
})

export const Navigation = styled('nav', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '4rem',
})

export const LinkLogo = styled(Link, {
  padding: '0.5rem 0',
})

export const LinkLogin = styled(Link, {
  color: '#333',
  display: 'flex',
  alignItems: 'center',

  '&::after': {
    content: '',
    display: 'inline-block',
    width: 14,
    height: 17,
    background: `url(${usuarioSVG.src}) no-repeat center center`,
    marginLeft: '0.5rem',
    position: 'relative',
    top: '-1',
  },
})
