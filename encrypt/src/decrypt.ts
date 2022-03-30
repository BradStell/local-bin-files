// import { Buffer } from 'buffer'
// import {
//   scryptSync,
//   createDecipheriv,
//   Hash,
//   createHash,
//   Decipher
// } from 'crypto'
// import { readFile, unlink, writeFile } from 'fs/promises'
// import { FileInfo, getFileInfo } from './utils'

// const algorithm = 'aes-256-cbc'
// const saltHashAlgorithm = 'sha256'

// async function start(password: string, inFile: string, outFile: string): Promise<void> {
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

// const password: string = process.argv[2]
// const inFileName: string = process.argv[3]
// const outFileName: string = process.argv[4]

// if (outFileName === undefined) {
//   console.log(`Encrypted data will be written back to the file ${inFileName}`)
//   start(password, inFileName, inFileName)
// } else {
//   start(password, inFileName, outFileName)
// }
