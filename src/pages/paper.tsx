import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const script = [
  [
    "Well, don't act like you don't know us.",
    'Bem, não aja como se você não conhecesse nós',
  ],
  [
    "I haven't seen you in forever.",
    'Eu não tenho visto vocês há uma eternidade.',
  ],
  [
    'Did you do something different to your hair?',
    'Você fez algo diferente no seu cabelo?',
  ],
  ['No. You gain weight?', 'Não. Você ganhou peso?'],
  [
    'No. I know! You just had a birthday.',
    'Não. eu sei! Você acabou de fazer aniversário.',
  ],
  [
    'Yeah. -Totally. Total fire sign. I knew it.',
    'Sim. -Totalmente. Total signino de fogo. Eu sabia',
  ],
  [
    'There is definitely something different about the two of you',
    'Existe definitivamente algo diferente em vocês duas',
  ],
]

export default function Paper() {
  const [indexTeach, setIndexTeach] = useState(0)

  useHotkeys('enter', () => {
    setIndexTeach(p => (p + 1 <= script.length ? p + 1 : 0))
  })

  return (
    <section className="w-full min-h-screen bg-gray-800 flex justify-center items-center">
      <main className="shadow-lg p-6 w-full h-full flex flex-col gap-5 justify-center items-center text-[2.1rem] text-center overflow-y-hidden">
        {script.map((sentence, k) => (
          <ul
            key={k}
            className={`overflow-x-hidden p-6 shadow-xl rounded-xl transition-all bg-white ${
              indexTeach === k + 1
                ? 'scale-125 bg-orange-300'
                : 'scale-90 opacity-60'
            }`}
          >
            <li className="font-bold text-4xl">{sentence[0]}</li>
            <li>
              {indexTeach > k ? sentence[1] : '_'.repeat(sentence[1].length)}
            </li>
          </ul>
        ))}
      </main>
    </section>
  )
}
