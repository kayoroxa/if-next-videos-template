import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type TYPE<T> = [T, Dispatch<SetStateAction<T>>]

function useLocalStorage<T>(name: string, initialValue: T): TYPE<T> {
  const [state, setState] = useState(initialValue)
  const [init, setInit] = useState(false)

  useEffect(() => {
    if (!init) {
      const stateStorage = JSON.parse(localStorage?.getItem(name) || 'false')
      setState(stateStorage || initialValue)
      setInit(true)
    } else {
      localStorage.setItem(name, JSON.stringify(state))
    }
  }, [name, state, init, initialValue])

  return [state, setState]
}

export default useLocalStorage
