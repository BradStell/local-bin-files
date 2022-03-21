import crypto from 'crypto'

type ByteLength = number
const defaultByteLength: string = '32'

function generateByteSequence(length: ByteLength, encoding: BufferEncoding = 'hex'): string {
  const buf = crypto.randomBytes(length)
  return buf.toString(encoding)
}

function start(byteLength: ByteLength, encoding: string = 'hex'): string {
  return generateByteSequence(byteLength, <BufferEncoding>encoding)
}

if (process.argv.length < 3) {
  console.log(`you must provide the byte length you desire and optionally the byte encoding to use.\n`)
} else {
  const sizeInBytes: string = process.argv[2] ?? defaultByteLength
  const byteEncoding: string = process.argv[3]
  const byteString: string = start(Number.parseInt(sizeInBytes, 10), byteEncoding)
  console.log(byteString)
}
