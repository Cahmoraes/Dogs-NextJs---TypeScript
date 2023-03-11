import { useEffect } from 'react'

export function useEscapeKey(callbackFn: CallableFunction) {
  useEffect(() => {
    function handleCloseKeyPress(
      callbackFunction: CallableFunction,
      event: KeyboardEvent,
    ) {
      if (['Escape', 'Backspace'].includes(event.key)) {
        event.preventDefault()
        callbackFunction()
      }
    }

    const onEventCallback = handleCloseKeyPress.bind(null, callbackFn)

    window.addEventListener('keydown', onEventCallback)

    return () => window.removeEventListener('keydown', onEventCallback)
  }, [callbackFn])
}
