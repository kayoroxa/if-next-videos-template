import classes from 'classnames'
import { random } from 'lodash'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

// const script = `
//   how has (your|him|her) (day|week|year|night) been (you|she)
// `
//   .split('\n')
//   .filter(Boolean)

export default function PatternDemo() {
  const [indexSentence, setIndexSentence] = useState(0)
  const [sentenceData, setSentenceData] = useState([
    'how has',
    ['your', 'him', 'her', 0],
    ['day', 'week', 'year', 'night', 0],
    'been',
    // ['you', 'she', 'us', 'her', 1],
  ])

  function getElement(block: string | (string | number)[]) {
    const hasOption = typeof block !== 'string'
    if (hasOption) {
      const activeIndex = Number(block.slice(-1)[0])
      const yAixes = 87 * activeIndex

      const styles = {
        transform: `translate(0px, -${yAixes}px)`,
      }
      return (
        <div
          style={styles}
          className={`flex flex-col gap-6 -mt-[8px] transition-all`}
        >
          {/* <div className="absolute top-0">a</div>                                                                                                      */}
          {block.slice(0, -1).map((option, i) => (
            <div
              className={classes(
                //
                'bg-white px-6 py-2 rounded-3xl',
                { 'opacity-40': i !== activeIndex }
              )}
              key={option}
            >
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

  useHotkeys('enter', () => {
    setSentenceData(prev => {
      const newPrev = prev.map(v => {
        if (Array.isArray(v)) {
          v.pop()
          const indexRandom = random(0, v.length - 1, false)
          v.push(indexRandom)
          return v
        }
        return v
      })
      return newPrev
    })
  })

  return (
    <div className="flex justify-center items-center gap-6 text-5xl text-center h-screen w-full bg-slate-300">
      <span>...</span>
      <main className="bg-red-400 flex gap-7 justify-center px-6 py-4 rounded-2xl h-[80px] overflow relative">
        {sentenceData.map((block, i) => getElement(block))}
      </main>
      <span>...</span>
    </div>
  )
}
