import {useCallback, useEffect, useState } from 'react'

// start countdown timer
export function useCountdown(n, interval=1000) {
  const [count, set] = useState(n)

  const reset = useCallback(() => {
    set(n)
  }, [n])

  useEffect(() => {
    let id = setInterval(() => {
      set(v => v - 1)
    }, interval)

    return () => {
      clearInterval(id)
    }
  }, [interval])

  return [count, reset]
}
