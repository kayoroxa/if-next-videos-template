import { shuffle } from 'lodash'
import { ReactElement, useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

function Block({ text }: { text: string }) {
  const isPattern = new RegExp('\\(.*\\)', 'g').test(text)

  if (isPattern) {
    const textDivided = text.split(/(\(.+?\))/g)
    return (
      <div className="bg-blue-400/80 text-zinc-100 rounded-3xl px-4 py-2 flex justify-center items-center w-max h-max">
        {textDivided.map(t => {
          if (t.includes('('))
            return (
              <span className="bg-zinc-100 text-zinc-900 rounded-3xl px-4 py-2 ">
                {t.replace(/[()]/g, '')}
              </span>
            )
          else return <span className="whitespace-pre selection-dark">{t}</span>
        })}
      </div>
    )
  }
  return (
    <span className="bg-zinc-100 rounded-3xl px-4 py-2 w-max h-max">
      {text}
    </span>
  )
}

function AnswerPlace({
  children,
  show = true,
}: {
  children: ReactElement | ReactElement[]
  show?: boolean
}) {
  return (
    <div className="w-full text-5xl relative flex gap-5 justify-center items-center">
      <div
        style={{ opacity: show ? 1 : 0 }}
        className="w-full text-5xl relative flex gap-5 justify-center items-center"
      >
        {children}
      </div>
      <div className="w-full h-1 bg-zinc-900 absolute -bottom-[10px]"></div>
    </div>
  )
}

function OptionsPlace({
  children,
  show = true,
}: {
  children: ReactElement | ReactElement[]
  show?: boolean
}) {
  return (
    <section className="flex-[0.5] text-5xl bg-zinc-400/40 w-full flex items-center justify-center gap-10">
      {show && children}
    </section>
  )
}

export default function Quizz() {
  const [showingAnswer, setShowingAnswer] = useState(false)
  const [script, setScript] = useState([
    'listen to (me)',
    'i',
    'as (taller) as',
    'him',
  ])
  const [scriptShuffled, setScriptShuffled] = useState<string[]>([])

  useEffect(() => {
    setScriptShuffled(shuffle(script))
  }, [script])

  useHotkeys('Enter', () => {
    setShowingAnswer(prev => !prev)
  })

  return (
    <div className="w-full h-screen flex flex-col bg-zinc-300 items-center">
      <section className="flex-1  flex flex-col justify-center items-center gap-10 w-fit">
        <header className="bg-zinc-100 px-4 py-2 text-6xl">
          me escute eu sou tão alto quanto ele
        </header>
        <AnswerPlace show={showingAnswer}>
          {script.map((r, key) => (
            <Block text={r} key={key} />
          ))}
        </AnswerPlace>
      </section>
      <OptionsPlace show={!showingAnswer}>
        {scriptShuffled.map((r, key) => (
          <Block text={r} key={key} />
        ))}
      </OptionsPlace>
    </div>
  )
}
