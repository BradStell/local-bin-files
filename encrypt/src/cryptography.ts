import {
  scryptSync,
  randomFillSync,
  createCipheriv,
  randomBytes,
} from 'crypto'
import { WriteStream } from 'fs'
import { unlink } from 'fs/promises'
import { InStream, OutStream } from './types'

const algorithm = 'aes-256-cbc'

export async function encrypt(password: string, inStream: InStream, outStream: OutStream): Promise<void> {
  const salt: Buffer = randomBytes(16)
  const key: Buffer = scryptSync(password, salt, 32)
  const initializationVector: Uint8Array = randomFillSync(new Uint8Array(16))
  const cipher = createCipheriv(algorithm, key, initializationVector)
  const chunks: Buffer[] = []

  inStream.readStream.on('readable', () => {
    let chunk
    while (null !== (chunk = inStream.readStream.read())) {
      chunks.push(chunk)
    }
  })

  inStream.readStream.on('end', async () => {
    const plainText: Buffer = Buffer.concat(chunks)
    const cipherText: Buffer = Buffer.concat([ cipher.update(plainText), cipher.final() ]);

    const fileDataBuffer: Buffer = Buffer.concat([
      encode(inStream.fileType),
      encode(initializationVector),
      encode(salt),
      cipherText,
    ]);

    (<WriteStream>outStream.writeStream).write(fileDataBuffer)

    if (inStream.fileName !== undefined && outStream.toFile === true) {
      await unlink(inStream.fileName + '.' + inStream.fileType)
    }

    process.exit(0)
  })
}

function encode(data: Buffer | Uint8Array | string | undefined): Buffer {
  if (data === undefined) {
    data = ''
  }

  if (data.length > 255) {
    throw new Error('data length must fit into 1 byte (less than 255 in length)')
  }

  return Buffer.concat([
    Buffer.from(Uint8Array.of(data.length)),
    typeof data === 'string' ? Buffer.from(data) : data,
  ])
}

// export async function decrypt(password: string, inFile: string, outFile: string): Promise<void> {
//   // TODO if user stored data in base64 rather than binary - switch to run this
//   // const cipherFileData: Buffer = Buffer.from(await readFile(inFile, 'binary'), 'base64')
//   const cipherFileData: Buffer = await readFile(inFile)
//   const extentionLength: number = Number.parseInt(cipherFileData.slice(0).toString('ascii'), 10)
//   const fileType: string = cipherFileData.slice(1, 1 + extentionLength).toString('ascii')
//   const initializationVector: Buffer = cipherFileData.slice(1 + extentionLength, 17 + extentionLength)
//   const cipherText: Buffer = cipherFileData.slice(17 + extentionLength)

//   const shaHasher: Hash = createHash(saltHashAlgorithm)
//   const salt: string = shaHasher.update(password).digest('hex')

//   const key: Buffer = scryptSync(password, salt, 32)
//   const decipher: Decipher = createDecipheriv(algorithm, key, initializationVector)

//   const plainText: Buffer = Buffer.concat([
//     decipher.update(cipherText), decipher.final()
//   ])

//   const outFileParts: FileInfo = getFileInfo(outFile)
//   await writeFile(`${outFileParts.name}.${fileType}`, plainText)

//   console.log(`deleting file: ${inFile}`)
//   await unlink(inFile)

//   console.log('decrypted')
//   process.exit(1)
// }

export default {
  encrypt,
  // decrypt,
}