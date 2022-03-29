import {
  scryptSync,
  randomFillSync,
  createCipheriv,
  createHash,
  Hash,
} from 'crypto'
import readline from 'readline'
import { readFile, writeFile } from 'fs/promises'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const algorithm = 'aes-256-cbc'
const saltHashAlgorithm = 'sha256'

async function start(password: string, inFile: string, outFile: string): Promise<void> {
  const shaHasher: Hash = createHash(saltHashAlgorithm)
  const salt: string = shaHasher.update(password).digest('hex')

  const key: Buffer = scryptSync(password, salt, 32)
  const initializationVector: Uint8Array = randomFillSync(new Uint8Array(16))
  const cipher = createCipheriv(algorithm, key, initializationVector)

  const plainText: Buffer = await readFile(inFile)
  const cipherText: Buffer = Buffer.concat([
    cipher.update(plainText), cipher.final()
  ])

  await writeFile(
    outFile,
    Buffer.concat([
      initializationVector,
      cipherText,
    ])
    // TODO maybe allow user to decide how it gets stored?
    // ]).toString('base64')
  )

  console.log('encrypted')
  process.exit(0)
}

const password: string = process.argv[2]
const inFileName: string = process.argv[3]
const outFileName: string = process.argv[4]

if (outFileName === undefined) {
  rl.question('You did not provide a file to write the encrypted data to. Do you want to overwrite the original file? [Y/n]', (answer: string): void => {
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
