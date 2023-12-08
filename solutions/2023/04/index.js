import getData from '../../../utils/getData.js'
import { intersection, sum } from 'kyanite'

const dataSet = await getData()

function matchData (lines) {
  const cards = lines.map(line => {
    const [, winning, mine] = line.split(/[:|]/)

    return [winning.trim().split(/\s+/), mine.trim().split(/\s+/)]
  })

  return cards.map(card => {
    return intersection(...card)
  })
}

function searchCard (lines) {
  const data = matchData(lines)

  return data.reduce((acc, score, i) => {
    let matches = score.length
    if (!matches) {
      return acc
    }

    acc.points += Math.pow(2, matches - 1)

    while (matches) {
      acc.copies[i + matches--] += acc.copies[i]
    }

    return acc
  }, { points: 0, copies: data.map(() => 1) })
}

const { points, copies } = searchCard(dataSet)

console.log(points)
console.log(sum(copies))
