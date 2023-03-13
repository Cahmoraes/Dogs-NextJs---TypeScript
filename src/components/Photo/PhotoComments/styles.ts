import { styled } from '@/styles/stitches.config'

export const PhotoCommentsContainer = styled('div', {
  overflowY: 'auto',
  padding: '2rem',

  '&[data-single="true"]': {
    padding: 0,
  },
})

export const Comments = styled('ul', {
  overflowY: 'auto',
  wordBreak: 'break-all',
})
