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

type Page = 'scene' | 'vocabulary' | 'pronounce'

interface ContextProps {
  atualPage: Page
  setAtualPage: Dispatch<SetStateAction<Page>>
}

export const AppContext = createContext<ContextProps>({} as ContextProps)

export default function AppContextProvider({ children }: Props) {
  const [atualPage, setAtualPage] = useState<Page>('vocabulary')

  return (
    <AppContext.Provider value={{ atualPage, setAtualPage }}>
      {children}
    </AppContext.Provider>
  )
}
