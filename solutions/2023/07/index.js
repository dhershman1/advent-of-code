import getData from '../../utils/getData.js'
import { add, countBy, descend, identity } from 'kyanite'

const dataSet = await getData()

function cleverSort (a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return b[i] - a[i]
    }
  }
  return 0
}

function run (withJokers = false) {
  const STRENGTH = withJokers ? 'J23456789TQKA' : '23456789TJQKA'
  return dataSet.map(line => {
    let [cards, bid] = line.split(' ')
    cards = cards.split('').map(card => STRENGTH.indexOf(card))
    const frequencies = countBy(identity, cards)

    let jokers
    if (withJokers) {
      jokers = frequencies['0']
      delete frequencies['0']
    }

    const handHash = Object.values(frequencies).sort(descend)
    if (withJokers && jokers) {
      handHash[0] ??= 0
      handHash[0] += jokers
    }

    return { sort: handHash.concat(cards), bid: Number(bid) }
  }).sort((a, b) => {
    return cleverSort(b.sort, a.sort)
  }).map((hand, index) => hand.bid * (index + 1)).reduce(add)
}

console.log('Part 1', run(false))
console.log('Part 2', run(true))
