import { first, last, sum } from 'kyanite'
import getData from '../../../utils/getData.js'

const dataSet = await getData()

function findDifference (history) {
  const diffs = []

  for (let i = 1; i < history.length; i += 1) {
    diffs.push(history[i] - history[i - 1])
  }

  return diffs
}

function findValue (findPrev, history) {
  // If every number is the same, we know the next number in the sequence
  if (history.every(entry => entry === history[0])) {
    return history[0]
  }

  // If not we can get the next value by adding the next diff instead
  const diffs = findDifference(history)
  const currDiff = findValue(findPrev, diffs)

  if (findPrev) {
    return first(history) - currDiff
  }

  return last(history) + currDiff
}

function solve (lines) {
  // Parse our numbers to number types
  const histories = lines.map(line => line.split(' ').map(Number))
  const nextValues = histories.map(h => findValue(false, h))
  const prevValues = histories.map(h => findValue(true, h))

  return { partOne: sum(nextValues), partTwo: sum(prevValues) }
}

console.log(solve(dataSet))
