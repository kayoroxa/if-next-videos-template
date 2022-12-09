import { useContext } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { AppContext } from '../context/appContext'
import FullScreen from '../template/FullScreen'
import Translation from './translation'

export default function Home() {
  const { atualPage, setAtualPage } = useContext(AppContext)

  useHotkeys('s', () => {
    setAtualPage('scene')
  })

  useHotkeys('v', () => {
    setAtualPage('vocabulary')
  })

  return (
    <section className="h-screen w-full relative">
      <FullScreen isStatic={atualPage !== 'scene'} />
      {atualPage === 'vocabulary' && <Translation />}
    </section>
  )
}
