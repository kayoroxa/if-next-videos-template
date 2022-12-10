import { sample, sampleSize } from 'lodash'
import { similarSounds } from '../data/similar-sounds'
import { yarnSentences } from '../data/yarn-sentences'

const dataSplitted = yarnSentences
  .split('\n\n')
  .filter(Boolean)
  .map(v => v.split('\n').filter(Boolean))

export const dataScript = dataSplitted

function enfaseWordsOptions(sentencesOption: string[]) {
  const sentencesWordsSplitted = sentencesOption.map(
    sentence => sentence.match(/[’'a-zA-Z]+/gi) || []
  )
  for (
    let wordIndex = 0;
    wordIndex <= sentencesWordsSplitted[0].length - 1;
    wordIndex++
  ) {
    const dataWords = sentencesWordsSplitted.map(sentenceRow =>
      sentenceRow[wordIndex].toLocaleLowerCase()
    )

    // const dataWords = [
    //   sentencesWordsSplitted[0][wordIndex].toLocaleLowerCase(),
    //   sentencesWordsSplitted[1][wordIndex].toLocaleLowerCase(),
    //   sentencesWordsSplitted[2][wordIndex].toLocaleLowerCase(),
    // ]

    const isEqual = new Set(dataWords).size === 1

    if (!isEqual) {
      sentencesOption = sentencesOption.map((sentence, index) => {
        const word: string = sentencesWordsSplitted[index][wordIndex]

        return sentence.replace(
          new RegExp(`(?<!'|\\w)${word}(?!'|\\w)`, 'gi'),
          `[${word.toUpperCase()}]`
        )
      })
    }
  }

  const sentencesOptionSanitized = sentencesOption.map(s =>
    s.replace(/\[+/g, '[').replace(/\]+/g, ']')
  )

  return sentencesOptionSanitized
}

export function getOptions(sentence: string) {
  let sentencesOption = [sentence]

  const allWords = sentence.match(/[’'a-zA-Z]+/gi)

  for (let c = 1; c <= 50; c++) {
    const selectWords = sampleSize(allWords, 2)

    const newSentence = selectWords.reduce((acc, word) => {
      const re = new RegExp(`(?<!'|\\w)${word}(?!'|\\w)`, 'i')
      const row = similarSounds.find(row => row.some(option => re.test(option)))

      if (!row) return acc

      const newWord = sample(row)

      return acc.replace(
        new RegExp(`(?<!'|\\w)${word}(?!'|\\w)`, 'gi'),
        newWord || word
      )
    }, sentence)

    if (
      !sentencesOption
        .map(v => v.toLowerCase())
        .includes(newSentence.toLowerCase())
    ) {
      sentencesOption.push(newSentence)
    }
  }

  return enfaseWordsOptions(sentencesOption.slice(0, 3))
}
