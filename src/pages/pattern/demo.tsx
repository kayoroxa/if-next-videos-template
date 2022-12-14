import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const script = `
  how has (your|him|her) (day|week|year) been
`
  .split('\n')
  .filter(Boolean)

export default function PatternDemo() {
  const [indexSentence, setIndexSentence] = useState(0)
  const [sentenceData, setSentenceData] = useState([
    'how has',
    ['your', 'him', 'her', 0],
    ['day', 'week', 'year', 1],
    'been',
  ])

  function getElement(block: string | (string | number)[]) {
    const hasOption = typeof block !== 'string'
    if (hasOption) {
      indexSentence
      const activeIndex = Number(block.slice(-1)[0])
      const number = 87 * activeIndex

      const styles = {
        transform: `translate(0px, -${number}px)`,
      }

      return (
        <div
          style={styles}
          className={`flex flex-col gap-6 -mt-[8px] transition-all`}
        >
          {/* <div className="absolute top-0">a</div>                                                                                                      */}
          {block.slice(0, -1).map(option => (
            <div className="bg-white px-6 py-2 rounded-3xl" key={option}>
              {option}
            </div>
          ))}
        </div>
      )
      return (
        <div className="bg-white px-6 py-2 rounded-3xl ">
          {block.slice(0, -1)[0]}
        </div>
      ) //.map(option => <div key={option}>{option}</div>)
    }
    return <div>{block}</div>
  }

  useHotkeys('d', () => {
    setIndexSentence(prev => prev + 1)
  })

  return (
    <div className="flex justify-center items-center text-5xl text-center h-screen w-full bg-slate-300">
      <main className="bg-red-400 flex gap-7 justify-center px-6 py-4 rounded-2xl h-[80px] overflow relative">
        {sentenceData.map((block, i) => getElement(block))}
      </main>
    </div>
  )
}
