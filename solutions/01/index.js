import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

async function getData () {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  console.log(__dirname)
  const data = await fs.readFile(path.join(__dirname, 'data.txt'), {
    encoding: 'utf-8'
  })

  return data.split('\n')
}

const dataSet = await getData()

const resultsPartOne = dataSet.filter(s => s)
  .map(s => s.match(/(\d)/gms))
  .map(nums => +[nums[0], nums[nums.length - 1]].join(''))
  .reduce((a, b) => a + b, 0)


const resultsPartTwo = dataSet.filter(s => s)
  .map(s => s.match(/(\d|twone|sevenine|oneight|threeight|nineight|fiveight|eighthree|eightwo|one|two|three|four|five|six|seven|eight|nine)/gms))
  .map(s => s.flatMap(v => ({ 'twone': [2, 1], 'sevenine': [7, 9], 'oneight': [1, 8], 'threeight': [3, 8], 'nineight': [9, 8], 'fiveight': [5, 8], 'eighthree': [8, 3], 'eightwo': [8, 2], one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9 }[v])))
  .map(nums => +[nums[0], nums[nums.length - 1]].join(''))
  .reduce((a, b) => a + b, 0)

console.log('Part 1:', resultsPartOne)
console.log('Part 2:', resultsPartTwo)