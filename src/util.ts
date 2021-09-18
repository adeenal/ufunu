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

export const useInterval = (execution: () => void, intervalMs: number) => {
  const timer = React.useRef<Maybe<NodeJS.Timer>>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onInterval = React.useCallback(execution, [execution])

  React.useEffect(() => {
    if (timer.current) clearInterval(timer.current)

    timer.current = setInterval(onInterval, intervalMs)
    return () => { timer.current && clearInterval(timer.current) }
  }, [onInterval, intervalMs])
}

export const useThrottle = (intervalMs: number) => {
  const timeout = React.useRef<Maybe<NodeJS.Timeout>>(null)

  React.useEffect(() => () => { timeout.current && clearTimeout(timeout.current) }, [])

  return (execution: () => void) => {
    if (timeout.current) return

    execution()
    timeout.current = setTimeout(() => {
      if (!timeout.current) return

      clearTimeout(timeout.current)
      timeout.current = null
    }, intervalMs)
  }
}
