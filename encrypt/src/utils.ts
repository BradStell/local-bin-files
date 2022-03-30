export interface FileInfo {
  name: string
  type: string
  extentionLength: number
}

export function getFileInfo(fileName: string): FileInfo | null {
  if (fileName === undefined || fileName === null) {
    return null
  }

  const fileParts: string[] = fileName.split('.')
  return {
    name: fileParts[0],
    type: fileParts[1],
    extentionLength: fileParts[1].length,
  }
}

export function toBinary(num: number): number {
  // TODO
  return 0
}

export default {
  getFileInfo,
  toBinary,
}
