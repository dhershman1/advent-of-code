import fs from 'node:fs/promises'
import { EOL } from 'node:os'

async function getData (format = true) {
  const data = await fs.readFile('./data.txt', {
    encoding: 'utf-8'
  })

  if (format) {
    return data.split(EOL).filter(s => s)
  }

  return data
}

export default getData
