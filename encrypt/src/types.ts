import { ReadStream, WriteStream } from "fs";

export type ReadableStream = ReadStream | (NodeJS.ReadStream & { fd: 0 })

export type WriteableStream = WriteStream | (NodeJS.WriteStream & { fd: 1 })

export interface InStream {
  readStream: ReadableStream
  fileName?: string
  fileType?: string
}

export interface OutStream {
  toFile: boolean
  writeStream: WriteableStream
}
