import {
  scryptSync,
  randomFillSync,
  createCipheriv,
  randomBytes,
  Decipher,
  createDecipheriv,
} from 'crypto'
import { createWriteStream, WriteStream } from 'fs'
import { unlink } from 'fs/promises'
import {
  WriteableStream,
  ReadableStream,
  Options
} from './types'

const algorithm = 'aes-256-cbc'

export async function encrypt(
  password: string,
  readStream: ReadableStream,
  writeStream: WriteableStream,
  opts: Options
): Promise<void> {

  const salt: Buffer = randomBytes(16)
  const key: Buffer = scryptSync(password, salt, 32)
  const initializationVector: Uint8Array = randomFillSync(new Uint8Array(16))
  const cipher = createCipheriv(algorithm, key, initializationVector)
  const chunks: Buffer[] = []

  readStream.on('readable', () => {
    let chunk
    while (null !== (chunk = readStream.read())) {
      chunks.push(chunk)
    }
  })

  readStream.on('end', async () => {
    const plainText: Buffer = Buffer.concat(chunks)
    const cipherText: Buffer = Buffer.concat([ cipher.update(plainText), cipher.final() ]);

    const fileDataBuffer: Buffer = Buffer.concat([
      encode(opts.fileType),
      encode(initializationVector),
      encode(salt),
      cipherText,
    ]); // TODO why do I need this ;

    // TODO investigate why we have to cast this
    (<WriteStream>writeStream).write(fileDataBuffer)

    if (opts.deleteOriginalFile) {
      await unlink(opts.fileName + '.' + opts.fileType)
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

export async function decrypt(
  password: string,
  readStream: ReadableStream,
  writeStream: WriteableStream | null,
  opts: Options
): Promise<void> {

  const chunks: Buffer[] = []

  readStream.on('readable', () => {
    let chunk
    while (null !== (chunk = readStream.read())) {
      chunks.push(chunk)
    }
  })

  readStream.on('end', async () => {
    const data: Buffer = Buffer.concat(chunks)
    let cursor: number = 1

    // get file extention
    const fileTypeLength: number = data.slice(0, cursor)[0]
    const fileType: string = data.slice(cursor, cursor + fileTypeLength).toString('ascii')
    cursor += fileTypeLength

    // get iv
    const ivLength: number = data.slice(fileTypeLength + 1, fileTypeLength + 1 + 1)[0]
    const iv: Buffer = data.slice(fileTypeLength + 1 + 1, fileTypeLength + 1 + 1 + ivLength)

    // get salt 10, 11
    const saltLength: number = data.slice(fileTypeLength + 1 + ivLength + 1, fileTypeLength + 1 + ivLength + 1 + 1)[0]
    const salt: Buffer = data.slice(fileTypeLength + 1 + ivLength + 1 + 1, fileTypeLength + 1 + ivLength + 1 + 1 + saltLength)

    // get cipher text
    const cipherText: Buffer = data.slice(fileTypeLength + 1 + ivLength + 1 + 1 + saltLength)

    // decrypt
    const key: Buffer = scryptSync(password, salt, 32)
    const decipher: Decipher = createDecipheriv(algorithm, key, iv)

    const plainText: Buffer = Buffer.concat([
      decipher.update(cipherText), decipher.final()
    ]) // TODO why do I need this ;

    let ws: WriteStream = <WriteStream> writeStream
    if (writeStream === null) {
      // we need to create write stream for the file now that we have the ending
      const fileName: string = `${opts.fileName}.${fileType}`
      ws = createWriteStream(fileName)
      await unlink(`${opts.fileName}.brad`)
    }
    ws.write(plainText)
  })
}

export default {
  encrypt,
  decrypt,
}
