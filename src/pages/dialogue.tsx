import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const img = ['/dialogue/actor/act (10).png', '/dialogue/actor/act (3).png']

const dialogueScript = `
Jessica it's important! | you have to admit | that you went to the restaurant

Yes I have to admit,| I actually went to the restaurant

and did you like it?

yes I liked it,| but that restaurant has strange things 😨

why? what happened there? 😮

honestly i think it's happening anywhere

I don't understand, what happened? 🤔

what happens is that | they didn't let me leave without paying

am i a joke to you? 😂
`
  .split('\n')
  .map(str => {
    const lower = str.toLowerCase()
    return str.charAt(0).toUpperCase() + lower.slice(1)
  })
  .filter(v => v.length > 0)

/* eslint-disable @next/next/no-img-element */
export default function Dialogue() {
  const [isAnswer, setIsAnswer] = useState(false)
  const [indexScript, setIndexScript] = useState(0)

  useHotkeys('enter', () => {
    setIsAnswer(prev => !prev)
    setIndexScript(prev => prev + 1)
  })
  useHotkeys('scape', () => {
    setIsAnswer(false)
    setIndexScript(0)
  })

  return (
    <div className="relative bg-black overflow-hidden">
      <div className="w-full min-h-screen h-screen flex flex-col p-6 pb-0">
        <main className="relative flex h-full z-10">
          <section className=" h-full">
            <img
              src={isAnswer ? img[1] : img[0]}
              className="h-full -scale-x-[1] pointer-events-none"
              alt=""
            />
          </section>
          <section className="flex-1 flex flex-col justify-between">
            <div className="dialogue bg-slate-200 -ml-32 my-auto z-20 border-4 border-black  px-9 py-16 w-fit min-w-[50%] max-w=[90%] text-6xl rounded-3xl rounded-bl-none">
              {dialogueScript[indexScript]?.split('|').map(v => (
                <p key={v}>{v}</p>
              ))}
            </div>
            <div className="h-[60%] flex justify-end">
              <img
                src={isAnswer ? img[0] : img[1]}
                className="min-h-full h-full grayscale opacity-80 pointer-events-none"
                alt=""
              />
            </div>
          </section>
        </main>
      </div>
      <div className="absolute w-full h-full top-0 pointer-events-none">
        <img
          src="/dialogue/background/background (1).jpg"
          alt=""
          className="min-h-full h-full min-w-full w-full object-cover blur-sm opacity-80 scale-110 animate-walk"
        />
      </div>
    </div>
  )
}
