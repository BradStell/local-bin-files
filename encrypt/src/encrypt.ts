import { OptionValues, program } from 'commander'
import { createReadStream, createWriteStream } from 'fs'
import { stdin, stdout } from 'process'
import { encrypt } from './cryptography'
import { InStream, OutStream, ReadableStream, WriteableStream } from './types'
import { FileInfo, getFileInfo } from './utils'

program
  .argument('inFile')
  .option('-p, --password [password]', 'the password used to lock this file, you will need this same password to unlock the file')
  .option('-s, --stdout', 'if provided output is directed to standard output')

  // not implemented yet
  .option('-c, --copy', 'encrypts the provided file to a new file')
  .option('-d, --directory', 'zips the contents of the directory and encrypts the compressed file')
  .option('-r, --recursive', 'recursively encrypts all files within the directory and sub directories')

/*
  node encrypt foo.txt -p secret
*/

program.parse()

const opts: OptionValues = program.opts()
const args: string[] = program.args

const inFile: string = args[0]
const fileParts: FileInfo | null = getFileInfo(inFile)

let readStream: ReadableStream
if (inFile === undefined || inFile === '') {
  // read from std::in
  readStream = stdin
} else {
  // read from inFile
  // TODO check if it's directory
  readStream = createReadStream(inFile)
}

let writeStream: WriteableStream
if (opts.stdout === true) {
  writeStream = stdout
} else {
  writeStream = createWriteStream(`${fileParts?.name}.brad`)
}


const inStream: InStream = {
  fileName: fileParts?.name,
  fileType: fileParts?.type,
  readStream,
}

const outStream: OutStream = {
  toFile: opts.stdout !== true,
  writeStream,
}

encrypt(opts.password, inStream, outStream)
