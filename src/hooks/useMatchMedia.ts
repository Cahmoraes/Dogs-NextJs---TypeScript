import { useEffect, useState } from 'react'

export function useMatchMedia(mediaQuery: string) {
  const [math, setMatch] = useState(false)

  function isBrowser() {
    return !!global.window
  }

  useEffect(() => {
    if (!isBrowser()) return
    function changeMath() {
      const { matches } = window.matchMedia(mediaQuery)
      setMatch(matches)
    }

    changeMath()

    window.addEventListener('resize', changeMath)
    return () => window.removeEventListener('resize', changeMath)
  }, [mediaQuery])

  return math
}
