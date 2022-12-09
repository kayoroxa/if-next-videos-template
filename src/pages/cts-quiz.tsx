import { useState } from 'react'
import { dataScript } from '../../utils/handleScript'

function Yarn({ link }: { link: string }) {
  return <div>Yarn: {link}</div>
}

function Quiz() {}

export default function CTSQuiz() {
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState<'listing' | 'quiz' | 'answer' | 'meaning'>(
    'listing'
  )

  return (
    <div className="w-full h-screen bg-green-200">
      {step === 'listing' && <Yarn link={dataScript[index][0]} />}
      {step === 'quiz' && <Quiz link={dataScript[index][0]} />}
    </div>
  )
}
