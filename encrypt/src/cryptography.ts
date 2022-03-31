import {
  scryptSync,
  randomFillSync,
  createCipheriv,
  createHash,
  Hash,
} from 'crypto'
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

    (<any>outStream.writeStream).write(
      Buffer.concat([
        Buffer.from(`${outStream.toFile ? inStream.fileType?.length : ''}`),
        Buffer.from(outStream.toFile ? inStream.fileType ?? '' : ''),
        initializationVector,
        cipherText,
      ])
    );

    if (inStream.fileName !== undefined && outStream.toFile === true) {
      await unlink(inStream.fileName + '.' + inStream.fileType)
    }

    process.exit(0)
  })
}
