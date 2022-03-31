import {
  scryptSync,
  randomFillSync,
  createCipheriv,
  createHash,
  Hash,
} from 'crypto'
import { WriteStream } from 'fs'
import { unlink } from 'fs/promises'
import { InStream, OutStream, WriteableStream } from './types'

const algorithm = 'aes-256-cbc'
const saltHashAlgorithm = 'sha256'

export async function encrypt(password: string, inStream: InStream, outStream: OutStream): Promise<void> {
  const shaHasher: Hash = createHash(saltHashAlgorithm)
  const salt: string = shaHasher.update(password).digest('hex')

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
      Buffer.from(`${outStream.toFile ? inStream.fileType?.length : ''}`),
      Buffer.from(outStream.toFile ? inStream.fileType ?? '' : ''),
      initializationVector,
      cipherText,
    ]);

    (<WriteStream>outStream.writeStream).write(fileDataBuffer)

    if (inStream.fileName !== undefined && outStream.toFile === true) {
      await unlink(inStream.fileName + '.' + inStream.fileType)
    }

    process.exit(0)
  })
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
