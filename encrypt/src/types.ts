import { ReadStream, WriteStream } from "fs";

export type ReadableStream = ReadStream | (NodeJS.ReadStream & { fd: 0 })

export type WriteableStream = WriteStream | (NodeJS.WriteStream & { fd: 1 })

export interface Options {
  fileType?: string
  fileName?: string
  deleteOriginalFile: boolean
}
