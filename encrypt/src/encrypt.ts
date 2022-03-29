import {
  scryptSync,
  randomFillSync,
  createCipheriv,
  createHash,
  Hash,
} from 'crypto'
import { readFile, unlink, writeFile } from 'fs/promises'
import { FileInfo, getFileInfo } from './utils'

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

  const outFileParts: FileInfo = getFileInfo(outFile)
  const encryptedFileName: string = `${outFileParts.name}.brad`

  console.log(`writing to file ${encryptedFileName}`)
  await writeFile(
    `${encryptedFileName}`,
    Buffer.concat([
      Buffer.from(`${outFileParts.extentionLength}`),
      Buffer.from(outFileParts.type),
      initializationVector,
      cipherText,
    ])
    // TODO maybe allow user to decide how it gets stored?
    // ]).toString('base64')
  )

  console.log(`deleting file: ${inFile}`)
  await unlink(inFile)

  console.log('encrypted')
  process.exit(0)
}

const password: string = process.argv[2]
const inFileName: string = process.argv[3]
if (inFileName === undefined) {
  console.log('No file provided. Terminating')
  process.exit(1)
}

const outFileName: string = process.argv[4]

if (outFileName === undefined) {
  console.log(`Encrypted data will be written back to the file ${inFileName}`)
  start(password, inFileName, inFileName)
} else {
  start(password, inFileName, outFileName)
}
