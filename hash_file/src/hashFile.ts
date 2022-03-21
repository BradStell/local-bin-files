import { createReadStream } from 'fs'
import { stdout } from 'process'
const { createHash } = await import('crypto')

const hash = createHash('sha256')

if (process.argv.length < 3) {
  console.error('the path to the desired file to hash is required.')
  process.exit(1)
}

const fileName: string = process.argv[2]

createReadStream(fileName)
  .pipe(hash)
  .setEncoding('hex')
  .pipe(stdout)
