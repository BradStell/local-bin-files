import { Buffer } from 'buffer'
import readline from 'readline'
import {
  scryptSync,
  createDecipheriv,
  Hash,
  createHash,
  Decipher
} from 'crypto'
import { readFile, writeFile } from 'fs/promises'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const algorithm = 'aes-256-cbc'
const saltHashAlgorithm = 'sha256'

async function start(password: string, inFile: string, outFile: string): Promise<void> {
  // TODO if user stored data in base64 rather than binary - switch to run this
  // const cipherFileData: Buffer = Buffer.from(await readFile(inFile, 'binary'), 'base64')
  const cipherFileData: Buffer = await readFile(inFile)
  const initializationVector: Buffer = cipherFileData.slice(0, 16)
  const cipherText: Buffer = cipherFileData.slice(16)

  const shaHasher: Hash = createHash(saltHashAlgorithm)
  const salt: string = shaHasher.update(password).digest('hex')

  const key: Buffer = scryptSync(password, salt, 32)
  const decipher: Decipher = createDecipheriv(algorithm, key, initializationVector)

  const plainText: Buffer = Buffer.concat([
    decipher.update(cipherText), decipher.final()
  ])

  await writeFile(outFile, plainText)

  console.log('decrypted')
  process.exit(1)
}

const password: string = process.argv[2]
const inFileName: string = process.argv[3]
const outFileName: string = process.argv[4]

if (outFileName === undefined) {
  rl.question('You did not provide a file to write the decrypted data to. Do you want to overwrite the original file? [Y/n]', (answer: string): void => {
    if (answer !== 'Y') {
      process.exit(1)
    }
  
    console.log(`Encrypted data will be written back to the file ${inFileName}`)
    start(password, inFileName, inFileName)
    rl.close()
    rl.removeAllListeners()
  })
} else {
  start(password, inFileName, outFileName)
}
