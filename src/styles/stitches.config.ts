import { createStitches } from '@stitches/react'

export const { getCssText, globalCss, styled, keyframes } = createStitches({
  theme: {
    fonts: {
      '--type-first': 'Helvetica, Arial, sans-serif',
      '--type-second': 'Spectral, Georgia',
    },
  },
})
