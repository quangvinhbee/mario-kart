import { useEffect, useRef, useState } from 'react'

export const usePrevious = <T>(value: T): T | undefined => {
  const [previousValue, setPreviousValue] = useState<T>()
  const currentValue = useRef<T>()

  useEffect(() => {
    if (value != currentValue.current) {
      setPreviousValue(currentValue.current)
      currentValue.current = value
    }
  }, [value])

  return previousValue
}
