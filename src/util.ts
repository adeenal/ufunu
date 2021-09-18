import React from 'react'

export function shuffleCopy<T>(a: T[] | readonly T[]): T[] {
  const arr = [...a]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}

export type Maybe<T> = T | null

export const useInterval = (onInterval: () => void, intervalMs: number) => {
  const timer = React.useRef<Maybe<NodeJS.Timer>>(null)

  React.useEffect(() => {
    if (timer.current) return

    timer.current = setInterval(onInterval, intervalMs)
    return () => {
      timer.current && clearInterval(timer.current)
      timer.current = null
    }
  }, [onInterval, intervalMs])
}

export const useThrottle = (intervalMs: number) => {
  const timer = React.useRef<Maybe<NodeJS.Timeout>>(null)

  return (execution: () => void) => {
    if (timer.current) return

    execution()
    timer.current = setTimeout(() => {
      if (!timer.current) return

      clearTimeout(timer.current)
      timer.current = null
    }, intervalMs)
  }
}
