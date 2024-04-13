
const asHex = process.argv[2]

interface sRGB {
  red: number
  green: number
  blue: number
  opacity?: number
}

function roundTo2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

function toSRGB(hex: Hexadecimal): sRGB {
  return {
    red: roundTo2(hex.red / 255),
    green: roundTo2(hex.green / 255),
    blue: roundTo2(hex.blue / 255),
    opacity: hex.opacity ? roundTo2((hex.opacity / 255)) : undefined
  }
}

interface Hexadecimal {
  value: string
  red: number
  green: number
  blue: number
  opacity?: number
}

const hexMap: { [key: string]: number } = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'A': 10,
  'B': 11,
  'C': 12,
  'D': 13,
  'E': 14,
  'F': 15,
}

function hexToDec(hex: string): number {
  let value = 0
  let place = 1
  for (let i = hex.length - 1; i >= 0; i--) {
    value += hexMap[hex[i]] * place
    place *= 16
  }
  return value
}

function parseHex(hex: string): Hexadecimal {
  const hexValue: string = hex.startsWith('#') ? hex.substring(1) : hex
  const red = hexValue.substring(0, 2)
  const green = hexValue.substring(2, 4)
  const blue = hexValue.substring(4, 6)
  const opacity = hexValue.substring(6, 8)

  return {
    value: hexValue,
    red: hexToDec(red),
    green: hexToDec(green),
    blue: hexToDec(blue),
    opacity: opacity ? hexToDec(opacity) : undefined
  }
}

const hexParts = parseHex(asHex)
const sRGBParts = toSRGB(hexParts)

console.log(`
red: ${hexParts.red}, green: ${hexParts.green}, blue: ${hexParts.blue}${hexParts.opacity ? `, opacity: ${sRGBParts.opacity}` : ''}
red: ${sRGBParts.red}, green: ${sRGBParts.green}, blue: ${sRGBParts.blue}${hexParts.opacity ? `, opacity: ${sRGBParts.opacity}` : ''}
`)
