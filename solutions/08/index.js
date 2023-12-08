import getData from '../../utils/getData.js'
import { drop, first, lcm } from 'kyanite'

const dataSet = await getData()

// Split our data up to grab the tail end of our data after
// Our instructions
const tailData = drop(1, dataSet)

const turns = dataSet[0].split('')
// Put the data into a more compact and object format friendly
const instructions = tailData.map(line => {
  const [from, left, right] = line.match(/[A-Z]+/g)
  return [from, [left, right]]
})
// Make our points object
const points = Object.fromEntries(instructions)
// Filter down to our possible starting points
const starts = instructions.filter(i => i[0][2] === 'A').map(first)

function solve (position = 'AAA') {
  let steps = 0
  while (true) {
    // What turn are we on
    const turn = turns[steps++ % turns.length]
    // Which direction are we going based on the instructions
    position = points[position][turn === 'L' ? 0 : 1]
    // Have we found an ending point?
    if (position[2] === 'Z') {
      break
    }
  }
  return steps
}

console.log('Part 1', solve())
console.log('Part 2', starts.map(solve).reduce(lcm))
