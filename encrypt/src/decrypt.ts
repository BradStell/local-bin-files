import { OptionValues, program } from 'commander'
import { createReadStream, ReadStream, WriteStream } from 'fs'
import { decrypt } from './cryptography'
import { FileInfo, getFileInfo } from './utils'

program
  .argument('inFile')
  .option('-p, --password [password]', 'the password used to lock this file, you will need this same password to unlock the file')
  .option('-s, --stdout')

program.parse()

const opts: OptionValues = program.opts()
const args: string[] = program.args

const inFile: string = args[0]

let readStream: ReadStream
let fileParts: FileInfo | null
if (inFile === undefined || inFile === '') {
  console.error('file argument to read is required')
  process.exit(1)
} else {
  readStream = createReadStream(args[0])
  fileParts = getFileInfo(inFile)
}

// TODO can't do this because the file extention is in the encrypted data
// Or we write to a temp file and then rename it
let writeStream: WriteStream | null = null
decrypt(opts.password, readStream, writeStream, {
  fileName: fileParts?.name,
  deleteOriginalFile: writeStream === null,
})
