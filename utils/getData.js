import fs from 'node:fs/promises'
import { EOL } from 'node:os'

async function getData () {
  const data = await fs.readFile('./data.txt', {
    encoding: 'utf-8'
  })

  return data.split(EOL).filter(s => s)
}

export default getData
