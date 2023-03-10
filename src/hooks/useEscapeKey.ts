import { useEffect } from 'react'

export function useEscapeKey(callbackFn: CallableFunction) {
  useEffect(() => {
    function handleCloseKeyPress(
      callbackFunction: CallableFunction,
      event: KeyboardEvent,
    ) {
      if (event.key === 'Escape') {
        callbackFunction()
      }
    }

    const onEventCallback = handleCloseKeyPress.bind(null, callbackFn)

    window.addEventListener('keydown', onEventCallback)

    return () => window.removeEventListener('keydown', onEventCallback)
  }, [callbackFn])
}
