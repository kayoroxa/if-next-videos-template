import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

interface Props {
  children: ReactNode
}

interface ContextProps {
  teachIndex: number
  setTeachIndex: Dispatch<SetStateAction<number>>
  dict: {
    start: number
    end: number
    pt: string
    en: string
  }[]
}

export const TeachContext = createContext<ContextProps>({} as ContextProps)

const dict = [
  { start: 0, end: 2, pt: 'oi cara', en: 'hello dude' },
  {
    start: 2,
    end: 3,
    pt: 'eu não sei oque fazer',
    en: "i don't know what to do",
  },
]

export default function TeachContextProvider({ children }: Props) {
  const [teachIndex, setTeachIndex] = useState(0)

  return (
    <TeachContext.Provider value={{ teachIndex, setTeachIndex, dict }}>
      {children}
    </TeachContext.Provider>
  )
}
